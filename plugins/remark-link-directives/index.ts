/**
 * Local gatsby-transformer-remark sub-plugin.
 *
 * Lets a single link carry arbitrary HTML attributes by stuffing a literal
 * JSON object into the *title* slot markdown already supports. Use a
 * single-quoted title so the JSON's own double quotes need no escaping:
 *
 *   [text](url '{"target": "_blank", "rel": "noopener noreferrer"}')
 *   [ref]: url '{"download": "custom-name.pdf"}'
 *
 * A title is only ever treated as attrs when its entire trimmed value
 * parses as a JSON object. Anything that isn't valid JSON — including
 * ordinary prose that happens to contain a brace — is left byte-for-byte
 * alone and renders as a normal tooltip, exactly as markdown already does.
 * This convention can never shadow real titles: a human-written tooltip is
 * never going to also be valid JSON.
 *
 * JSON booleans map onto HTML boolean attributes for free: `true` renders
 * as a bare attribute (e.g. `download`), `false` omits it entirely — this
 * is hast's existing behavior, nothing extra to do here.
 *
 * Only a fixed, small set of attribute names is honored (see ALLOWED_ATTRS
 * below) — not because untrusted input reaches this pipeline (it doesn't;
 * raw HTML in markdown already lets a committer do anything this could),
 * but so a typo'd key degrades loudly instead of silently doing something
 * unintended, like a stray `"href"` silently redirecting the link. A
 * disallowed key is dropped with a build-time warning; everything else in
 * the same object still applies.
 */

type HProperties = Record<string, unknown>

const ALLOWED_ATTRS = new Set(["target", "rel", "download", "title"])

type MdastNode = {
  type: string
  title?: string | null
  identifier?: string
  children?: MdastNode[]
  data?: { hProperties?: HProperties }
}

type MarkdownAst = MdastNode

function parseAttrs(rawTitle: string): HProperties | null | undefined {
  const trimmed = rawTitle.trim()
  if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) return null
  let parsed: unknown
  try {
    parsed = JSON.parse(trimmed)
  } catch {
    return undefined // looked like JSON, wasn't — treat as a warning below
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return undefined
  }
  return parsed as HProperties
}

function applyAttrs(
  node: MdastNode,
  rawTitle: string,
  warnings: string[]
): boolean {
  const attrs = parseAttrs(rawTitle)
  if (attrs === null) return false // doesn't even look like JSON — untouched
  if (attrs === undefined) {
    warnings.push(
      `Title looked like a JSON attrs object but failed to parse: ${rawTitle}`
    )
    return false
  }

  const allowed: HProperties = {}
  const rejected: string[] = []
  for (const [key, value] of Object.entries(attrs)) {
    if (ALLOWED_ATTRS.has(key)) {
      allowed[key] = value
    } else {
      rejected.push(key)
    }
  }
  if (rejected.length) {
    warnings.push(
      `Dropped disallowed attr${rejected.length > 1 ? "s" : ""} ${rejected.map((k) => `"${k}"`).join(", ")} in title ${rawTitle} (allowed: ${[...ALLOWED_ATTRS].join(", ")})`
    )
  }

  node.data = node.data || {}
  node.data.hProperties = { ...(node.data.hProperties || {}), ...allowed }
  node.title = null // consume it so it doesn't ALSO render as a literal tooltip
  return true
}

module.exports = ({ markdownAST }: { markdownAST: MarkdownAst }) => {
  const warnings: string[] = []
  const definitionsByIdentifier = new Map<string, MdastNode>()

  // Pass 1: handle inline links directly, and record + handle every
  // reference-style definition, wherever in the document it lives.
  const collect = (node: MdastNode) => {
    if (node.type === "definition" && typeof node.title === "string") {
      if (node.identifier) definitionsByIdentifier.set(node.identifier, node)
      applyAttrs(node, node.title, warnings)
    }
    if (node.type === "link" && typeof node.title === "string") {
      applyAttrs(node, node.title, warnings)
    }
    if (Array.isArray(node.children)) {
      node.children.forEach(collect)
    }
  }
  collect(markdownAST)

  // Pass 2: linkReference nodes (`[text][ref]`) don't carry a title
  // themselves — borrow whatever hProperties ended up on their definition.
  // Needs its own pass since a definition can appear later in the document
  // than the references that point at it.
  const applyToReferences = (node: MdastNode) => {
    if (node.type === "linkReference" && node.identifier) {
      const def = definitionsByIdentifier.get(node.identifier)
      if (def && def.data && def.data.hProperties) {
        node.data = node.data || {}
        node.data.hProperties = {
          ...def.data.hProperties,
          ...(node.data.hProperties || {}),
        }
      }
    }
    if (Array.isArray(node.children)) {
      node.children.forEach(applyToReferences)
    }
  }
  applyToReferences(markdownAST)

  if (warnings.length) {
    console.warn(
      `[remark-link-directives]\n${warnings.map((w) => `  ${w}`).join("\n")}`
    )
  }

  return markdownAST
}

import React, { useEffect, useState } from "react"

// Split so the address never appears as a literal string in the static
// HTML or JS bundle source — assembled client-side after hydration.
const ADDRESS_PARTS = ["I.am", "eric.pe"]

function EmailLink({ children, subject, className }) {
  const [href, setHref] = useState(null)

  useEffect(() => {
    const address = ADDRESS_PARTS.join("@")
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : ""
    setHref(`mailto:${address}${query}`)
  }, [subject])

  return (
    <a
      href={href || "#"}
      className={className}
      onClick={(event) => {
        if (!href) event.preventDefault()
      }}
    >
      {children}
    </a>
  )
}

export default EmailLink

import React from "react"
import Link from "./link"
import { srcOf } from "../utils/image"

type PostNode =
  Queries.PostsPageQuery["allMarkdownRemark"]["edges"][number]["node"]

type PostCardProps = {
  count: number
  postClass: string
  node: PostNode
}

const PostCard = (props: PostCardProps) => {
  const thumbnail = props.node.frontmatter?.thumbnail
  return (
    <article
      className={`post-card ${props.count % 3 === 0 && `post-card-large`} ${
        props.postClass
      } ${thumbnail ? `with-image` : `no-image`}`}
      style={
        thumbnail
          ? ({
              "--post-card-image": `url(${srcOf(thumbnail)})`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <Link to={props.node.fields?.slug ?? "#"} className="post-card-link">
        <div className="post-card-content">
          <h2 className="post-card-title">
            {props.node.frontmatter?.title || props.node.fields?.slug}
          </h2>
        </div>
      </Link>
    </article>
  )
}

export default PostCard

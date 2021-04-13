import React from "react"
import { Link } from "gatsby"

const ChildPosts = ({ posts }) => (
  <table>
    <thead>
      <tr>
        <th>Post</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {posts.map(p => (
        <tr key={p.node.fields.slug} >
          <td>
            <Link to={p.node.fields.slug}>
              {p.node.frontmatter.title}
            </Link>
          </td>
          <td>{p.node.frontmatter.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default ChildPosts
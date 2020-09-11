import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogLess = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  var totalPosts = 0
  var totalWords = 0
  var totalPubd = 0

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Index of Posts" />
      <h1>Index of Posts</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Word Count</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            totalPosts++
            if (node.frontmatter.publish === "yes") {
              totalPubd++
            }
            totalWords += node.wordCount.words

            return (
              <tr key={index}>
                <td>{node.frontmatter.date}</td>
                <td>
                  {node.frontmatter.publish === "yes" ? (
                    <a href={node.fields.slug}>{node.frontmatter.title}</a>
                  ) : (
                    node.frontmatter.title
                  )}
                </td>
                <td>{node.wordCount.words}</td>
                <td>{node.frontmatter.publish}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <th>Total Posts</th>
            <th>Total Words</th>
            <th>Total Published</th>
          </tr>
          <tr>
            <td></td>
            <td>{totalPosts}</td>
            <td>{totalWords}</td>
            <td>{totalPubd}</td>
          </tr>
        </tfoot>
      </table>
    </Layout>
  )
}

export default BlogLess

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            date(formatString: "MM/DD/YYYY")
            title
            publish
          }
          fields {
            slug
          }
          wordCount {
            words
          }
        }
      }
    }
  }
`

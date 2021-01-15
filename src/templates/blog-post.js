import React from "react"
import { graphql, Link } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ChildPosts from "../components/children"
import { rhythm, scale } from "../utils/typography"

require(`katex/dist/katex.min.css`)

const SmallPar = ({ children }) => (
  <p
    style={{
      ...scale(-1 / 5),
      display: `block`,
      marginBottom: 0,
    }}
  >
    {children}
  </p>
)

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const slug = pageContext.slug
  const siteTitle = data.site.siteMetadata.title
  // const { previous, next } = pageContext

  let childPosts
  if (data.allMarkdownRemark.edges.length > 0) {
    childPosts = <ChildPosts posts={data.allMarkdownRemark.edges} />
  } else {
    childPosts = <div></div>
  }

  const postTitle = (
    <h1
      style={{
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      {post.frontmatter.title}
    </h1>
  )

  const postDate = (
    <SmallPar>
      {post.frontmatter.date}
    </SmallPar>
  )

  const postPath = (
    <SmallPar>
      <Link to="/">home</Link>
      {slug.slice(1, -1).split('/').map((p, i, a) => (
        <span>
          {" / "}
          <Link key={p} to={"/" + a.slice(0, i + 1).join('/')}>{p}</Link>
        </span>
      ))}
    </SmallPar>
  )

  const postHeader = (
    <header style={{ marginBottom: rhythm(1), }}>
      {postPath}
      {postTitle}
      {postDate}
    </header>
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        {postHeader}
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <nav>{childPosts}</nav>
        <hr
          style={{
            marginBottom: rhythm(1),
            marginTop: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>



      {/* <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to="/" rel="home">
                ← Home
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav> */}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $childGlob: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    allMarkdownRemark(filter: {fields: {slug: {glob: $childGlob}}, frontmatter: {publish: {eq: "yes"}}}, sort: {fields: frontmatter___date}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

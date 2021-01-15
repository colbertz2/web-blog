import React from "react"
import { graphql, Link } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
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

const ChildTree = ({ posts }) => {
  const bar = "\u2500"
  const angle = "\u2514"
  const tee = "\u251C"

  if (posts.length === 0) { return null; }

  var tree = posts.slice(0, -1).map(p => (
    <SmallPar>
      {tee}{bar}{" "}
      <Link to={p.fields.slug}>{p.frontmatter.title}</Link>
    </SmallPar>
  ))

  const lp = posts.slice(-1)[0]
  tree.push(
    <SmallPar>
      {angle}{bar}{" "}
      <Link to={lp.fields.slug}>{lp.frontmatter.title}</Link>
    </SmallPar>
  )

  return <nav>{tree}</nav>
}

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const slug = pageContext.slug
  const siteTitle = data.site.siteMetadata.title
  // const { previous, next } = pageContext

  const childTree = <ChildTree posts={pageContext.children} />

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
      {postDate}
      {postTitle}
      {postPath}
      {childTree}
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

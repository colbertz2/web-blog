const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: { frontmatter: { publish: { eq: "yes" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    const slug = String(post.node.fields.slug)
    const slugCount = slug.split('/').length
    const children = posts.filter(p => {
      const fSlug = String(p.node.fields.slug)
      const fSlugCount = fSlug.split('/').length
      const isChild = fSlug.startsWith(slug)
      const isDirectChild = fSlugCount === slugCount + 1

      return (isChild && isDirectChild)
    }).map(p => p.node)

    const sortByTitleNumeral = children.every(node => (
      String(node.frontmatter.title).match("^[0-9]*\..*")
    ))

    if (sortByTitleNumeral) {
      // Numerical sort by the number leading the post title
      children.sort((a, b) => {
        const na = Number(String(a.frontmatter.title).split('.')[0])
        const nb = Number(String(b.frontmatter.title).split('.')[0])
        return (na > nb ? 1 : -1)
      })
    } else {
      // Alphabetical by title
      children.sort((a, b) => {
        const ta = String(a.frontmatter.title)
        const tb = String(b.frontmatter.title)

        if (ta < tb) {
          return -1
        } else if (ta > tb) {
          return 1
        } else {
          return 0
        }
      })
    }

    var s = slug.split('/').slice(0, -2)
    const parentSlugs = s.map((v, i, a) => (
      a.slice(0, i + 1).join('/') + "/"
    ))
    const parents = posts.filter(p => (
      parentSlugs.includes(p.node.fields.slug)
    )).map(p => p.node)
    parents.reverse()

    createPage({
      path: slug,
      component: blogPost,
      context: {
        slug: slug,
        childGlob: slug + "*",
        children,
        parents,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

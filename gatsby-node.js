const Promise = require('bluebird')
const path = require('path')
const _ = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve('./src/templates/blog-post.js')
  const tagPage = path.resolve("src/templates/tags.js")

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost(
              sort: { fields: [publishDate], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  title
                  slug
                  tags
                }
              }
            }
            tagsGroup: allContentfulBlogPost(limit: 1000) {
              group(field: tags) {
                fieldValue
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        
        posts.forEach((post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
              previous,
              next,
            },
          })
        })
        
        const postsPerPage = 3
        const numPages = Math.ceil(posts.length / postsPerPage)

        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/blog` : `/blog/${i + 1}`,
            component: path.resolve("./src/templates/blog.js"),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
            },
          })
        })

        const tags = result.data.tagsGroup.group

        tags.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
            component: tagPage,
            context: {
              tag: tag.fieldValue,
            },
          })
        })

      })
    )
  })
}

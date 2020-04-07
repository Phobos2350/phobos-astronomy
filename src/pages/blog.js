import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import styles from './blog.module.css'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const [heroBanner] = get(this, 'props.data.allContentfulPageHeader.edges')

    return (
      <Layout location={this.props.location}>
        <div>
          <Helmet title={siteTitle} />
          <Hero data={heroBanner.node} />
          <div className="pageBody">
            <div className="wrapper">
              <h2 className="section-headline">Posts</h2>
              <ul className="article-list">
                {posts.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "Do MMMM, YYYY")
          tags
          image {
            fluid(maxWidth: 350, maxHeight: 196, quality: 100, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          summary {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPageHeader(
      filter: { title: { eq: "Blog & Articles" } }
    ) {
      edges {
        node {
          title
          subtitle
          image: image {
            fluid(
              maxWidth: 1600
              quality: 100
              resizingBehavior: PAD
              background: "rgb:252525"
            ) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`

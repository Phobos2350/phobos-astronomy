import React from 'react'
import get from 'lodash/get'

import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const [heroBanner] = get(this, 'props.data.allContentfulPageHeader.edges')
    const { currentPage, numPages } = this.props.pageContext

    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage =
      currentPage - 1 === 1
        ? '/blog#posts'
        : '/blog/' + (currentPage - 1).toString() + '#posts'
    const nextPage = '/blog/' + (currentPage + 1).toString() + '#posts'

    return (
      <Layout location={this.props.location}>
        <div>
          <Helmet title={siteTitle} />
          <Hero data={heroBanner.node} />
          <div className="pageBody">
            <div className="wrapper">
              <h2 id="posts" className="section-headline">
                Posts
              </h2>
              <ul className="article-list">
                {posts.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  )
                })}
              </ul>
              <ul className="pageNav">
                {!isFirst && (
                  <Link to={prevPage} rel="prev">
                    ← Previous Page
                  </Link>
                )}
                {Array.from({ length: numPages }, (_, i) => (
                  <li
                    key={`pagination-number${i + 1}`}
                    style={{
                      margin: 0,
                    }}
                  >
                    <Link
                      to={`/blog/${i === 0 ? '' : i + 1}#posts`}
                      style={{
                        padding: '10px',
                        textDecoration: 'none',
                        color: i + 1 === currentPage ? '#252525' : '',
                        background: i + 1 === currentPage ? '#fcff38' : '',
                      }}
                    >
                      {i + 1}
                    </Link>
                  </li>
                ))}
                {!isLast && (
                  <Link to={nextPage} rel="next">
                    Next Page →
                  </Link>
                )}
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
  query BlogIndexQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "Do MMMM, YYYY")
          tags
          image {
            fluid(
              maxWidth: 350
              maxHeight: 196
              quality: 100
              resizingBehavior: SCALE
            ) {
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
    allContentfulPageHeader(filter: { title: { eq: "Blog & Articles" } }) {
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

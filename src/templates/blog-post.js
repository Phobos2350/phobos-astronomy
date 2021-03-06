import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import kebabCase from 'lodash/kebabCase'

import heroStyles from '../components/hero.module.css'
import styles from './blog-post.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <div>
          <Helmet title={`${post.title} | ${siteTitle}`} />

          <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.image.fluid}
            />
          </div>
          <div className="pageBody">
            <div className="wrapper">
              <h1 className="section-headline">{post.title}</h1>
              <p
                className="published"
                style={{
                  display: 'block',
                }}
              >
                {post.publishDate}
              </p>
              {post.tags &&
                post.tags.map(tag => (
                  <Link
                    className={styles.tag}
                    key={tag}
                    to={`/tags/${kebabCase(tag)}/`}
                  >
                    {tag}
                  </Link>
                ))}
              <div
                dangerouslySetInnerHTML={{
                  __html: post.body.childMarkdownRemark.html,
                }}
              />
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
                    <Link to={'/blog/' + previous.slug} rel="prev">
                      ← {previous.title}
                    </Link>
                  )}
                </li>
                <li>
                  {next && (
                    <Link to={'/blog/' + next.slug} rel="next">
                      {next.title} →
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "Do MMMM, YYYY")
      tags
      image {
        fluid(maxWidth: 1180, background: "rgb:000000", quality: 100) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

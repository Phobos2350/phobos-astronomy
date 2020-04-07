require("typeface-lato")
require("typeface-merriweather")
import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const [heroBanner] = get(this, 'props.data.allContentfulPageHeader.edges')

    return (
      <Layout location={this.props.location}>
        <div>
          <Helmet title={siteTitle} />
          <Hero data={heroBanner.node} />
          <div className="pageBody">
            <div className="wrapper">
              <h2 className="section-headline">Welcome</h2>
              
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPageHeader(
      filter: { title: { eq: "Phobos Astronomy" } }
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

import React from "react"
import get from 'lodash/get'
import kebabCase from "lodash/kebabCase"

import { Link, graphql } from "gatsby"
import Helmet from 'react-helmet'
import Layout from '../components/layout'

class TagsPage extends React.Component {
    render() {
      const siteTitle = get(this, 'props.data.site.siteMetadata.title')
      const posts = get(this, 'props.data.allContentfulBlogPost.group')

      return (
        <Layout location={this.props.location}>
            <div>
                <Helmet title={siteTitle} />
                <div className="pageBody">
                    <div className="wrapper">
                        <h2 id="tags" className="section-headline">Tags</h2>
                        <p>Quickly find posts by tag</p>
                        <ul className="tags-list">
                            {posts.map(tag => (
                                <li key={tag.fieldValue}>
                                    <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                                        {tag.fieldValue} ({tag.totalCount})
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
      )
    }
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(limit: 2000) {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
  }
`

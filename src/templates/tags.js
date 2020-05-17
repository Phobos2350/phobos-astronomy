import React from "react"

import { Link, graphql } from "gatsby"
import Helmet from 'react-helmet'
import Layout from '../components/layout'

// const Tags extends React.Component {
//     render() {
//         const siteTitle = get(this, 'props.data.site.siteMetadata.title')
//         const { edges, totalCount } = get(this, 'props.data.allContentfulBlogPost')
//         const tag = pageContext
//         const tagHeader = `${totalCount} post${
//             totalCount === 1 ? "" : "s"
//           } tagged with "${tag}"`
        
//         return (
//             <Layout location={this.props.location}>
//                 <Helmet title={siteTitle} />
//                 <div className="pageBody">
//                     <div className="wrapper">
//                         <h2 className="section-headline">{tagHeader}</h2>
//                         <ul>
//                             {edges.map(({ node }) => {
//                             const { slug } = node.slug
//                             const { title } = node.title
//                             return (
//                                 <li key={slug}>
//                                 <Link to={slug}>{title}</Link>
//                                 </li>
//                             )
//                             })}
//                         </ul>
//                         <Link to="/tags">All tags</Link>
//                     </div>
//                 </div>
//             </Layout>
//         )
//     }
// }

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allContentfulBlogPost
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  return (
    <Layout location={tag}>
        <Helmet title={"Posts tagged: " + tag} />
        <div className="pageBody">
            <div className="wrapper">
                <h1>{tagHeader}</h1>
                <ul>
                    {edges.map(({ node })=> {
                        const slug = node.slug
                        const title = node.title
                        return (
                            <li key={slug}>
                                <Link to={`/blog/${slug}`}>{title}</Link>
                            </li>
                        )
                    })}
                </ul>
                <Link to="/tags">All tags</Link>
            </div>
        </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
        siteMetadata {
          title
        }
    }
    allContentfulBlogPost(
      limit: 2000
      sort: { fields: [publishDate], order: DESC }
      filter: { tags: { in: [$tag] } } 
    ) {
      totalCount
      edges {
        node {
          slug
          title
        }
      }
    }
  }
`

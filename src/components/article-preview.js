import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import kebabCase from 'lodash/kebabCase'

import styles from './article-preview.module.css'

export default ({ article }) => (
  <div className={styles.preview}>
    <Img alt="" fluid={article.image.fluid} />
    <h3 className={styles.previewTitle}>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </h3>
    <small>{article.publishDate}</small>
    <div
      dangerouslySetInnerHTML={{
        __html: article.summary.childMarkdownRemark.html,
      }}
    />
    {article.tags &&
      article.tags.map(tag => (
        <Link className={styles.tag} key={tag} to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Link>
      ))}
  </div>
)

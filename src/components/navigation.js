import React from 'react'
import Headroom from 'react-headroom'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default () => (
  <Headroom>
    <nav role="navigation">
      <ul className={styles.navigation}>
        <li className={styles.navigationItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/blog/">Blog</Link>
        </li>
        <li className={styles.navigationItem}>
          <a target="_blank" href="https://www.astrobin.com/users/Phobos226/">
            Astrobin
          </a>
        </li>
      </ul>
    </nav>
  </Headroom>
)

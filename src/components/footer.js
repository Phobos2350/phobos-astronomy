import React from 'react'
import styles from './footer.module.css'

export default () => (
    <footer>
        <ul className={styles.footer}>
            © 2020 Phobos Astronomy - A Static Site made with
            <li>
                <a target="_blank" href="https://www.gatsbyjs.org/" target="_blank" rel="nofollow noreferrer noopener">Gatsby,</a>
            </li>
            <li>
                <a target="_blank" href="https://reactjs.org/" target="_blank" rel="nofollow noreferrer noopener">React</a>
            </li> and powered by
            <li>
                <a target="_blank" href="https://graphql.org/" target="_blank" rel="nofollow noreferrer noopener">GraphQL</a>
            </li>
        </ul>
        <ul className={styles.footerBottom}>     
            <li><em>Created by A Flight</em></li>
        </ul>
    </footer>
)
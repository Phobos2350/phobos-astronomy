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
              <p>
                This is a collection of my experiences and a little of my journey into the universe of Astronomy and Astrophotography in an effort to help answer some of the
                questions that I had before undergoing my own journey, as well as explain my projects and solutions that are based on the work of so many others.
              </p>
              <p>
                Everyone has their own path into this hobby and every one is different. This is just mine and if it inspires another to take their first steps as well then it is more
                than I could hope for this little site to achieve.
              </p>
              <h3>Background</h3>
              <p>
                My journey into Astronomy began with a pair of Celestron binoculars in May 2017, when I first set them up on a tripod looking through a bedroom window at a very
                bright Jupiter low to the horizon. When I saw that previously bright point became a more obvious blob with structure and a faint yellow-beige glow I could finally comprehend
                this was the first time I had ever really <i>seen</i> another planet with my own eyes. It was the moment I noticed four more bright points of light surrounding it I suddenly
                realised that I was watching the <em>moons of Jupiter</em>, a moment that is etched onto my memory with the sheer wonder it inspired.
              </p>
              <p>
                It was a matter of weeks until my family had a brand new 
                <a href="https://www.firstlightoptics.com/beginner-telescopes/skywatcher-skyliner-200p-dobsonian.html" target="_blank" rel="nofollow noreferrer noopener">Skywatcher 200P</a> 
                out in the garden that summer and what followed were equally astonishing moments observing Jupiter, Saturn, Mars, the Moon and bright DSOs like M13 and others. It was here I
                started experimenting: attaching red a red dot finder, making small modifications like a trolley to move it in and out the house and eventually a fully custom Arduino based 
                'Digital Setting Circles' that let me point the Dobsonian with relative accuracy to find faint targets.
              </p>
              <p>
                What followed was an interest in perhaps taking a photo through the telescope, difficult with a Dobsonian so I started experimenting, first with a DSLR and static tripod with short
                exposures, next with a DIY 'barn door' tracker built with wood, stepper motor and an Arduino, then culminating in my most recent journey of producing a low cost Astrophotography
                rig from relatively inexpensive DIY solutions and projects online with microcontrollers and a bit of electronics skill which I picked up along the way.
              </p>
              <p>
                Some of these stories you'll already find in the 'Blog' section of this site, others may come as time allows, future projects take shape and of course whether or not the clouds
                part on my next free evening, in which case you'll find me outside instead!
              </p>
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

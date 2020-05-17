require("typeface-lato")
require("typeface-merriweather")
import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import { Link } from 'gatsby'

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
                This is a record of a little of my journey into the world of astronomy and astrophotography. By recording my thoughts and experiences
                I hope to help reinforce my own learning and understanding as well as help others that may want to follow a similar path into the field.
              </p>
              <p>
                Everyone has their own path into this hobby and each is unique, if my experience inspires another to take their first steps then it is more
                than I could hope for this little site to achieve.
              </p>
              <h3>Background</h3>
              <p>
                Despite a deep fascination in the universe for as long as I can remember, my journey into 'proper' astronomy began relatively recently with a pair of Celestron 
                binoculars in 2018. When I first set them up on a tripod looking through a bedroom window at a very bright Jupiter low to the horizon I saw that previously bright
                point of light become a more obvious blob with detectable structure and a faint yellow-beige glow. To experience your first views of a planet with your own eyes 
                is a moment that leaves many with a profound sense of awe that is hard to describe without seeing it yourself. 
                <br />
                This was the first time I had ever really <i>seen</i> another planet with my own eyes. A few moments later I noticed a few more bright points of light surrounding it, 
                previously invisible without the aid of the binoculars, then I suddenly realised that I was watching the <b>moons of Jupiter</b>, a moment that is etched onto my 
                memory.
              </p>
              <p>
                It wasn't long before I got hold of a 
                <a href="https://www.firstlightoptics.com/beginner-telescopes/skywatcher-skyliner-200p-dobsonian.html" target="_blank" rel="nofollow noreferrer noopener">Skywatcher 200P</a> 
                and what followed were equally astonishing moments: the Great Red Spot of Jupiter, the Rings of Saturn, the deep orange-red of the surface of Mars, sharp shadows 
                cast along crater walls of a waxing gibbous Moon, every one magnificent, almost unbelievable that this was something you could actually see and experience.
                <br />
                It was from here I started experimenting: attaching a red dot finder, making small modifications and eventually building 
                <a href="https://github.com/Phobos2350/DobDSC" target="_blank" rel="nofollow noreferrer noopener"> custom Arduino based 'Digital Setting Circles'</a> that let me 
                point the Dobsonian with relative accuracy to help find faint targets.
              </p>
              <p>
                My thoughts then turned to taking a photo through the telescope, difficult with a Dobsonian so I started experimenting: first with a DSLR and T-ring adapter
                on easy targets like the Moon, then onto static tripod, realtively short focal length lenses with short exposures and my first attempts at stacking images. 
                Next I had built a 
                <a href="https://en.wikipedia.org/wiki/Barn_door_tracker" target="_blank" rel="nofollow noreferrer noopener">DIY 'barn door' tracker</a> using wood, a stepper motor, 
                an Arduino, some threaded rod and hinges.
                <br />
                This culminated in my most recent project a <Link to="/blog/onstep">low cost fully capable astrophotography rig</Link> from relatively inexpensive mount, telescope 
                and DIY solutions based on microcontrollers and a wealth of resources from the community.
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

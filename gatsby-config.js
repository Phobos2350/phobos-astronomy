require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: 'Phobos Astronomy',
    siteUrl: 'https://phobos-astronomy.netlify.app'
  },
  pathPrefix: '/phobos-astronomy',
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          { resolve: 'gatsby-remark-autolink-headers' },
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 1180,
              backgroundColor: 'none'
            }
          },
          {
          resolve: `gatsby-remark-copy-linked-files`,
          options: {
            ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
          }
        },
        {
          resolve: 'gatsby-remark-external-links',
          options: {
            target: '_blank',
            rel: 'nofollow noopener noreferrer'
          }
        }
        ],
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GA_ID,
        head: false,
        anonymize: true,
        respectDNT: true,
      }
    }
  ],
}

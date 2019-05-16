import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Config from "./Config"

class SEO extends Component {
  render() {
    const { path, content } = this.props
    let title
    let description
    let author
    let image
    let imageWidth = Config.imageWidth
    let imageHeight = Config.imageHeight
    let pageUrl
    let pageType

    // Meta Title
    if (content !== undefined && content.title !== undefined) {
      title = content.title
    } else {
      title = Config.siteTitle
    }

    // Meta description
    if (content !== undefined && content.description !== undefined) {
      description = content.description.substring(0, Config.siteDescriptionLength);
    } else {
      description = Config.siteDescription
    }

    // Meta  Share image
    if (content !== undefined && content.image !== undefined) {
      image = content.image
    } else {
      image = Config.siteUrl + Config.shareImage
    }

    // Meta  Share image
    if (path !== undefined) {
      pageUrl = Config.siteUrl + '/' + path
    } else {
      pageUrl = Config.siteUrl
    }

    // Meta Type
    if (content !== undefined) {
      pageType = "article"
    } else {
      pageType = "website"
    }

    // Meta Author
    if (content !== undefined && content.author !== undefined) {
      author = content.author
    } else {
      author = Config.author
    }


    return (
      <Helmet>

        <title>{title}</title>

        {/* General tags */}
        <meta name="title" content={title} />
        <meta name="image" content={image} />
        <meta name="author" content={author} />
        <meta name="description" content={description} />

        {/* OpenGraph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:type" content={pageType} />

        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content={imageWidth} />
        <meta property="og:image:height" content={imageHeight} />
        <meta property="og:description" content={description} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={Config.userTwitter ? Config.userTwitter : ''}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:description" content={description} />

        {/* Icons */}
        <link rel="apple-touch-icon" sizes="57x57" href="/assets/images/meta/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/images/meta/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/images/meta/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/images/meta/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/images/meta/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/images/meta/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/images/meta/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/meta/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/meta/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/assets/images/meta/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/meta/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/images/meta/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/meta/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/assets/images/meta/ms-icon-144x144.png" />

      </Helmet>
    )
  }
}

export default SEO

import {
  NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_SITE_DESCRIPTION,
} from '../app/server-constants'

const DocumentHead = ({ title = '', description = '', path = '' }) => {
  const elements = path.split('/')
  const isSlugPath = elements[0] === '' && elements[1] === 'blog' && elements.length === 3
  const isRootPath = path === '' || path === '/'

  let ogImageContent = ''
  if (!ogImageContent && NEXT_PUBLIC_URL) {
    if (isSlugPath) {
      ogImageContent = new URL(`/api/og-image?slug=${elements[2]}`, NEXT_PUBLIC_URL).toString()
    } else {
      ogImageContent = new URL('/default.png', NEXT_PUBLIC_URL).toString()
    }
  }

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="max-image-preview:large" />
      <meta charSet="utf-8" />
      <title>{title ? `${title} - ${NEXT_PUBLIC_SITE_TITLE}` : NEXT_PUBLIC_SITE_TITLE}</title>
      {NEXT_PUBLIC_URL ? (
        <link
          rel="canonical"
          href={new URL(path, NEXT_PUBLIC_URL).toString()}
        />
      ) : null}
      <meta itemProp="name" content={title ? `${title} - ${NEXT_PUBLIC_SITE_TITLE}` : NEXT_PUBLIC_SITE_TITLE} />
      {ogImageContent ? (
        <meta itemProp="image" content={ogImageContent} />
      ) : null}
      <meta
        name="description"
        content={description ? description : NEXT_PUBLIC_SITE_DESCRIPTION}
      />
      {NEXT_PUBLIC_URL ? (
        <meta
          property="og:url"
          content={new URL(path, NEXT_PUBLIC_URL).toString()}
        />
      ) : null}
      <meta property="og:title" content={title ? title : NEXT_PUBLIC_SITE_TITLE} />
      <meta
        property="og:description"
        content={description ? description : NEXT_PUBLIC_SITE_DESCRIPTION}
      />
      <meta property="og:site_name" content={NEXT_PUBLIC_SITE_TITLE} />
      <meta property="og:type" content={
          isRootPath
          ? 'website'
          : isSlugPath
            ? 'article'
        : 'blog'
      } />
      {ogImageContent ? (
        <meta property="og:image" content={ogImageContent} />
      ) : null}
      <meta name="twitter:card" content="summary_large_image" />
      {ogImageContent ? (
        <meta name="twitter:image" content={ogImageContent} />
      ) : null}
      <meta name="twitter:title" content={title ? `${title} - ${NEXT_PUBLIC_SITE_TITLE}` : NEXT_PUBLIC_SITE_TITLE} />
      <meta
        name="twitter:description"
        content={description ? description : NEXT_PUBLIC_SITE_DESCRIPTION}
      />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"></link>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons//favicon-32x32.png"></link>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons//favicon-16x16.png"></link>
      <link rel="manifest" href="/favicons/site.webmanifest"></link>
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5"></link>
      <meta name="msapplication-TileColor" content="#da532c"></meta>
      <meta name="theme-color" content="#ffffff"></meta>
    </>
  )
}

export default DocumentHead

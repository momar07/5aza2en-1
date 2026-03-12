import { Helmet } from 'react-helmet-async'

export default function SEOHead({ title, description, keywords, image, url }) {
  const siteName = 'خبراء الخزائن'
  const defaultImg = 'https://www.khubara-khazaen.com/assets/images/og-image.svg'
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | خزائن حديد وخزنات فاخرة`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords    && <meta name="keywords" content={keywords} />}
      <meta property="og:title"       content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image"       content={image || defaultImg} />
      {url         && <meta property="og:url" content={url} />}
      <meta property="og:site_name"   content={siteName} />
      <meta name="twitter:card"       content="summary_large_image" />
      <meta name="twitter:title"      content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image"      content={image || defaultImg} />
    </Helmet>
  )
}

import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

const SEO = ({ title, description, canonicalUrl, noIndex = false }: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};

export default SEO;

import { getGuides, getGuideBySlug } from '../../../../lib/getGuides';
import { getBusinessBySlug } from '../../../../lib/getBusinesses';
import Breadcrumb from '../../../../components/Breadcrumb';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import NewsletterCTA from '../../../../components/NewsletterCTA';
import { generateArticleSchema, generateBreadcrumbSchema } from '../../../../lib/generateSchema';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  return getGuides().map(g => ({ slug: g.slug }));
}

export function generateMetadata({ params }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};
  return {
    title: (guide.seoTitle || guide.title).replace(/\s*\|\s*WilCo Seniors\s*$/, ''),
    description: guide.metaDescription || guide.excerpt,
    alternates: { canonical: `https://wilcoguide.com/seniors/guides/${guide.slug}` },
  };
}

export default function GuidePage({ params }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const articleSchema = generateArticleSchema(guide);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://wilcoguide.com' },
    { name: 'Seniors', url: 'https://wilcoguide.com/seniors' },
    { name: 'Guides', url: 'https://wilcoguide.com/seniors' },
    { name: guide.title, url: `https://wilcoguide.com/seniors/guides/${guide.slug}` },
  ]);

  // Process content to replace internal links [LINK:/seniors/...] with actual links
  let processedContent = guide.content || '';
  processedContent = processedContent.replace(/\[LINK:(\/seniors\/[^\]]+)\]/g, '$1');

  return (
    <>
      <SchemaMarkup schema={articleSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      <Breadcrumb items={[
        { label: 'Seniors', href: '/seniors' },
        { label: guide.categoryName || 'Guide', href: guide.category ? `/seniors/${guide.category}` : '/seniors' },
        { label: guide.title },
      ]} />

      <div className="guide-page">
        <article className="guide-article">
          <div className="guide-header">
            <div className="guide-category-label">{guide.categoryName || 'Guide'}</div>
            <h1 className="guide-title">{guide.title}</h1>
            <p className="guide-excerpt">{guide.excerpt}</p>
            <div className="guide-meta">
              <span>{guide.publishDate}</span>
              <span>·</span>
              <span>{guide.readTime}</span>
            </div>
          </div>

          {guide.heroImage && (
            <div className="guide-hero-image">
              <img src={guide.heroImage} alt={guide.title} />
            </div>
          )}

          <div className="guide-content" dangerouslySetInnerHTML={{ __html: processedContent }} />
        </article>

        <NewsletterCTA variant="inline" />

        {guide.relatedGuides && guide.relatedGuides.length > 0 && (
          <div className="related-guides">
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Related Guides</h2>
            <div className="related-guides-grid">
              {guide.relatedGuides.map(slug => {
                const rg = getGuideBySlug(slug);
                if (!rg) return null;
                return (
                  <Link key={slug} href={`/seniors/guides/${slug}`} className="related-guide-card">
                    {rg.heroImage && <img src={rg.heroImage} alt={rg.title} />}
                    <div className="related-guide-info">
                      <div className="related-guide-title">{rg.title}</div>
                      <div className="related-guide-meta">{rg.readTime}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

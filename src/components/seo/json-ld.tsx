import { SITE } from "@/lib/site";

// One Organization entity for the whole site (PRD §5 entity contract).
// Facts from the NC Articles of Organization (SOSID 3098557).
// Policy rule: never add Review or AggregateRating types here or anywhere —
// self-serving review markup violates Google's review snippet policy.

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export function orgGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          url: `${SITE.url}/logo.png`,
          width: 512,
          height: 512,
        },
        description: SITE.description,
        foundingDate: SITE.foundingDate,
        email: SITE.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.city,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country,
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: SITE.email,
          contactType: "sales",
        },
        founder: [
          {
            "@type": "Person",
            name: "Wes Huber",
            jobTitle: "Founder, Software and AI",
            sameAs: [
              "https://github.com/wbaxterh",
              "https://www.upwork.com/freelancers/~01387050d017e0878f",
            ],
          },
          {
            "@type": "Person",
            name: "Kathleen Huber",
            jobTitle: "Brand and Marketing",
          },
          {
            "@type": "Person",
            name: "Tripp Huber",
            jobTitle: "Partnerships and Sales",
          },
        ],
        sameAs: SITE.sameAs,
        makesOffer: [
          "Product engineering",
          "White label engineering",
          "AI engineering",
          "Mobile app development",
          "Blockchain development",
          "Brand, marketing and sales",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            provider: { "@id": ORG_ID },
            areaServed: "US",
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function breadcrumbs(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

/* Emits JSON-LD as a native script tag with `<` escaped (Next.js guidance). */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

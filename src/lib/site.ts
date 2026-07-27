// Single source of truth for entity facts. Values from the NC Articles of
// Organization (SOSID 3098557, filed 2025-08-04) and the brand guidelines.
export const SITE = {
  name: "Huber Software",
  legalName: "Huber Software LLC",
  domain: "hubersoftware.com",
  url: "https://hubersoftware.com",
  foundingDate: "2025-08-04",
  tagline: "Enterprise grade software for teams that are not enterprises yet.",
  description:
    "Huber Software is a three person product team in Long Beach, California. Wes builds the software, Kat builds the brand, Tripp builds the pipeline. Product engineering, AI engineering, and white label development for agencies and founders.",
  email: "wes@hubersoftware.com",
  partnershipsEmail: "tripp@hubersoftware.com",
  address: {
    street: "1516 East 2nd Street, #2",
    city: "Long Beach",
    region: "CA",
    postalCode: "90802",
    country: "US",
  },
  locationLine: "Long Beach, California",
  sameAs: [
    "https://github.com/wbaxterh",
    "https://www.upwork.com/freelancers/~01387050d017e0878f",
    "https://www.linkedin.com/company/huber-software",
  ],
  // Optional integrations, wired via env so no code change is needed later.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
} as const;

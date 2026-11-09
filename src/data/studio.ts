export const studio = {
  legalName: "Dadsena Technologies (OPC) Private Limited",
  trade: "Dadsena Technologies",
  founder: "Rahul Dadsena",
  role: "Founder & director",
  email: "dadsenatech@gmail.com",
  phone: "+91 79872 82363",
  phoneHref: "+917987282363",
  whatsapp: "917987282363",
  gstin: "22AALCD3239N1ZG",
  sac: "998314",
  cin: "U58200CT2025OPC017269",
  address: "Innov8, 3rd floor, Bhatagaon, New Bus Stand, Raipur 492013",
  region: "Chhattisgarh, India",
  hours: "Mon–Sat, 9:00–20:00 IST",
};

export type Tier = {
  id: "basic" | "advanced";
  label: string;
  price: number;
  delivery: string;
  blurb: string;
  points: string[];
};

export type Platform = {
  id: string;
  label: string;
  tiers: Tier[];
};

export type Line = {
  id: string;
  index: string;
  title: string;
  lede: string;
  platforms: Platform[];
};

const managedBasic: Tier = {
  id: "basic",
  label: "Basic",
  price: 15000,
  delivery: "1 week",
  blurb: "A working store, themed to your brand, ready to take orders.",
  points: [
    "Shopify or WooCommerce setup",
    "Up to 15 products, or 6 pages",
    "Mobile layout tuned to your colors",
    "UPI, cards, and cash on delivery",
    "WhatsApp button on the store",
    "Handover call so you can add products",
  ],
};

const managedAdvanced: Tier = {
  id: "advanced",
  label: "Advanced",
  price: 30000,
  delivery: "2 weeks",
  blurb: "The same platforms, shaped further and wired for day-to-day selling.",
  points: [
    "Everything in Basic",
    "Theme pushed past the default skin",
    "Up to 50 products, collections, policy pages",
    "Speed pass and basic on-page SEO",
    "One integration: courier, reviews, or cart email",
    "30 days of fixes after go-live",
  ],
};

export const lines: Line[] = [
  {
    id: "managed",
    index: "01",
    title: "Managed ecommerce",
    lede: "WordPress or Shopify, set up and handed over. A store you can run without a developer on call.",
    platforms: [
      { id: "shopify", label: "Shopify", tiers: [managedBasic, managedAdvanced] },
      { id: "wordpress", label: "WordPress", tiers: [managedBasic, managedAdvanced] },
    ],
  },
  {
    id: "custom-commerce",
    index: "02",
    title: "Custom ecommerce",
    lede: "A storefront written for the brand, when a theme would get in the way. You keep the code.",
    platforms: [
      {
        id: "code",
        label: "Custom code",
        tiers: [
          {
            id: "basic",
            label: "Basic",
            price: 25000,
            delivery: "1.5 weeks",
            blurb: "A hand-coded shop with the pages a first catalog actually needs.",
            points: [
              "Home, catalog, product, and cart",
              "Checkout on Razorpay or your gateway",
              "Mobile-first layout",
              "Repository you own",
              "Deployed on a host you control",
            ],
          },
          {
            id: "advanced",
            label: "Advanced",
            price: 50000,
            delivery: "3 weeks",
            blurb: "A more specific store, with one custom selling flow built in.",
            points: [
              "Everything in Basic",
              "Layout designed for this brand, not a template",
              "Filters, variants, and a larger catalog",
              "One custom flow: size guide, WhatsApp alerts, or GST invoices",
              "A performance budget agreed before build",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "agency",
    index: "03",
    title: "Agency websites",
    lede: "Company sites for studios, consultancies, and product teams. WordPress, or fully custom code.",
    platforms: [
      {
        id: "wordpress",
        label: "WordPress",
        tiers: [
          {
            id: "basic",
            label: "Basic",
            price: 15000,
            delivery: "1 week",
            blurb: "A clear company site: what you do, who you are, how to reach you.",
            points: [
              "Home plus up to 4 inner pages",
              "Services, about, and contact",
              "Form that lands in your inbox",
              "Mobile layout",
              "Titles and meta written in",
            ],
          },
          {
            id: "advanced",
            label: "Advanced",
            price: 30000,
            delivery: "2 weeks",
            blurb: "More room for the offer, and a site that can keep growing.",
            points: [
              "Everything in Basic",
              "Up to 8 pages, with a case-study or blog index",
              "Sections matched to how you actually sell",
              "Speed and SEO scaffolding",
              "30 days of fixes after launch",
            ],
          },
        ],
      },
      {
        id: "code",
        label: "Custom code",
        tiers: [
          {
            id: "basic",
            label: "Basic",
            price: 25000,
            delivery: "1.5 weeks",
            blurb: "A hand-coded marketing site. No theme, no page-builder lock-in.",
            points: [
              "Home plus up to 4 pages",
              "Fast, responsive, yours to host",
              "Contact path to email or WhatsApp",
              "Code handed over at the end",
            ],
          },
          {
            id: "advanced",
            label: "Advanced",
            price: 50000,
            delivery: "3 weeks",
            blurb: "A more particular site, with motion and room for a longer story.",
            points: [
              "Everything in the basic custom site",
              "Up to 8 pages",
              "Richer motion and a layout specific to the brand",
              "A documented way to change copy without a rebuild",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "hybrid-app",
    index: "04",
    title: "Hybrid mobile apps",
    lede: "One React Native codebase for iPhone and Android. You get the source, a build you can install, and a path onto the stores.",
    platforms: [
      {
        id: "react-native",
        label: "iOS & Android",
        tiers: [
          {
            id: "basic",
            label: "Basic",
            price: 35000,
            delivery: "2 weeks",
            blurb: "A first hybrid app: a few screens, one job, running on both phones.",
            points: [
              "React Native app for iOS and Android",
              "Up to 5 screens around one core flow",
              "Your brand colors, icon, and splash",
              "A build you can install and test",
              "Source code handed over",
            ],
          },
          {
            id: "advanced",
            label: "Advanced",
            price: 70000,
            delivery: "4 weeks",
            blurb: "A fuller app, with one phone feature and a store-ready package.",
            points: [
              "Everything in Basic",
              "Up to 12 screens",
              "Accounts, or one of: payments, camera, location, or push",
              "Store screenshots, icon, and listing copy",
              "Signing and a first submission to App Store and Play",
              "Apple and Google accounts stay in your name",
              "Fixes through the first review cycle",
            ],
          },
        ],
      },
    ],
  },
];

export type Project = {
  name: string;
  href?: string;
  place: string;
  kind: string;
  tier: string;
  summary: string;
  tags: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Scale Up Growth",
    href: "https://scaleupgrowth.in",
    place: "Sydney",
    kind: "Agency website",
    tier: "Basic · custom code",
    summary:
      "A hand-coded company site for a growth consultancy that coaches founders and CEOs. Built as a basic custom site: no WordPress, code the client keeps.",
    tags: ["Custom code", "Consultancy", "Marketing site"],
    featured: true,
  },
  {
    name: "Lush Fashion Jewellery",
    href: "https://lushfashionjewellery.in",
    place: "Mumbai",
    kind: "Ecommerce",
    tier: "Custom store",
    summary:
      "A jewelry storefront built to show fine detail, stay quick on mobile, and check out with UPI.",
    tags: ["Shopify", "Jewellery", "Mobile"],
  },
  {
    name: "Amranth Apparel",
    href: "https://amranth.in",
    place: "Bengaluru",
    kind: "Ecommerce",
    tier: "Custom store",
    summary:
      "An editorial fashion shop with size guidance, inventory in sync, and a WhatsApp alert on every order.",
    tags: ["Shopify", "Fashion", "WhatsApp"],
  },
];

export const faqs = [
  {
    q: "How fast do you reply?",
    a: "On weekdays and Saturdays, 9:00 to 20:00 IST, Rahul replies within an hour. You get him, not a ticket queue.",
  },
  {
    q: "How do you take payment?",
    a: "Three stages. 40% to start the build. 30% before the site goes live, at the final preview. 30% after it is live and the follow-up changes are done. GST at 18% is added on the invoice. If your business is registered, that GST is input-tax credit.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. Managed Shopify and WordPress projects include a handover so you can add products and pages yourself. Custom-coded projects come with the repository and a short walkthrough.",
  },
  {
    q: "Can customers pay with UPI and cash on delivery?",
    a: "Yes on managed stores. Checkout is set up for UPI, cards, wallets, and cash on delivery through a gateway such as Razorpay.",
  },
  {
    q: "Are these prices the final bill?",
    a: "They are the starting fee for the scope listed on each tier. A larger catalog, an extra integration, or a rush date is quoted before any work starts. Nothing silent gets added later.",
  },
];

export function inr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

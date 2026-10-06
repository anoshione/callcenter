// Site content data source. All copy, navigation, services, team, and contact info live here.
// Changing copy must never require editing component code.

export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  iconName: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  pointers: string[];
  deliverables: string;
  targetAudience: string;
  iconName: string;
  image: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  category: string;
  logoText: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    phone?: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
  author: {
    name: string;
    role: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: 'square' | 'tall' | 'wide';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  column: 1 | 2;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  rating?: number;
  highlight?: string;
  serviceCategory?: string;
  featured?: boolean;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    description: string;
    since: string;
  };
  nav: {
    links: NavLink[];
    ctaTop: { label: string; href: string };
    ctaScrolled: { label: string; href: string };
  };
  hero: {
    chipText: string;
    titleLine1: string;
    titleLine2: string;
    titleHighlight?: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    stats: StatItem[];
    slides: HeroSlide[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    proofBadge: { value: string; label: string };
    learnMoreHref: string;
    mission: string;
    missionEyebrow?: string;
    missionParagraphs?: string[];
    vision: string;
    visionEyebrow?: string;
    visionParagraphs?: string[];
    values: { title: string; description: string }[];
    milestones: { year: string; title: string; description: string }[];
  };
  ctaBanner: {
    headline: string;
    subhead: string;
    subheadLine1?: string;
    subheadLine2?: string;
    ctaLabel: string;
    ctaHref: string;
  };
  services: ServiceItem[];
  howWeWork: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: {
      number: string;
      title: string;
      description: string;
      iconName: string;
    }[];
  };
  partners: {
    eyebrow: string;
    title: string;
    row1: PartnerItem[];
    row2: PartnerItem[];
  };
  team: {
    eyebrow: string;
    title: string;
    subtitle: string;
    members: TeamMember[];
  };
  getStarted: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: ProcessStep[];
    ctaLabel: string;
    ctaHref: string;
  };
  blogs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    posts: BlogPost[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: string[];
    items: GalleryItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    mapsUrl?: string;
    socials: {
      platform: string;
      href: string;
      iconName: string;
    }[];
  };
  faqs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    trustScore?: {
      rating: string;
      scale: string;
      reviewCount: string;
      retentionRate: string;
    };
    items: TestimonialItem[];
  };
  sections: {
    testimonials: boolean;
  };
  footer: {
    brandBlurb: string;
    copyrightText: string;
  };
}

export const site: SiteContent = {
  brand: {
    name: "CallcenterELE",
    tagline: "World Class Callcenter",
    description: "Reliable, human-first call center and business process outsourcing engineered for seamless scalability and 24/7 service excellence.",
    since: "2013", // TODO verify
  },
  nav: {
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact Us", href: "/#contact" },
    ],
    ctaTop: { label: "Explore Our Services", href: "/services" },
    ctaScrolled: { label: "Explore Our Services", href: "/services" },
  },
  hero: {
    chipText: "Support available 24/7",
    titleLine1: "Exceptional Support",
    titleLine2: "Every Call, Every Time",
    titleHighlight: "",
    description: "Dependable customer service and call center solutions built around your business. We turn every customer interaction into a better experience",
    primaryCta: { label: "Get In Touch", href: "/#contact" },
    secondaryCta: { label: "About Us", href: "/about" },
    stats: [
      { value: "98%", label: "Resolution Rate", iconName: "CheckCircle2" }, // TODO verify
      { value: "10+", label: "Years Experience", iconName: "Target" }, // TODO verify
      { value: "50+", label: "Global Clients", iconName: "MapPin" }, // TODO verify
      { value: "1200+", label: "Dedicated Agents", iconName: "Star" }, // TODO verify
    ],
    slides: [
      {
        id: "slide-1",
        image: "/assets/placeholders/hero-1.svg",
        title: "Bilingual Omnichannel Frontline Agents",
        subtitle: "Delivering empathetic, professional service across voice, chat, and email.",
      },
      {
        id: "slide-2",
        image: "/assets/placeholders/hero-2.svg",
        title: "Advanced Tier 1 - 3 Technical Helpdesk",
        subtitle: "Rapid troubleshooting and diagnostics backed by strict SLA guarantees.",
      },
      {
        id: "slide-3",
        image: "/assets/placeholders/hero-3.svg",
        title: "High-Volume Scalable Operations",
        subtitle: "Elastic capacity that seamlessly ramps up for peak campaigns.",
      },
    ],
  },
  about: {
    eyebrow: "About Us",
    title: "World-Class Contact Center & Business Outsourcing",
    paragraphs: [
      "Welcome to CallcenterELE. We provide mission-critical customer care, technical troubleshooting, and tailored back-office operations to forward-thinking organizations worldwide.",
      "By combining rigorously trained talent with real-time operational transparency, we elevate customer satisfaction while keeping operational overhead lean and predictable.",
    ],
    proofBadge: {
      value: "99.4%", // TODO verify
      label: "Customer Satisfaction",
    },
    learnMoreHref: "/about",
    mission: "To empower organizations worldwide with dependable, human-first customer care supported by scalable technology and trained domain experts.",
    missionEyebrow: "Core Purpose",
    missionParagraphs: [
      "To pioneer world-class customer support across voice, live chat, and omnichannel ticketing, securing 100% SLA-backed execution directly integrated into our clients' CRM ecosystems with complete operational transparency.",
      "We are dedicated to delivering consistent, high-calibration service with industry-leading First Contact Resolution, while cultivating continuous frontline agent training, psychological wellness, and rigorous quality auditing.",
    ],
    vision: "To be the most trusted global partner for agile, empathetic, and enterprise-grade contact center outsourcing.",
    visionEyebrow: "Long-Term Horizon",
    visionParagraphs: [
      "To establish our operations as the world's foremost benchmark for ethical, secure, and human-first contact center outsourcing, setting the gold standard for data security compliance, empathetic customer resolution, and partner protection.",
      "By harmonizing frontline human talent with intelligent omnichannel workflows, strict quality calibration, and 24/7/365 coverage, we envision enabling high-growth brands to scale seamlessly without operational friction.",
    ],
    values: [
      {
        title: "Customer Empathy",
        description: "Every call, ticket, and conversation is handled with patience, warmth, and active listening.",
      },
      {
        title: "Transparent Accountability",
        description: "Real-time metrics, live call monitoring, and daily transparent performance reporting.",
      },
      {
        title: "Continuous Training",
        description: "Continuous agent coaching, simulated scenarios, and strict quality assurance calibration.",
      },
      {
        title: "Data Security & Integrity",
        description: "Enterprise-grade compliance, role-based access, and robust data protection standards.",
      },
    ],
    milestones: [
      { year: "2013", title: "Company Founded", description: "Launched with a core team of 25 customer service specialists." }, // TODO verify
      { year: "2017", title: "Omnichannel Expansion", description: "Integrated 24/7 web chat, email ticketing, and tier 2 technical desks." }, // TODO verify
      { year: "2021", title: "Global Footprint", description: "Expanded operations to support multilingual clients across 50+ countries." }, // TODO verify
      { year: "2025", title: "Enterprise Scalability", description: "Surpassed 1,200 active frontline specialists with 98% client retention." }, // TODO verify
    ],
  },
  ctaBanner: {
    headline: "Ensure Your Business Continuity & Service Levels",
    subheadLine1: "Customized solutions engineered to seamlessly scale with",
    subheadLine2: "your business demands without long-term lock-in.",
    subhead: "Customized solutions engineered to seamlessly scale with your business demands without long-term lock-in.",
    ctaLabel: "Get In Touch",
    ctaHref: "/#contact",
  },
  services: [
    {
      id: "srv-1",
      slug: "customer-support",
      eyebrow: "Reliable Customer Support Solutions",
      title: "Customer Support Services",
      description: "Deliver outstanding customer experiences with responsive, omni-channel, and professional support teams dedicated to your brand.",
      pointers: [
        "24/7 Multi-channel Coverage",
        "Bilingual Support Specialists",
        "Custom SLA & Quality Auditing",
        "Seamless CRM & Helpdesk Sync",
      ],
      deliverables: "Frontline tier 1 and tier 2 customer care, active escalation handling, CSAT surveys, and dedicated supervisor oversight.",
      targetAudience: "Growing enterprises, e-commerce retailers, and SaaS firms requiring dependable round-the-clock customer care.",
      iconName: "Headphones",
      image: "/assets/service-customer-support.jpg",
    },
    {
      id: "srv-2",
      slug: "technical-support",
      eyebrow: "Expert Technical Support Everytime",
      title: "Technical Support Services",
      description: "We provide system maintenance, remote diagnostics, software troubleshooting, and expert IT help desk services.",
      pointers: [
        "Tier 1 - 3 Escalation Desk",
        "Remote Diagnostics & Logging",
        "Knowledge Base Curation",
        "Incident Triage & Tracking",
      ],
      deliverables: "Comprehensive issue resolution logs, remote desktop troubleshooting, bug verification, and root-cause summaries.",
      targetAudience: "Software companies, hardware vendors, and technology providers needing technically proficient agents.",
      iconName: "Cpu",
      image: "/assets/service-technical-support.jpg",
    },
    {
      id: "srv-3",
      slug: "appointment-setting",
      eyebrow: "Qualified Appointments For Business Growth",
      title: "Appointment Setting",
      description: "Our experts schedule high-quality appointments with verified decision-makers to accelerate your sales pipeline.",
      pointers: [
        "B2B & B2C Decision-Maker Outreach",
        "Direct Calendar Integration",
        "Custom Lead Qualification Matrix",
        "Live Call Transfer Capability",
      ],
      deliverables: "Pre-qualified sales meetings, calendar invitations, recorded qualification calls, and weekly pipeline updates.",
      targetAudience: "B2B sales organizations, professional services, consultancies, and commercial brokers.",
      iconName: "CalendarCheck",
      image: "/assets/service-appointment-setting.jpg",
    },
    {
      id: "srv-4",
      slug: "inbound-call-center",
      eyebrow: "24/7 Professional Customer Engagement",
      title: "Inbound Call Center",
      description: "Deliver exceptional customer experiences with our 24/7 inbound call support, intelligent routing, and order handling.",
      pointers: [
        "Live Answering & IVR Navigation",
        "Order Processing & Billing Help",
        "Emergency Escalation Dispatch",
        "Zero-Abandonment Target Routing",
      ],
      deliverables: "Zero-wait call queues, emergency overflow handling, call recording archives, and weekly call volume distribution analytics.",
      targetAudience: "Healthcare providers, financial institutions, logistics carriers, and direct-to-consumer businesses.",
      iconName: "PhoneCall",
      image: "/assets/service-inbound.jpg",
    },
    {
      id: "srv-5",
      slug: "outbound-call-center",
      eyebrow: "Connect Your Business with Opportunities",
      title: "Outbound Call Center",
      description: "Connect with targeted leads, verify prospect data, and scale your business using our compliant outbound outreach.",
      pointers: [
        "Warm & Cold Prospect Outreach",
        "Market Research & Opinion Surveys",
        "Customer Win-Back Campaigns",
        "Full Telephony Compliance Auditing",
      ],
      deliverables: "High-connect outbound calling campaigns, verified prospect contact records, customer survey reports, and ROI tracking.",
      targetAudience: "Enterprises seeking market expansion, proactive customer re-engagement, and comprehensive feedback collection.",
      iconName: "PhoneForwarded",
      image: "/assets/service-outbound.jpg",
    },
    {
      id: "srv-6",
      slug: "it-services",
      eyebrow: "Transforming Ideas into Powerful Solutions",
      title: "IT Services",
      description: "Innovative technology, infrastructure support, and cloud systems to help your business grow faster in the digital world.",
      pointers: [
        "Cloud & Server Uptime Monitoring",
        "Cybersecurity & Access Control",
        "Automated Backup & Disaster Recovery",
        "Continuous Patch Management",
      ],
      deliverables: "Proactive 24/7 infrastructure monitoring, patch deployment schedules, security vulnerability checks, and architecture tuning.",
      targetAudience: "Companies requiring high-availability system maintenance and scalable cloud infrastructure without in-house overhead.",
      iconName: "Server",
      image: "/assets/service-it-services.jpg",
    },
    {
      id: "srv-7",
      slug: "live-chat-email",
      eyebrow: "Fast Digital Channel Resolution",
      title: "Live Chat & Email Support",
      description: "Instantaneous web chat and thoughtful email communication delivering fast resolutions with a human touch.",
      pointers: [
        "Sub-60s Initial Chat Response",
        "Omnichannel Ticketing Integration",
        "Proactive On-Site Triggers",
        "Personalized Tone-of-Voice Alignment",
      ],
      deliverables: "Real-time web chat routing, email backlog resolution, canned response library maintenance, and satisfaction tracking.",
      targetAudience: "High-volume web stores, digital platforms, and apps with heavy conversational traffic.",
      iconName: "MessageSquare",
      image: "/assets/service-live-chat.jpg",
    },
    {
      id: "srv-8",
      slug: "back-office-data",
      eyebrow: "Accurate & Scalable Operations",
      title: "Back-Office & Data Entry",
      description: "High-accuracy data entry, document verification, claims processing, and back-office administrative operations.",
      pointers: [
        "99.8% Verified Data Accuracy",
        "Confidential Document Processing",
        "Rapid SLA-Backed Turnarounds",
        "Double-Entry Quality Auditing",
      ],
      deliverables: "Structured data entry, order reconciliation, document cataloging, and variance resolution logs.",
      targetAudience: "Logistics coordinators, medical practices, insurance companies, and financial departments.",
      iconName: "FileSpreadsheet",
      image: "/assets/service-back-office.jpg",
    },
  ],
  howWeWork: {
    eyebrow: "Our Proven Process",
    title: "How We Deliver Operational Excellence",
    subtitle: "A structured, five-stage implementation methodology designed to launch smoothly and scale reliably.",
    steps: [
      {
        number: "01",
        title: "Discover & Assess",
        description: "We conduct an in-depth audit of your current channels, call volumes, peak intervals, customer personas, and tech stack.",
        iconName: "Search",
      },
      {
        number: "02",
        title: "Design & Blueprint",
        description: "We formulate customized routing workflows, escalation protocols, brand tone guidelines, and tailored SLA benchmarks.",
        iconName: "Compass",
      },
      {
        number: "03",
        title: "Onboard & Train",
        description: "Our dedicated agents undergo rigorous product training, simulated scenario calls, and quality calibration tests.",
        iconName: "GraduationCap",
      },
      {
        number: "04",
        title: "Go Live & Shadow",
        description: "Phased production rollout with real-time supervisor shadowing, active call interception, and queue stabilization.",
        iconName: "Rocket",
      },
      {
        number: "05",
        title: "Analyze & Optimize",
        description: "Transparent daily reporting, weekly metric reviews, continuous coaching, and process improvements.",
        iconName: "TrendingUp",
      },
    ],
  },
  partners: {
    eyebrow: "Trusted By Industry Leaders",
    title: "Organizations We've Proudly Supported",
    row1: [
      { id: "p-1", name: "CloudScale Systems", category: "Technology", logoText: "CLOUDSCALE" },
      { id: "p-2", name: "Horizon Logistics", category: "Supply Chain", logoText: "HORIZON" },
      { id: "p-3", name: "Vertex Health Partners", category: "Healthcare", logoText: "VERTEX" },
      { id: "p-4", name: "MetroRetail Commerce", category: "Retail", logoText: "METRORETAIL" },
      { id: "p-5", name: "BluePeak Capital", category: "Finance", logoText: "BLUEPEAK" },
      { id: "p-6", name: "Beacon Media Group", category: "Media", logoText: "BEACON" },
    ],
    row2: [
      { id: "p-7", name: "Aurora Global Connect", category: "Telecom", logoText: "AURORA" },
      { id: "p-8", name: "Pulse Mobility Fleet", category: "Transportation", logoText: "PULSE" },
      { id: "p-9", name: "FinGuard Security", category: "Fintech", logoText: "FINGUARD" },
      { id: "p-10", name: "Astra BioTech Labs", category: "Life Sciences", logoText: "ASTRA" },
      { id: "p-11", name: "Crestwood Energy", category: "Utilities", logoText: "CRESTWOOD" },
      { id: "p-12", name: "Zenith SaaS Suite", category: "Software", logoText: "ZENITH" },
    ],
  },
  team: {
    eyebrow: "Our Specialists",
    title: "Meet Our Operational Leadership",
    subtitle: "Experienced operations directors, technical architects, and quality supervisors ensuring your success.",
    members: [
      {
        id: "tm-1",
        name: "Marcus Vance",
        role: "Managing Director",
        bio: "18+ years in global contact center leadership and telecom operations.",
        image: "/assets/team-2.jpg",
        socials: { linkedin: "https://linkedin.com", twitter: "https://x.com" },
      },
      {
        id: "tm-2",
        name: "Elena Rostova",
        role: "VP of Operations",
        bio: "Specializes in multi-site workforce management and customer experience strategy.",
        image: "/assets/team-1.jpg",
        socials: { linkedin: "https://linkedin.com", phone: "+1 (800) 555-0199" },
      },
      {
        id: "tm-3",
        name: "Priya Patel",
        role: "Head of Workforce Management",
        bio: "Oversees workforce optimization, predictive staffing, and omnichannel queuing.",
        image: "/assets/team-3.jpg",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        id: "tm-4",
        name: "Sarah Jenkins",
        role: "Lead Quality Specialist",
        bio: "Directs continuous call calibration, sentiment tracking, and CSAT enhancement.",
        image: "/assets/team-4.jpg",
        socials: { linkedin: "https://linkedin.com", email: "sarah.j@example.com" },
      },
      {
        id: "tm-5",
        name: "Ahmed Al-Mansoor",
        role: "Workforce Optimization Lead",
        bio: "Expert in erlang-C forecasting, scheduling efficiency, and queue balancing.",
        image: "/assets/team-5.jpg",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        id: "tm-6",
        name: "Claire Dubois",
        role: "Training & Development Director",
        bio: "Crafts custom curriculum and scenario-based roleplay programs for all agent pods.",
        image: "/assets/team-6.jpg",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        id: "tm-7",
        name: "Carlos Rodriguez",
        role: "Inbound Operations Supervisor",
        bio: "Focuses on real-time floor monitoring, emergency routing, and SLA compliance.",
        image: "/assets/team-7.jpg",
        socials: { linkedin: "https://linkedin.com" },
      },
      {
        id: "tm-8",
        name: "Maya Patel",
        role: "Customer Success Manager",
        bio: "Ensures seamless client communication, proactive reporting, and rapid escalation resolution.",
        image: "/assets/team-8.jpg",
        socials: { linkedin: "https://linkedin.com" },
      },
    ],
  },
  getStarted: {
    eyebrow: "Four Simple Steps",
    title: "Getting Started With Us",
    subtitle: "Transparent, consultative onboarding with zero hidden fees or rigid one-size-fits-all pricing tiers.",
    steps: [
      {
        step: "01",
        title: "Contact Us",
        description: "Submit our brief inquiry form or call our operations desk to introduce your team and core requirements.",
      },
      {
        step: "02",
        title: "Discovery Call",
        description: "We hold a 30-minute scoping session to analyze support channels, peak volumes, tooling, and team requirements.",
      },
      {
        step: "03",
        title: "Tailored Proposal",
        description: "We provide an itemized operational proposal with bespoke staffing models, SLA commitments, and transparent quotes.",
      },
      {
        step: "04",
        title: "Launch & Support",
        description: "Your fully vetted, trained team goes live under dedicated management with continuous daily performance audits.",
      },
    ],
    ctaLabel: "Schedule a Discovery Call",
    ctaHref: "/#contact",
  },
  blogs: {
    eyebrow: "Industry Insights",
    title: "News, Strategies & Contact Center Insights",
    subtitle: "Proven methodologies, technology trends, and best practices from customer support professionals.",
    posts: [
      {
        id: "post-1",
        slug: "omnichannel-support-boosts-retention",
        title: "How 24/7 Omnichannel Support Boosts Customer Retention by 40%",
        category: "Customer Experience",
        date: "October 12, 2025",
        readTime: "5 min read",
        excerpt: "Discover how seamless context switching between voice, chat, and email creates effortless customer journeys and drives loyalty.",
        content: [
          "Customers in modern industries demand immediate, coherent answers regardless of which communication channel they choose. When support feels fragmented, frustration mounts and retention drops.",
          "By implementing unified omnichannel routing, customer history and ticket context follow the user effortlessly from live chat to phone call, eliminating repeated explanations and reducing resolution time by over a third.",
          "Our operational analysis shows that brands providing seamless multi-channel transitions achieve up to 40% higher customer lifetime retention compared to single-channel help desks.",
        ],
        image: "/assets/blog-1.jpg",
        author: { name: "Elena Rostova", role: "VP of Operations" },
      },
      {
        id: "post-2",
        slug: "inbound-vs-outbound-balance",
        title: "Inbound vs Outbound BPO: Finding the Right Balance for Your Growth",
        category: "Strategy",
        date: "September 28, 2025",
        readTime: "6 min read",
        excerpt: "An operational breakdown of when to deploy proactive outreach versus dedicated inbound queue management.",
        content: [
          "Inbound and outbound operations require distinct agent temperaments, skill profiles, and management styles. Mixing them without clear protocols can dilute effectiveness.",
          "In this guide, we break down how blended agent pods can smoothly alternate between incoming queue spikes and proactive outreach during lull periods, maximizing agent utilization.",
        ],
        image: "/assets/blog-2.jpg",
        author: { name: "Marcus Vance", role: "Managing Director" },
      },
      {
        id: "post-3",
        slug: "security-compliance-remote-call-center",
        title: "Security & Compliance in Modern Contact Centers: An In-Depth Guide",
        category: "Compliance & Security",
        date: "September 15, 2025",
        readTime: "7 min read",
        excerpt: "How strict role-based access, data encryption, and regular third-party audits protect client data in high-volume environments.",
        content: [
          "Data privacy is paramount when dealing with customer payment records, medical notes, or personal identifiers. Compliance cannot be an afterthought.",
          "We review the core technical controls needed to ensure ISO 27001, SOC 2, and PCI-DSS readiness across distributed contact center teams.",
        ],
        image: "/assets/blog-3.jpg",
        author: { name: "David Chen", role: "Head of Technical Support" },
      },
      {
        id: "post-4",
        slug: "reducing-first-response-times",
        title: "Reducing First Response Times Without Sacrificing Resolution Quality",
        category: "Operations",
        date: "August 30, 2025",
        readTime: "4 min read",
        excerpt: "Why speedy greetings without thorough problem-solving backfire, and how to calibrate true first-contact resolution metrics.",
        content: [
          "A fast answer is meaningless if the customer has to call back three hours later. First Contact Resolution (FCR) is the gold standard of call center efficiency.",
          "Learn how smart routing and agent empowerment dramatically lower repeat contacts while improving overall customer happiness.",
        ],
        image: "/assets/blog-4.jpg",
        author: { name: "Sarah Jenkins", role: "Lead Quality Specialist" },
      },
      {
        id: "post-5",
        slug: "human-element-ai-augmentation",
        title: "The Human Element: Why AI Augments Rather Than Replaces Support Agents",
        category: "Technology",
        date: "August 14, 2025",
        readTime: "5 min read",
        excerpt: "Real-world findings on utilizing AI for agent assist, sentiment cues, and transcription while keeping empathetic humans at the core.",
        content: [
          "Automated bots are effective for basic order lookups, but complex, emotional, or high-stakes interactions require genuine human judgment.",
          "We explore how hybrid human-AI workflows empower specialists to resolve nuanced inquiries faster and with deeper empathy.",
        ],
        image: "/assets/blog-5.jpg",
        author: { name: "Claire Dubois", role: "Training Director" },
      },
      {
        id: "post-6",
        slug: "scaling-seasonal-support-peaks",
        title: "Scaling Seasonal Support: Preparing Your Team for Peak Volume Campaigns",
        category: "Workforce Management",
        date: "July 22, 2025",
        readTime: "6 min read",
        excerpt: "Strategies for rapid onboarding, shadow training, and elastic scheduling ahead of holiday and product release rushes.",
        content: [
          "Sudden traffic surges can overwhelm unprepared support desks within minutes. Successful preparation starts months in advance.",
          "Discover how modular knowledge bases and accelerated micro-training modules enable rapid agent ramp-up with zero compromise on brand voice.",
        ],
        image: "/assets/blog-6.jpg",
        author: { name: "Ahmed Al-Mansoor", role: "Workforce Optimization Lead" },
      },
    ],
  },
  gallery: {
    eyebrow: "Our Facility & Culture",
    title: "Inside Our State-of-the-Art Operations",
    subtitle: "A glimpse into the professional environments, modern infrastructure, and collaborative teams that drive our client success.",
    categories: ["All", "Operations", "Technology", "Training", "Team Culture"],
    items: [
      {
        id: "gal-1",
        title: "Main Operations Floor",
        category: "Operations",
        image: "/assets/gallery-1.jpg",
        aspect: "wide",
      },
      {
        id: "gal-2",
        title: "Executive Training & Simulation Lab",
        category: "Training",
        image: "/assets/gallery-2.jpg",
        aspect: "square",
      },
      {
        id: "gal-3",
        title: "Real-Time Telephony Monitoring Hub",
        category: "Technology",
        image: "/assets/gallery-3.jpg",
        aspect: "tall",
      },
      {
        id: "gal-4",
        title: "Collaborative Team Workstations",
        category: "Team Culture",
        image: "/assets/gallery-4.jpg",
        aspect: "square",
      },
      {
        id: "gal-5",
        title: "24/7 Security Operations Room",
        category: "Technology",
        image: "/assets/gallery-5.jpg",
        aspect: "wide",
      },
      {
        id: "gal-6",
        title: "Supervisory Escalation Desk",
        category: "Operations",
        image: "/assets/gallery-6.jpg",
        aspect: "tall",
      },
      {
        id: "gal-7",
        title: "Agent Wellness & Rest Lounge",
        category: "Team Culture",
        image: "/assets/gallery-7.jpg",
        aspect: "square",
      },
      {
        id: "gal-8",
        title: "Multilingual Voice Calibration Booth",
        category: "Training",
        image: "/assets/gallery-8.jpg",
        aspect: "square",
      },
      {
        id: "gal-9",
        title: "Client Strategic Review Boardroom",
        category: "Operations",
        image: "/assets/gallery-9.jpg",
        aspect: "wide",
      },
    ],
  },
  contact: {
    eyebrow: "GET IN TOUCH",
    title: "Discuss Your Outsourcing & Support Goals",
    description: "Connect with our client solutions team. We will review your channel requirements, staffing goals, and supply a clear, custom proposal.",
    phone: "+880 1958-063324",
    email: "elearningcallcenter@gmail.com",
    address: "Khaja IT Park (2nd to 6th Floor), 07 South Kallyanpur, Mirpur Road, Dhaka-1207, Bangladesh",
    hours: "24/7/365 Global Operations Desk",
    mapsUrl: "https://maps.app.goo.gl/R3Ldi2NzX2cpvKsR9",
    socials: [
      { platform: "Facebook", href: "https://facebook.com", iconName: "Facebook" },
      { platform: "Twitter", href: "https://twitter.com", iconName: "Twitter" },
      { platform: "Instagram", href: "https://instagram.com", iconName: "Instagram" },
      { platform: "YouTube", href: "https://youtube.com", iconName: "Youtube" },
    ],
  },
  faqs: {
    eyebrow: "Frequently Asked Questions",
    title: "Everything You Need to Know",
    subtitle: "Clear answers to common questions about our onboarding, security, service models, and pricing approach.",
    items: [
      {
        id: "faq-1",
        column: 1,
        question: "What is a BPO call center and how does it help my business?",
        answer: "A Business Process Outsourcing (BPO) call center is an external partner that manages customer interactions—such as phone calls, emails, web chats, technical troubleshooting, and appointment setting—on your company's behalf. It allows you to offer professional 24/7 customer support, maintain high service levels, and scale operations rapidly without the significant capital expense of recruiting, training, and equipping an in-house team.",
      },
      {
        id: "faq-2",
        column: 1,
        question: "How does your pricing work if you do not offer fixed monthly plans?",
        answer: "We do not believe in rigid, one-size-fits-all package tiers because every business has distinct volume spikes, coverage hours, language requirements, and technical requirements. Instead, we scope your operational needs during a discovery call and provide an honest, transparent, and itemized proposal tailored directly to your team size, SLA targets, and support channels—with zero hidden fees.",
      },
      {
        id: "faq-3",
        column: 1,
        question: "How quickly can our dedicated support team go live?",
        answer: "Standard deployments typically launch within 2 to 3 weeks. This includes system discovery, workflow blueprinting, CRM integration, agent onboarding, and rigorous scenario training. For urgent overflow or surge requirements, accelerated ramp-up schedules can be arranged.",
      },
      {
        id: "faq-4",
        column: 1,
        question: "What CRMs, ticketing tools, and software can your agents use?",
        answer: "Our agents are trained across all major helpdesk platforms including Zendesk, Salesforce Service Cloud, HubSpot, Freshdesk, Intercom, Jira Service Desk, and custom proprietary internal systems. We connect securely through your existing workflows.",
      },
      {
        id: "faq-5",
        column: 2,
        question: "How do you maintain quality control and ensure brand consistency?",
        answer: "We maintain dedicated Quality Assurance (QA) teams that calibrate agent performance against customized scorecards. Key metrics such as First Contact Resolution (FCR), Average Handle Time (AHT), Customer Satisfaction (CSAT), and Net Promoter Scores (NPS) are tracked continuously and shared in transparent daily dashboards.",
      },
      {
        id: "faq-6",
        column: 2,
        question: "Can you provide bilingual or multilingual customer support?",
        answer: "Yes. In addition to fluent native English-speaking specialists, we maintain multilingual pods supporting Spanish, French, German, Portuguese, and Mandarin to assist your global customer base across all time zones.",
      },
      {
        id: "faq-7",
        column: 2,
        question: "What security, data privacy, and compliance standards do you adhere to?",
        answer: "Security is built into our operational core. We maintain strict compliance with ISO 27001, SOC 2 Type II, and PCI-DSS protocols. All agent workstations operate under secure VPNs, multi-factor authentication, masked credit card data processing, and clean-desk policies.",
      },
      {
        id: "faq-8",
        column: 2,
        question: "How do you handle sudden seasonal volume spikes or unexpected surges?",
        answer: "Our workforce management teams employ elastic staffing models. During unexpected peaks or planned promotional campaigns, we activate cross-trained reserve specialists and dynamic queue routing to maintain SLA commitments without service interruptions.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Client Success Stories",
    title: "What Our Partners Say About Us",
    subtitle: "Real operational feedback from enterprise leadership teams who trust CallcenterELE for high-touch customer support, Tier 2 technical helpdesks, and mission-critical BPO.",
    trustScore: {
      rating: "4.9",
      scale: "5.0",
      reviewCount: "180+ Enterprise Reviews",
      retentionRate: "98.7% Client Retention",
    },
    items: [
      {
        id: "test-1",
        quote: "Partnering with CallcenterELE transformed our support responsiveness. Our CSAT jumped from 82% to 98% within four months, and our internal product team finally gained the bandwidth to focus purely on engineering innovation without customer tickets piling up.",
        author: "Marcus Vance", // TODO verify
        role: "Head of Operations",
        company: "CloudScale Systems",
        image: "/assets/team-2.jpg",
        rating: 5,
        highlight: "+98% CSAT Score",
        serviceCategory: "Omnichannel Support",
        featured: true,
      },
      {
        id: "test-2",
        quote: "Their technical desk handles complex tier 2 software queries flawlessly. The transition was smooth, agent onboarding took less than two weeks, and the daily transparent reporting gives our leadership team complete peace of mind.",
        author: "Alena Matry", // TODO verify
        role: "Director of Customer Care",
        company: "Zenith SaaS Suite",
        image: "/assets/team-1.jpg",
        rating: 5,
        highlight: "15-Min Avg Resolution",
        serviceCategory: "Technical Support",
        featured: false,
      },
      {
        id: "test-3",
        quote: "Professional, punctual, and genuinely empathetic. CallcenterELE treats our global logistics customers with the exact same care and dedication as our founding team. They are a true operational extension of our brand.",
        author: "Sherlock Henderson", // TODO verify
        role: "VP of Growth & Logistics",
        company: "Horizon Logistics",
        image: "/assets/team-3.jpg",
        rating: 5,
        highlight: "99.8% SLA Adherence",
        serviceCategory: "Inbound Call Center",
        featured: false,
      },
      {
        id: "test-4",
        quote: "Scaling our patient intake operations during peak healthcare open enrollment was seamless. CallcenterELE's HIPAA-compliant medical scheduling pods handled over 40,000 inbound inquiries with zero downtime and exceptional bedside manner.",
        author: "Dr. Evelyn Reed", // TODO verify
        role: "Chief Operating Officer",
        company: "Vertex Health Partners",
        image: "/assets/team-4.jpg",
        rating: 5,
        highlight: "40k+ Patient Inquiries",
        serviceCategory: "Healthcare Support",
        featured: true,
      },
      {
        id: "test-5",
        quote: "We needed a strict SOC 2 and PCI-compliant team to manage fraud alert escalation calls and customer verification. CallcenterELE delivered seasoned analysts with unmatched security diligence.",
        author: "David Chen", // TODO verify
        role: "Head of Risk & Compliance",
        company: "FinGuard Security",
        image: "/assets/team-5.jpg",
        rating: 5,
        highlight: "Zero Compliance Breaches",
        serviceCategory: "Back-Office Verification",
        featured: false,
      },
      {
        id: "test-6",
        quote: "CallcenterELE's outbound B2B appointment setting team consistently booked high-intent enterprise discovery calls for our sales division, doubling our qualified pipeline in under 90 days.",
        author: "Claire Moreau", // TODO verify
        role: "VP of Global Sales",
        company: "Aurora Global Connect",
        image: "/assets/team-6.jpg",
        rating: 5,
        highlight: "2.4x Pipeline Growth",
        serviceCategory: "Appointment Setting",
        featured: false,
      },
    ],
  },
  sections: {
    testimonials: true, // Enabled for review section after Partners
  },
  footer: {
    brandBlurb: "Delivering reliable, human-first customer service and technical outsourcing solutions. Engineered for high performance, continuous availability, and enterprise data security.",
    copyrightText: "All rights reserved. CallcenterELE.",
  },
};

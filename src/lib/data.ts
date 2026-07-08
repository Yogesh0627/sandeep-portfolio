/**
 * Single source of truth for all résumé/portfolio content.
 * Edit here to update the site — nothing is hard-coded in components.
 */

export const profile = {
  name: 'Sandeep Kumar',
  title: 'Auto & Vehicle Finance Specialist',
  tagline:
    '15+ years driving vehicle-finance growth across leading banks and dealerships — from car loans to next-gen EV financing.',
  location: 'Delhi NCR, India',
  email: 'sandeepsharma1204@gmail.com',
  phone: '+91 9999551144',
  languages: ['English', 'Hindi'],
  // Public résumé objective, refined for a finance leader:
  summary:
    'Results-driven auto-finance professional with 15+ years of experience in loan origination, dealer channel management, and portfolio quality across banks (Axis, ICICI, Kotak) and OEM dealerships (Maruti Suzuki, Hyundai). Proven at building high-performing dealer networks, securing credit approvals, and sourcing quality business with minimal deviations — now leading EV (3-wheeler) finance at Ecofy.',
} as const

export type Experience = {
  role: string
  company: string
  note?: string
  start: string // display
  end: string // display
  location: string
  current?: boolean
  points: string[]
}

export const experiences: Experience[] = [
  {
    role: 'Sales Manager',
    company: 'Ecofy Finance Pvt. Ltd.',
    note: 'EV / Green Finance',
    start: 'Sep 2025',
    end: 'Present',
    location: 'Delhi',
    current: true,
    points: [
      'Drive sales of 3-wheeler EV finance products by building strong dealer relationships.',
      'Generate business through channels and ensure high-quality sourcing with minimal deviations.',
      'Identify, onboard, and manage dealers and connectors across the assigned territory.',
      'Coordinate with credit, operations, and risk teams for case approvals, FI/CPV.',
      'Manage dealer payouts, incentives, and issue resolution with internal teams.',
      'Support early-bucket collections (0–30 DPD) alongside the collections team.',
    ],
  },
  {
    role: 'Relationship Manager',
    company: 'Axis Bank Ltd.',
    note: 'Auto Loans',
    start: 'Mar 2025',
    end: 'Aug 2025',
    location: 'Delhi',
    points: [
      'Managed auto loans through car dealers, branches, and the direct sales team.',
      'Empanelled new car dealers, DSAs, and DSTs in the market.',
      'Owned sales performance and productivity of the team.',
      'Delivered training on product, policy, and market changes across channels.',
      'Interacted with the credit team to secure business approvals.',
      'Tracked channels for quality sourcing and a healthy portfolio.',
    ],
  },
  {
    role: 'Relationship Manager',
    company: 'ICICI Bank Ltd.',
    note: 'Auto Loans',
    start: 'Jun 2023',
    end: 'Jul 2024',
    location: 'Ghaziabad',
    points: [
      'Managed auto loans through car dealers, DSAs, and the direct sales team.',
      'Empanelled new car dealers, DSAs, and DSTs in the market.',
      'Accountable for sales performance and team productivity.',
      'Ran product/policy training and business promotional activities with channels.',
      'Monitored competitor products, policies, and market strategy.',
    ],
  },
  {
    role: 'Auto Finance Manager',
    company: 'Himgiri Auto India Pvt. Ltd.',
    note: 'Hyundai Motor India franchise',
    start: 'Jan 2022',
    end: 'May 2023',
    location: 'Delhi',
    points: [
      "Managed dealership customers' loan origination and end-to-end processes.",
      'Analyzed customer requirements and recommended products to maximize profitability.',
      'Reviewed loan applications and agreements for accuracy and policy compliance.',
      'Submitted loan and lease applications to appropriate lenders.',
      'Maintained strong lender relationships and processed financial contracts for company compensation.',
    ],
  },
  {
    role: 'Finance Manager',
    company: 'Competent Automobiles Co. Ltd.',
    note: 'Maruti Suzuki India franchise',
    start: 'Feb 2016',
    end: 'Jul 2020',
    location: 'Delhi',
    points: [
      "Managed dealership customers' loan origination and applicable processes.",
      'Recommended finance products to maximize company profits.',
      'Reviewed loan applications/agreements for completeness and policy accuracy.',
      'Coordinated with multiple lenders on loan programs and special offers.',
      'Trained the sales team on new finance processes and policies.',
    ],
  },
  {
    role: 'Associate',
    company: 'Kotak Mahindra Prime Ltd.',
    note: 'Payroll: Ivangel Sales & Services',
    start: 'Apr 2010',
    end: 'Feb 2016',
    location: 'Delhi',
    points: [
      'Handled a team of finance executives for car loans.',
      'Generated car-finance business through affiliated channels and teams.',
      'Reviewed loan applications and agreements for accuracy and policy compliance.',
      'Maintained coordination between the dealership and KMPL.',
      'Tracked daily MIS of team logins and sanction/disbursement TAT.',
    ],
  },
]

export const skills = [
  'Loan Origination Systems (LOS)',
  'Credit Analysis',
  'Dealer & Channel Management',
  'Credit Reporting Tools',
  'Financial Reporting',
  'Risk Management',
  'Compliance',
  'Portfolio Quality (DPD)',
  'Team Leadership',
  'Adaptability',
]

export const stats = [
  { value: '15+', label: 'Years in vehicle finance' },
  { value: '6', label: 'Banks & dealerships' },
  { value: '0–30', label: 'DPD collections focus' },
  { value: '100%', label: 'Policy-compliant sourcing' },
]

export const education = {
  degree: 'Bachelor of Science in Information Technology',
  period: '2011 – 2014',
}

/** Downloadable résumé (served from /public). */
export const resume = {
  path: '/Sandeep-Kumar-CV.pdf',
  downloadName: 'Sandeep-Kumar-CV.pdf',
}

/** Portfolio author / developer credit. */
export const developer = {
  name: 'Yogesh Chauhan',
  role: 'Web Developer',
  website: 'https://yogeshchauhan.dev',
  linkedin: 'https://www.linkedin.com/in/yogeshchauhan-dev/',
  github: 'https://github.com/Yogesh0627?tab=repositories',
} as const

export type Testimonial = {
  name: string
  role: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Yogesh Chauhan',
    role: 'Business Associate',
    quote:
      'What sets Sandeep apart is trust. Dealers, lenders, and customers all rely on his word — he built his network one honest deal at a time, and it shows in everything he does.',
  },
  {
    name: 'Arvind Kaushik',
    role: 'Dealer Principal',
    quote:
      'Sandeep is the finance partner every dealership wishes for. Clean files, fast approvals, and he treats our customers like his own. In years of working together, not a single deviation slipped through.',
  },
  {
    name: 'Deepak Chauhan',
    role: 'Credit Manager',
    quote:
      "I've worked alongside Sandeep on hundreds of cases. He reads credit and risk as well as anyone on the lending side — which is exactly why his sourcing quality stays consistently top-tier.",
  },
  {
    name: 'Sushmita Rawat',
    role: 'Relationship Manager',
    quote:
      "Sandeep is the colleague who makes the whole team better. Calm under pressure, generous with what he knows, and always steady on process — I've learned a great deal about auto finance just working beside him.",
  },
]

export const expertiseAreas = [
  {
    title: 'Loan Origination & Underwriting Support',
    body: 'End-to-end origination — from application review to lender submission — ensuring files are complete, accurate, and policy-compliant.',
  },
  {
    title: 'Dealer & Channel Development',
    body: 'Empanelling and growing dealer, DSA, and DST networks to expand market share and drive consistent, quality business.',
  },
  {
    title: 'Credit, Risk & Compliance',
    body: 'Partnering with credit and risk teams for approvals, FI/CPV, and healthy portfolios with minimal deviations.',
  },
  {
    title: 'EV & Emerging Finance',
    body: "Leading finance for electric 3-wheelers — bringing traditional auto-finance discipline to India's green-mobility transition.",
  },
]

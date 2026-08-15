// Practice area data. Content is descriptive only — no guarantees,
// case counts, or invented credentials are included per firm policy.

export const services = [
  {
    id: "corporate-business-law",
    number: "01",
    icon: "briefcase",
    title: "Corporate & Business Law",
    short: "Business agreements, corporate advisory, compliance and documentation.",
    summary:
      "Guidance for founders and companies on structuring, agreements and everyday compliance obligations, so business decisions rest on a sound legal footing.",
    coverage: [
      "Business and shareholder agreements",
      "Corporate structuring and advisory",
      "Regulatory compliance documentation",
      "Vendor and commercial contracts",
      "Due diligence support",
    ],
  },
  {
    id: "civil-law",
    number: "02",
    icon: "scale",
    title: "Civil Law",
    short: "Civil disputes, recovery matters, injunctions and legal representation.",
    summary:
      "Assistance with civil disputes and recovery matters, from initial assessment of a claim through to representation in the appropriate forum.",
    coverage: [
      "Civil disputes and claims",
      "Recovery and enforcement matters",
      "Injunctions and interim relief",
      "Representation before civil courts",
      "Settlement and mediation support",
    ],
  },
  {
    id: "criminal-law",
    number: "03",
    icon: "gavel",
    title: "Criminal Law",
    short: "Criminal complaints, bail matters, defence and legal assistance.",
    summary:
      "Support through criminal proceedings, including complaints, bail applications and defence representation, handled with discretion at every stage.",
    coverage: [
      "Criminal complaints and FIRs",
      "Bail and anticipatory bail matters",
      "Defence representation",
      "Legal assistance during investigation",
      "Appeals and revisions",
    ],
  },
  {
    id: "property-law",
    number: "04",
    icon: "home",
    title: "Property Law",
    short: "Property disputes, agreements, documentation and due diligence.",
    summary:
      "Advice on property transactions and disputes, including agreement review and due diligence before a client commits to a purchase or sale.",
    coverage: [
      "Sale and purchase agreements",
      "Title verification and due diligence",
      "Property disputes and litigation",
      "Lease and rental documentation",
      "Regulatory and society matters",
    ],
  },
  {
    id: "family-law",
    number: "05",
    icon: "users",
    title: "Family Law",
    short: "Matrimonial matters, divorce, maintenance, custody and related legal guidance.",
    summary:
      "Considerate guidance through matrimonial and family matters, where privacy and clarity of options matter as much as the legal process itself.",
    coverage: [
      "Divorce and separation matters",
      "Maintenance and alimony",
      "Child custody guidance",
      "Matrimonial dispute resolution",
      "Family settlement documentation",
    ],
  },
  {
    id: "employment-labour-law",
    number: "06",
    icon: "handshake",
    title: "Employment & Labour Law",
    short: "Employment agreements, workplace disputes, HR documentation and labour matters.",
    summary:
      "Advisory support for employers and employees on agreements, workplace policy and disputes arising in the course of employment.",
    coverage: [
      "Employment agreement drafting",
      "Workplace policy documentation",
      "Employment dispute resolution",
      "HR compliance guidance",
      "Termination and severance matters",
    ],
  },
  {
    id: "contract-agreement",
    number: "07",
    icon: "contract",
    title: "Contract & Agreement",
    short: "Drafting, reviewing, negotiating and structuring legal agreements.",
    summary:
      "Careful drafting and review of agreements, so terms are clear, obligations are balanced and risk is understood before a client signs.",
    coverage: [
      "Agreement drafting and structuring",
      "Contract review and redlining",
      "Negotiation support",
      "Vendor and service contracts",
      "Non-disclosure agreements",
    ],
  },
  {
    id: "legal-notices-documentation",
    number: "08",
    icon: "signature",
    title: "Legal Notices & Documentation",
    short: "Legal notices, affidavits, declarations and other legal documentation.",
    summary:
      "Preparation of legal notices and formal documentation, drafted precisely so a client's position is stated clearly and correctly.",
    coverage: [
      "Legal notice drafting",
      "Affidavits and declarations",
      "Formal legal correspondence",
      "Documentation review",
      "Record and filing support",
    ],
  },
];

export const getServiceById = (id) => services.find((s) => s.id === id);

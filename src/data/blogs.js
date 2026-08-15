export const blogs = [
  {
    id: "understanding-legal-notices",
    category: "Civil Law",
    date: "12 Jan 2026",
    title: "Understanding Legal Notices: When and Why Are They Used?",
    excerpt:
      "A legal notice is often the first formal step in resolving a dispute. Here is what it is intended to do, and when it is typically used.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
    body: [
      "A legal notice is a formal, written communication sent to another party stating a grievance and the sender's intended course of action if the matter is not resolved. It is often used as a first step before formal proceedings begin.",
      "The notice typically sets out the relevant facts, the specific relief being sought, and a reasonable timeframe within which the recipient is expected to respond. Its purpose is to give the other party a fair opportunity to address the concern before matters escalate.",
      "Because the wording and framing of a legal notice can materially affect how a dispute develops, it is generally advisable to have one reviewed or drafted with professional guidance rather than relying on a generic template.",
    ],
  },
  {
    id: "before-signing-property-agreement",
    category: "Property Law",
    date: "28 Jan 2026",
    title: "Important Things to Check Before Signing a Property Agreement",
    excerpt:
      "Property agreements carry long-term consequences. A few careful checks before signing can prevent significant complications later.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    body: [
      "Before signing any property agreement, it is worth confirming that the title of the property is clear and that the seller has the legal right to transfer it. Verifying this early can prevent complications after the transaction is complete.",
      "It is also useful to review the agreement for accuracy in the description of the property, the agreed payment schedule, and any conditions attached to possession or handover.",
      "Where the transaction involves a significant value or unfamiliar terms, having the agreement reviewed beforehand allows any ambiguous clauses to be clarified while there is still room to negotiate.",
    ],
  },
  {
    id: "understanding-employment-agreements",
    category: "Employment Law",
    date: "9 Feb 2026",
    title: "Understanding Employment Agreements",
    excerpt:
      "An employment agreement defines the relationship between employer and employee. Knowing what it typically covers helps both sides.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    body: [
      "An employment agreement typically sets out the role, compensation, working hours and notice period governing the relationship between an employer and employee. It also often addresses confidentiality and post-employment obligations.",
      "For employers, a clearly drafted agreement helps set expectations and reduces the likelihood of disputes later. For employees, reviewing the terms carefully before signing helps ensure the arrangement reflects what was discussed.",
      "Where terms are unclear or unusual clauses appear, seeking a professional review before signing can help both parties avoid misunderstandings.",
    ],
  },
  {
    id: "legal-considerations-for-businesses",
    category: "Corporate Law",
    date: "22 Feb 2026",
    title: "Common Legal Considerations for Businesses",
    excerpt:
      "From formation to daily operations, businesses encounter a range of legal considerations. Here are a few worth keeping in mind.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    body: [
      "Businesses of every size benefit from attention to a few recurring legal considerations: how the business is structured, how agreements with vendors and clients are documented, and how compliance obligations are tracked.",
      "Clear, well-drafted agreements reduce ambiguity in commercial relationships and can prevent disputes from arising in the first place. Reviewing standard contracts periodically is a useful habit as a business grows.",
      "As operations expand, it is worth revisiting existing documentation to confirm it still reflects how the business actually functions.",
    ],
  },
  {
    id: "civil-disputes-what-to-expect",
    category: "Civil Law",
    date: "6 Mar 2026",
    title: "Civil Disputes: What to Expect from the Process",
    excerpt:
      "Civil disputes can feel unfamiliar to those going through one for the first time. Here is a general overview of what the process involves.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop",
    body: [
      "A civil dispute generally begins with an attempt to resolve the disagreement directly, often through correspondence or a legal notice, before formal proceedings are considered.",
      "If the matter proceeds further, it typically involves filing before the appropriate forum, followed by an exchange of pleadings and evidence between the parties.",
      "Timelines can vary considerably depending on the nature of the matter, so it is useful to approach the process with realistic expectations from the outset.",
    ],
  },
  {
    id: "custody-and-maintenance-basics",
    category: "Family Law",
    date: "19 Mar 2026",
    title: "Custody and Maintenance: A Brief Overview",
    excerpt:
      "Matters involving custody and maintenance are often sensitive. This overview outlines a few of the general considerations involved.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
    body: [
      "Custody and maintenance matters are usually assessed with the welfare of any children involved as a central consideration, alongside the circumstances of both parties.",
      "Maintenance arrangements can take different forms depending on individual circumstances, and are generally intended to provide reasonable support rather than follow a single fixed formula.",
      "Because these matters are personal and often sensitive, approaching them with a clear understanding of the available options can make the process considerably easier to navigate.",
    ],
  },
];

export const getBlogById = (id) => blogs.find((b) => b.id === id);

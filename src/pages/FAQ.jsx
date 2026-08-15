import { useState } from "react";
import PageBanner from "../components/PageBanner.jsx";
import FAQItem from "../components/FAQItem.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import { faqs } from "../data/faqs.js";
import "./FAQ.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <PageBanner
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Answers to common questions about how consultations and engagements work. For anything specific to your situation, please get in touch directly."
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="section faq-page">
        <div className="container faq-page__container">
          <div className="faq-page__list">
            {faqs.map((item, i) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex((prev) => (prev === i ? -1 : i))}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Still Have a Question?"
        subheading="We're happy to help."
        text="If you couldn't find what you were looking for, reach out and our team will get back to you directly."
        buttonLabel="Contact Us"
        buttonTo="/contact"
      />
    </>
  );
}

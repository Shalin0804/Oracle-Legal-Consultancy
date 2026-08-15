import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import "./FAQItem.css";

export default function FAQItem({ question, answer, isOpen, onToggle }) {
  const id = useId();

  return (
    <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
      <button
        type="button"
        className="faq-item__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
      >
        <span>{question}</span>
        <span className="faq-item__icon">
          <FiPlus aria-hidden="true" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${id}`}
            role="region"
            className="faq-item__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

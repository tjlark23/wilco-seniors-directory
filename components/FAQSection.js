'use client';

import { useState } from 'react';

export default function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  function toggleFAQ(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item${openIndex === index ? ' open' : ''}`}
        >
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <span>{faq.question}</span>
            <span className="faq-chevron">&#x25BC;</span>
          </div>
          <div className="faq-answer">
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

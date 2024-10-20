import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How do I schedule an appointment?",
    answer: "You can schedule an appointment through your patient dashboard or by contacting our support team."
  },
  {
    question: "What should I do if I forgot my password?",
    answer: "Click on the 'Forgot Password' link on the login page to reset your password."
  },
  {
    question: "How can I view my medical records?",
    answer: "You can access your medical records from the 'Medical Records' section in your patient dashboard."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we use industry-standard encryption and follow HIPAA guidelines to ensure the security of your personal information."
  },
  {
    question: "How do I request a prescription refill?",
    answer: "You can request a prescription refill through the 'Medications' section in your patient dashboard or by contacting your healthcare provider."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
import React, { useState } from 'react';
import { MessageSquare, Mail, Phone, HelpCircle } from 'lucide-react';

const CustomerSupport: React.FC = () => {
  const [showSupportOptions, setShowSupportOptions] = useState(false);

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setShowSupportOptions(!showSupportOptions)}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
      >
        <HelpCircle size={24} />
      </button>
      {showSupportOptions && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64">
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center text-blue-500 hover:text-blue-700">
                <MessageSquare size={18} className="mr-2" />
                Live Chat
              </a>
            </li>
            <li>
              <a href="mailto:support@example.com" className="flex items-center text-blue-500 hover:text-blue-700">
                <Mail size={18} className="mr-2" />
                Email Support
              </a>
            </li>
            <li>
              <a href="tel:+1234567890" className="flex items-center text-blue-500 hover:text-blue-700">
                <Phone size={18} className="mr-2" />
                Call Us
              </a>
            </li>
            <li>
              <a href="/faq" className="flex items-center text-blue-500 hover:text-blue-700">
                <HelpCircle size={18} className="mr-2" />
                FAQs
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomerSupport;
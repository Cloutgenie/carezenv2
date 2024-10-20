import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

interface AppointmentFeedbackProps {
  appointmentId: number;
  doctorName: string;
  onSubmit: (feedback: { rating: number; comment: string }) => void;
}

const AppointmentFeedback: React.FC<AppointmentFeedbackProps> = ({ appointmentId, doctorName, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, comment });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Appointment Feedback</h2>
      <p className="mb-4">Please rate your appointment with Dr. {doctorName}</p>
      <div className="flex mb-4">
        {[1, 2, 3, 4,5].map((value) => (
          <button
            key={value}
            onClick={() => setRating(value)}
            className={`mr-2 focus:outline-none ${
              value <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            <Star className="w-8 h-8" fill={value <= rating ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Please share your thoughts about the appointment..."
          className="w-full p-2 border rounded-md mb-4"
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <Send className="w-5 h-5 mr-2" />
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default AppointmentFeedback;
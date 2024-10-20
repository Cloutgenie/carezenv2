import React, { useState, useEffect } from 'react';
import { Clock, Video, Settings } from 'lucide-react';

interface WaitingRoomProps {
  appointmentTime: string;
  doctorName: string;
  onJoinCall: () => void;
  onStartDeviceTest: () => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ appointmentTime, doctorName, onJoinCall, onStartDeviceTest }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const appointmentDate = new Date(appointmentTime);
      const diff = appointmentDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('It\'s time for your appointment!');
        clearInterval(timer);
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [appointmentTime]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Waiting Room</h2>
      <div className="flex items-center mb-4">
        <Clock className="w-6 h-6 text-blue-500 mr-2" />
        <p className="text-lg">
          {timeLeft === 'It\'s time for your appointment!' ? (
            <span className="text-green-500 font-semibold">{timeLeft}</span>
          ) : (
            <>Time until appointment: <span className="font-semibold">{timeLeft}</span></>
          )}
        </p>
      </div>
      <p className="mb-4">Your appointment with <span className="font-semibold">{doctorName}</span> will begin soon.</p>
      <p className="mb-6">Please ensure your camera and microphone are working properly.</p>
      <div className="flex space-x-4">
        <button
          onClick={onJoinCall}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <Video className="w-5 h-5 mr-2" />
          Join Call
        </button>
        <button
          onClick={onStartDeviceTest}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <Settings className="w-5 h-5 mr-2" />
          Test Devices
        </button>
      </div>
    </div>
  );
};

export default WaitingRoom;
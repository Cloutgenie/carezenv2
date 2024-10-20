import React, { useState, useEffect, useRef } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Settings } from 'lucide-react';
import WaitingRoom from './WaitingRoom';
import PostAppointmentSummary from './PostAppointmentSummary';

const VideoConsultation: React.FC = () => {
  const [isInWaitingRoom, setIsInWaitingRoom] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isTestMode, setIsTestMode] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isCallActive && !isTestMode) {
      // In a real application, you would initialize the video call here
      // For this example, we'll just simulate a video stream
      if (videoRef.current && localVideoRef.current) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
            // In a real application, you would send this stream to the other participant
            // and receive their stream to display in videoRef
          })
          .catch(err => {
            setError('Failed to access camera and microphone');
            console.error('Error accessing media devices:', err);
          });
      }
    }
  }, [isCallActive, isTestMode]);

  const startCall = () => {
    setIsInWaitingRoom(false);
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setMessages([]);
    setIsCallEnded(true);
    cleanupMediaStream();
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    // In a real application, you would mute/unmute the audio track here
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // In a real application, you would enable/disable the video track here
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, `You: ${newMessage}`]);
      setNewMessage('');
      // In a real application, you would send this message to the other participant
    }
  };

  const startDeviceTest = () => {
    setIsTestMode(true);
    setIsInWaitingRoom(false);
    // Start local video preview
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        setError('Failed to access camera and microphone');
        console.error('Error accessing media devices:', err);
      });
  };

  const endDeviceTest = () => {
    setIsTestMode(false);
    setIsInWaitingRoom(true);
    cleanupMediaStream();
  };

  const cleanupMediaStream = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {isInWaitingRoom && (
        <WaitingRoom
          appointmentTime="2023-04-15T10:00:00"
          doctorName="Dr. Jane Smith"
          onJoinCall={startCall}
          onStartDeviceTest={startDeviceTest}
        />
      )}
      {!isInWaitingRoom && !isCallEnded && (
        <>
          <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg mb-4 relative">
            {(isCallActive || isTestMode) && (
              <>
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover rounded-lg" />
                <video ref={localVideoRef} autoPlay playsInline muted className="absolute bottom-4 right-4 w-1/4 h-1/4 object-cover rounded-lg border-2 border-white" />
              </>
            )}
            {!isCallActive && !isTestMode && (
              <div className="flex items-center justify-center h-full">
                <p className="text-white">Call not started</p>
              </div>
            )}
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={toggleVideo}
              className={`p-2 rounded-full ${isVideoOn ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {isVideoOn ? <Video /> : <VideoOff />}
            </button>
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full ${isAudioOn ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {isAudioOn ? <Mic /> : <MicOff />}
            </button>
            {isCallActive && (
              <button
                onClick={endCall}
                className="p-2 rounded-full bg-red-500 text-white"
              >
                <PhoneOff />
              </button>
            )}
            {isTestMode && (
              <button
                onClick={endDeviceTest}
                className="p-2 rounded-full bg-green-500 text-white"
              >
                <Settings />
              </button>
            )}
          </div>
          {isCallActive && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Chat</h3>
              <div className="bg-white rounded-lg p-4 h-40 overflow-y-auto mb-2">
                {messages.map((msg, index) => (
                  <p key={index} className="mb-1">{msg}</p>
                ))}
              </div>
              <form onSubmit={sendMessage} className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
        </>
      )}
      {isCallEnded && <PostAppointmentSummary />}
    </div>
  );
};

export default VideoConsultation;
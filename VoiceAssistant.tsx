import { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Phone } from 'lucide-react';
import Vapi from '@vapi-ai/web';

interface VoiceAssistantProps {
  onClose: () => void;
}

const PUBLIC_KEY = 'b3287c66-ef7a-41f9-aed2-3c31df464b0d';
const ASSISTANT_ID = 'd2311144-f4b6-43c8-80a1-a819bf80c342';

export function VoiceAssistant({ onClose }: VoiceAssistantProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [status, setStatus] = useState('Hazırlanıyor...');
  const [callDuration, setCallDuration] = useState(0);
  const vapiRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      const vapi = new Vapi(PUBLIC_KEY);
      vapiRef.current = vapi;

      vapi.on('call-start', () => {
        setIsCallActive(true);
        setStatus('Aramada');
        setCallDuration(0);
        timerRef.current = setInterval(() => {
          setCallDuration(prev => prev + 1);
        }, 1000);
      });

      vapi.on('call-end', () => {
        setIsCallActive(false);
        setStatus('Arama bitti');
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      });


      vapi.on('error', (err: any) => {
        console.error('Vapi error:', err);
        setStatus('Hata oluştu');
      });

      setStatus('Hazır');

    } catch (error: any) {
      console.error('Vapi initialization error:', error);
      setStatus('Başlatılamadı');
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (e) {
          console.log('Cleanup:', e);
        }
      }
    };
  }, []);

  const handleStartCall = async () => {
    if (!vapiRef.current) return;

    try {
      setStatus('Bağlanıyor...');
      await vapiRef.current.start(ASSISTANT_ID);
    } catch (error: any) {
      setStatus('Bağlanamadı');
      alert('Arama başlatılamadı: ' + error.message);
    }
  };

  const handleEndCall = () => {
    if (!vapiRef.current) return;

    try {
      vapiRef.current.stop();
      setStatus('Hazır');
    } catch (error: any) {
      console.error('Stop failed:', error);
    }
  };

  const handleToggle = () => {
    if (isCallActive) {
      handleEndCall();
    } else {
      handleStartCall();
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col border border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Sesli Asistan</h3>
              <p className="text-xs text-gray-400">{status}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleToggle}
              disabled={status === 'Başlatılamadı'}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-2xl disabled:opacity-50 ${
                isCallActive
                  ? 'bg-gradient-to-r from-red-600 to-red-700 animate-pulse'
                  : 'bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700'
              }`}
            >
              {isCallActive ? (
                <MicOff className="w-16 h-16 text-white" />
              ) : (
                <Mic className="w-16 h-16 text-white" />
              )}
            </button>
            <p className="text-white text-lg font-medium">
              {isCallActive ? 'Konuşmayı bitir' : 'Konuşmaya başla'}
            </p>
            <p className="text-gray-400 text-sm">
              {isCallActive ? 'Mikrofon aktif' : 'Mikrofona tıklayın'}
            </p>
            {(isCallActive || callDuration > 0) && (
              <div className="mt-4 text-center">
                <p className="text-3xl font-bold text-white tabular-nums">
                  {formatDuration(callDuration)}
                </p>
                <p className="text-sm text-gray-400 mt-1">Konuşma Süresi</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <p className="text-center text-sm text-gray-400">
            {isCallActive ? 'Konuşabilirsiniz' : 'Mikrofona tıklayarak başlayın'}
          </p>
        </div>
      </div>
    </div>
  );
}

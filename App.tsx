import { useState, useEffect } from 'react';
import { Phone, Clock, Users, CheckCircle, Sparkles, MessageSquare, MessageCircle } from 'lucide-react';
import { ParticleLights } from './components/ui/particle-lights';
import { GradientButton } from './components/ui/gradient-button';
import { ChatInterface } from './components/ChatInterface';
import { QuoteRequestModal } from './components/QuoteRequestModal';
import { VoiceAssistant } from './components/VoiceAssistant';

function App() {
  const [typewriterText, setTypewriterText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const phrases = [
    'Müşteri Soruları',
    'Stok Takibi',
    'Sesli Yanıtlar',
    'Reçete Asistanı',
    '7/24 Destek'
  ];

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (!isDeleting && currentIndex <= currentPhrase.length) {
        setTypewriterText(currentPhrase.substring(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(type, 100);
      } else if (!isDeleting && currentIndex > currentPhrase.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          type();
        }, 2000);
      } else if (isDeleting && currentIndex >= 0) {
        setTypewriterText(currentPhrase.substring(0, currentIndex));
        currentIndex--;
        timeoutId = setTimeout(type, 50);
      } else if (isDeleting && currentIndex < 0) {
        isDeleting = false;
        currentIndex = 0;
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        timeoutId = setTimeout(type, 500);
      }
    };

    type();

    return () => clearTimeout(timeoutId);
  }, [currentPhraseIndex]);

  const handleQuoteRequest = (packageName: string) => {
    setSelectedPackage(packageName);
    setQuoteModalOpen(true);
  };

  const handleVoiceAssistant = () => {
    setIsVoiceOpen(true);
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative">
      <ParticleLights />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative z-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 relative z-20 flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] overflow-hidden flex items-center justify-center shadow-2xl">
              <img
                src="/Gemini_Generated_Image_5q3iiy5q3iiy5q3i_imgupscaler.ai_General_4K.jpg"
                alt="Eczane Asistanı Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent animate-gradient">
            <span>ECZANE ASİSTAN</span>
          </h1>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Eczanenizi 7/24 Yöneten
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
              Yapay Zeka Asistanı
            </span>
          </h2>

          <div className="h-8 md:h-10 mb-12 text-xl md:text-2xl text-blue-400 font-medium">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <GradientButton
              className="text-lg gap-2"
              onClick={handleVoiceAssistant}
            >
              <Phone className="w-5 h-5" />
              Sesli Asistanla Konuşun
            </GradientButton>
            <GradientButton
              variant="variant"
              className="text-lg gap-2"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageCircle className="w-5 h-5" />
              Mesaj Asistanına Yazın
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative z-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Eczaneler İçin <span className="text-blue-500">Özel Paketler</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Package 1 */}
          <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <MessageSquare className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">REÇETE ASİSTANI</h3>
              <p className="text-sm text-gray-400 mb-6">Temel Paket</p>

              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>WhatsApp otomatik yanıt sistemi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Instagram'dan otomatik yanıt sistemi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Temel stok sorgulama</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>7/24 aktif AI asistan</span>
                </li>
              </ul>

              <button
                onClick={() => handleQuoteRequest('REÇETE ASİSTANI')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                Teklif Al
              </button>
            </div>
          </div>

          {/* Package 2 */}
          <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-blue-500 hover:border-red-500 transition-all hover:scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-red-600 px-4 py-1 rounded-full text-sm font-bold">
              ÖNERİLEN
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <Phone className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">SES & MESAJ ASİSTANI</h3>
              <p className="text-sm text-gray-400 mb-6">Pro Paket</p>

              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Sesli çağrı yanıtlama sistemi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>WhatsApp + Instagram + Web desteği</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Reçete hatırlatıcı sistem</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Teslim bildirimi otomasyonu</span>
                </li>
              </ul>

              <button
                onClick={() => handleQuoteRequest('SES & MESAJ ASİSTANI')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 rounded-lg font-semibold transition-colors"
              >
                Teklif Al
              </button>
            </div>
          </div>

          {/* Package 3 */}
          <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-red-500 transition-all hover:scale-105 md:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <Users className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">RANDEVU & STOK ASİSTANI</h3>
              <p className="text-sm text-gray-400 mb-6">Business Paket</p>

              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Otomatik randevu planlama</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Akıllı stok uyarı sistemi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Müşteri CRM entegrasyonu</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Çok kanallı sesli + yazılı destek</span>
                </li>
              </ul>

              <button
                onClick={() => handleQuoteRequest('RANDEVU & STOK ASİSTANI')}
                className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
              >
                Teklif Al
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative z-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Eczaneler İçin Neden <span className="text-blue-500">Eczane Asistan?</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <button className="group text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all hover:scale-105 cursor-pointer">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30 group-hover:bg-blue-600/40 group-hover:scale-110 transition-all">
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Hızlı Yanıtlar</h3>
            <p className="text-gray-400">
              Müşterileriniz anında yanıt alır, memnuniyet artar
            </p>
          </button>

          <button className="group text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-red-500 transition-all hover:scale-105 cursor-pointer">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30 group-hover:bg-red-600/40 group-hover:scale-110 transition-all">
              <Sparkles className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">7/24 Aktif Sistem</h3>
            <p className="text-gray-400">
              Gece nöbetlerinde bile otomatik destek
            </p>
          </button>

          <button className="group text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all hover:scale-105 cursor-pointer">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30 group-hover:bg-blue-600/40 group-hover:scale-110 transition-all">
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Manuel İşleri Azaltır</h3>
            <p className="text-gray-400">
              Zaman kazanın, işinize odaklanın
            </p>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 relative z-20">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 eczaneasistan.com | 19 Entertainment and Digital World Limited</p>
        </div>
      </footer>

      {isChatOpen && <ChatInterface onClose={() => setIsChatOpen(false)} />}
      {isVoiceOpen && <VoiceAssistant onClose={() => setIsVoiceOpen(false)} />}
      {quoteModalOpen && (
        <QuoteRequestModal
          onClose={() => setQuoteModalOpen(false)}
          packageName={selectedPackage}
        />
      )}
    </div>
  );
}

export default App;

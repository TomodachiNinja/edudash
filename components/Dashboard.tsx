
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import {
  Home,
  Book,
  Calendar,
  MessageSquare,
  BarChart2,
  Award,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  BookOpen,
  CheckCircle,
  Clock,
  Zap,
  Flame,
  Sun,
  Moon,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Trophy,
  Globe,
  Wallet,
  Bot,
  Send,
  Sparkles,
  Newspaper,
  GraduationCap,
  User,
  Mail,
  Shield,
  ToggleLeft,
  ToggleRight,
  Mic,
  PhoneOff,
  Activity,
  Loader2,
  BellRing
} from 'lucide-react';
import { COURSES, STATS, ACTIVITY_DATA, UPCOMING_CLASSES, ACHIEVEMENTS, OPPORTUNITIES, NEWS_UPDATES } from '../constants';

interface DashboardProps {
  onLogout: () => void;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'alert' | 'success';
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Header Dropdown States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // News Carousel State
  const [newsSlide, setNewsSlide] = useState(0);

  // Chatbot State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi there! I am your AI Study Assistant. I can help you find courses, explain complex topics, or track your progress. What can I do for you today?' }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);

  // Live API State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveStatus, setLiveStatus] = useState<'connecting' | 'listening' | 'speaking' | 'error' | 'disconnected'>('disconnected');
  const liveSessionRef = useRef<any>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const inputProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);

  // Settings State
  const [profileName, setProfileName] = useState("John Doe");
  const [profileEmail, setProfileEmail] = useState("john.doe@example.com");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

  // Dark mode state initialization
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "New Course Available", message: "Advanced React Patterns is now live!", time: "2m ago", read: false, type: 'info' },
    { id: 2, title: "Assignment Due", message: "Complete UI Design Basics by tomorrow", time: "1h ago", read: false, type: 'alert' },
    { id: 3, title: "Achievement Unlocked", message: "You earned the 'Fast Learner' badge", time: "3h ago", read: true, type: 'success' },
    { id: 4, title: "Live Session", message: "Q&A with Sarah Johnson starts in 30m", time: "5h ago", read: true, type: 'info' },
  ]);

  // Click Outside Handler for Dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Notification Helpers
  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  // Carousel Auto-play
  useEffect(() => {
    if (isPaused || activeTab !== 'dashboard') return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % OPPORTUNITIES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, activeTab]);

  // News Carousel Auto-play
  useEffect(() => {
    if (activeTab !== 'dashboard') return;
    const interval = setInterval(() => {
      setNewsSlide((prev) => (prev + 1) % NEWS_UPDATES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTab]);

  // Handle Tab Change Scrolling
  useEffect(() => {
    if (activeTab === 'messages') {
        setTimeout(() => {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        mainContentRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeTab]);

  // Auto-scroll Chat
  useEffect(() => {
    if (chatMessages.length > 1) {
       if (activeTab === 'dashboard' || activeTab === 'messages') {
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
       }
    }
  }, [chatMessages]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % OPPORTUNITIES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + OPPORTUNITIES.length) % OPPORTUNITIES.length);
  };

  const nextNews = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNewsSlide((prev) => (prev + 1) % NEWS_UPDATES.length);
  };

  const prevNews = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNewsSlide((prev) => (prev - 1 + NEWS_UPDATES.length) % NEWS_UPDATES.length);
  };

  // Touch handlers for Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  const handleCancelSettings = () => {
    setProfileName("John Doe");
    setProfileEmail("john.doe@example.com");
    setEmailNotifications(true);
    setPublicProfile(true);
    alert("Changes discarded.");
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: userMsg,
        config: {
          systemInstruction: "You are a highly efficient AI Study Assistant. \nOutput Rules:\n- Format responses clearly with short paragraphs.\n- Use bullet points (• or -) for lists and steps.\n- Keep answers concise and direct.\n- Focus on helping the user learn or manage their studies.",
        }
      });

      const aiMsg = response.text || "I'm sorry, I couldn't generate a response.";
      setChatMessages(prev => [...prev, { role: 'model', text: aiMsg }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setChatMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong. Please check your connection and try again." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const startLiveSession = async () => {
    try {
      setIsLiveActive(true);
      setLiveStatus('connecting');
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      inputAudioContextRef.current = inputCtx;
      
      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      inputProcessorRef.current = processor;
      
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      outputAudioContextRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are a friendly and knowledgeable AI Educational Consultant. Help the student with questions about skills growth, career paths, and complex educational topics. Keep your responses conversational, encouraging, and concise.",
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          }
        },
        callbacks: {
          onopen: () => {
            setLiveStatus('listening');
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData && outputAudioContextRef.current) {
               setLiveStatus('speaking');
               const ctx = outputAudioContextRef.current;
               const audioBuffer = await decodeAudioData(audioData, ctx);
               
               const src = ctx.createBufferSource();
               src.buffer = audioBuffer;
               src.connect(ctx.destination);
               
               const currentTime = ctx.currentTime;
               if (nextStartTimeRef.current < currentTime) {
                  nextStartTimeRef.current = currentTime;
               }
               
               src.start(nextStartTimeRef.current);
               nextStartTimeRef.current += audioBuffer.duration;
               
               src.onended = () => {
                 if (ctx.currentTime >= nextStartTimeRef.current - 0.1) {
                    setLiveStatus('listening');
                 }
               };
            }
            if (msg.serverContent?.turnComplete) {
               setLiveStatus('listening');
            }
          },
          onclose: () => {
            setLiveStatus('disconnected');
            cleanupLiveSession();
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setLiveStatus('error');
          }
        }
      });
      
      liveSessionRef.current = await sessionPromise;

    } catch (error) {
      console.error("Failed to start live session:", error);
      setLiveStatus('error');
    }
  };

  const cleanupLiveSession = () => {
     if (liveSessionRef.current) {
        try { liveSessionRef.current.close(); } catch(e) { console.warn("Session close error", e); }
        liveSessionRef.current = null;
     }
     
     if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
     }
     
     if (inputAudioContextRef.current) {
        inputAudioContextRef.current.close();
        inputAudioContextRef.current = null;
     }
     
     if (outputAudioContextRef.current) {
        outputAudioContextRef.current.close();
        outputAudioContextRef.current = null;
     }
  };

  const stopLiveSession = () => {
     cleanupLiveSession();
     setIsLiveActive(false);
     setLiveStatus('disconnected');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCourseClick = (url: string) => {
      window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'courses', icon: Book, label: 'My Courses' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'messages', icon: MessageSquare, label: 'Messages', badge: 3 },
    { id: 'progress', icon: BarChart2, label: 'Progress' },
    { id: 'certificates', icon: Award, label: 'Certificates' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return <BookOpen className="text-white" size={24} aria-hidden="true" />;
      case 'CheckCircle': return <CheckCircle className="text-white" size={24} aria-hidden="true" />;
      case 'Clock': return <Clock className="text-white" size={24} aria-hidden="true" />;
      case 'Award': return <Award className="text-white" size={24} aria-hidden="true" />;
      case 'Zap': return <Zap className="text-white" size={16} aria-hidden="true" />;
      case 'Book': return <Book className="text-white" size={16} aria-hidden="true" />;
      case 'Flame': return <Flame className="text-white" size={16} aria-hidden="true" />;
      default: return null;
    }
  };

  const getAchievementIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap size={18} aria-hidden="true" />;
      case 'Book': return <Book size={18} aria-hidden="true" />;
      case 'Flame': return <Flame size={18} aria-hidden="true" />;
      default: return <Award size={18} aria-hidden="true" />;
    }
  }

  const getSlideIcon = (type: string) => {
    switch(type) {
      case 'internship': return <Briefcase size={16} className="text-white" aria-hidden="true" />;
      case 'scholarship': return <Wallet size={16} className="text-white" aria-hidden="true" />;
      case 'course': return <BookOpen size={16} className="text-white" aria-hidden="true" />;
      case 'achievement': return <Trophy size={16} className="text-white" aria-hidden="true" />;
      default: return <Star size={16} className="text-white" aria-hidden="true" />;
    }
  }

  // --- SUB-VIEWS RENDER FUNCTIONS ---

  const renderDashboard = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* HERO CAROUSEL COMPACT */}
      <div 
        className="relative w-full max-w-[1320px] h-[220px] md:h-[320px] rounded-[20px] bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#06B6D4] overflow-hidden shadow-2xl group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region" 
        aria-label="Featured Opportunities Carousel"
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
            {OPPORTUNITIES.map((slide, idx) => (
              <img 
                key={idx}
                src={slide.backgroundImage || `https://picsum.photos/1200/400?random=${idx}`}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${currentSlide === idx ? 'opacity-40 mix-blend-overlay' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80 mix-blend-multiply" />
        </div>

        <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl z-0" aria-hidden="true" />
        <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl z-0" aria-hidden="true" />

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex items-center">
            {OPPORTUNITIES.map((slide, index) => (
                <div 
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform flex flex-col justify-center px-6 md:px-12 ${
                        index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 w-full max-w-6xl mx-auto">
                        <div className="flex-1 space-y-2 md:space-y-4 text-white">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20 w-fit">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase">{slide.badge}</span>
                            </div>
                            
                            <h2 className="text-2xl md:text-4xl font-bold leading-tight drop-shadow-lg">
                                {slide.title}
                            </h2>
                            
                            <p className="text-sm md:text-lg text-blue-50 max-w-xl font-light opacity-90 line-clamp-2 md:line-clamp-none">
                                {slide.subtitle}
                            </p>

                            <button 
                                onClick={() => alert(`Redirecting to ${slide.title} application...`)}
                                className="mt-2 md:mt-4 px-5 py-2 md:px-6 md:py-3 bg-white text-primary rounded-xl font-bold text-xs md:text-sm hover:scale-105 hover:shadow-lg transition-all flex items-center gap-2 group/btn w-fit"
                                aria-label={`${slide.buttonText} for ${slide.title}`}
                            >
                                {slide.buttonText}
                                <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={16} />
                            </button>
                        </div>

                        <div className="hidden md:block w-[320px]">
                             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-2xl hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-white/20 rounded-lg text-white">
                                        {getSlideIcon(slide.type)}
                                    </div>
                                    {slide.cardValue && (
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-white">{slide.cardValue}</p>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{slide.cardTitle}</h3>
                                <p className="text-sm text-blue-100 mb-4">{slide.cardSubtitle}</p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {slide.tags?.map((tag, i) => (
                                        <span key={i} className="px-2 py-1 bg-black/20 rounded-md text-[10px] text-white/90 border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all z-20 group/nav"
            aria-label="Previous slide"
        >
            <ChevronLeft size={24} className="group-hover/nav:-translate-x-0.5 transition-transform" />
        </button>
        <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all z-20 group/nav"
            aria-label="Next slide"
        >
            <ChevronRight size={24} className="group-hover/nav:translate-x-0.5 transition-transform" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {OPPORTUNITIES.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-current={idx === currentSlide ? 'true' : 'false'}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                />
            ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {STATS.map((stat) => (
          <div key={stat.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                {getIcon(stat.iconName)}
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Learning Activity Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700" role="img" aria-label="Learning Activity Chart showing hours studied per day">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Learning Activity</h3>
              <select className="text-sm border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-lg p-2" aria-label="Select timeframe">
                <option>Last 7 Days</option>
                <option>Last Month</option>
              </select>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ACTIVITY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#8b5cf6" 
                    strokeWidth={3} 
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4, stroke: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Education News Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
             <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-700/50">
               <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                 <Newspaper size={18} className="text-primary" />
                 Education News
               </h3>
               <div className="flex gap-1">
                 <button onClick={prevNews} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" aria-label="Previous news">
                   <ChevronLeft size={16} className="dark:text-gray-300" />
                 </button>
                 <button onClick={nextNews} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" aria-label="Next news">
                   <ChevronRight size={16} className="dark:text-gray-300" />
                 </button>
               </div>
             </div>
             
             <div className="relative h-48 group">
                <div 
                   className="flex transition-transform duration-500 ease-in-out h-full"
                   style={{ transform: `translateX(-${newsSlide * 100}%)` }}
                >
                   {NEWS_UPDATES.map((news) => (
                     <div key={news.id} className="min-w-full h-full relative">
                        <img 
                          src={news.image} 
                          alt="" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end">
                           <span className="text-xs font-bold text-primary bg-white px-2 py-0.5 rounded w-fit mb-2">
                             {news.category}
                           </span>
                           <h4 className="text-white font-bold leading-tight line-clamp-2 mb-1">
                             {news.title}
                           </h4>
                           <span className="text-gray-300 text-xs">{news.date}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* My Courses Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Continue Learning</h3>
              <button 
                onClick={() => setActiveTab('courses')}
                className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {COURSES.slice(0, 3).map((course) => (
                <div 
                  key={course.id} 
                  onClick={() => handleCourseClick(course.youtubeUrl)}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-primary shadow-sm">
                      {course.category}
                    </span>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors" title={course.title}>
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-1.5 py-0.5 rounded text-xs font-bold text-yellow-600 dark:text-yellow-400">
                             <Star size={10} className="fill-current" /> {course.rating}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 mt-1">
                       <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} alt="" className="w-6 h-6 rounded-full" />
                       <p className="text-sm text-gray-500 dark:text-gray-400">{course.instructor}</p>
                    </div>

                    <div className="mt-auto space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                            <span>{course.progress}% Complete</span>
                            <span>{course.hoursLeft}h remaining</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-primary h-1.5 rounded-full transition-all duration-1000 ease-out" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <button className="w-full py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium text-sm hover:bg-primary hover:text-white hover:border-primary transition-colors flex items-center justify-center gap-2 group/btn">
                           Continue Learning
                           <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* AI Chatbot Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Sparkles size={20} className="text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-bold">AI Study Assistant</h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Online • Powered by Gemini 2.5
                  </p>
                </div>
              </div>
              <button 
                onClick={startLiveSession}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-all group relative"
                title="Start Voice Session"
              >
                <Mic size={20} className="text-white group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-400 border-2 border-primary rounded-full animate-pulse"></span>
              </button>
            </div>

            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50 scroll-smooth"
              role="log"
              aria-live="polite"
              aria-label="Chat history"
            >
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3.5 rounded-2xl shadow-sm whitespace-pre-wrap text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                  }`}>
                    {msg.role === 'model' && (
                        <div className="flex items-center gap-2 mb-1 opacity-50 text-xs border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
                            <Bot size={12} /> AI Assistant
                        </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-100 dark:border-gray-700 flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border-none rounded-xl focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-400"
                  aria-label="Type your message"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || isChatLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Widgets */}
        <div className="space-y-8">
          {/* Upcoming Classes */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Classes</h3>
            <div className="space-y-4">
              {UPCOMING_CLASSES.map((cls) => (
                <div key={cls.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors group cursor-pointer">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-bold text-center min-w-[60px]">
                    <span className="block text-xs uppercase opacity-70">{cls.date === 'Today' || cls.date === 'Tomorrow' ? cls.date : cls.date.split(' ')[0]}</span>
                    <span className="text-lg">{cls.date.includes('Oct') ? cls.date.split(' ')[1] : ''}</span>
                    { (cls.date === 'Today' || cls.date === 'Tomorrow') && <Calendar size={16} className="mx-auto mt-1" /> }
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-primary transition-colors">{cls.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cls.instructor}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs font-medium text-gray-400">
                      <Clock size={12} /> {cls.time}
                    </div>
                  </div>
                  <button className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`Join ${cls.title}`}>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-gray-500 hover:text-primary font-medium transition-colors">
                View Full Schedule
            </button>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
            <div className="space-y-4">
              {ACHIEVEMENTS.map((ach) => (
                <div key={ach.id} className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700 ${ach.color}`}>
                    {getAchievementIcon(ach.iconName)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{ach.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Earned on {ach.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Courses</h2>
                <p className="text-gray-500 dark:text-gray-400">Manage your learning journey</p>
             </div>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search your courses..." 
                  className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full md:w-64 focus:ring-2 focus:ring-primary/50 outline-none"
                />
             </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {COURSES.map((course) => (
                <div 
                  key={course.id} 
                  onClick={() => handleCourseClick(course.youtubeUrl)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                >
                  <div className="relative h-48">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" loading="lazy" />
                    <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-primary">
                      {course.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1" title={course.title}>{course.title}</h4>
                     </div>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Instructor: {course.instructor}</p>
                     
                     <div className="mt-auto space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                            <span>{course.progress}%</span>
                            <span>{course.hoursLeft}h left</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                          </div>
                        </div>
                        <button className="w-full py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg font-medium transition-colors">
                            Continue
                        </button>
                     </div>
                  </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderCalendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    
    // Generate simple grid for current month
    const gridDays = Array.from({length: 35}, (_, i) => i + 1);

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h2>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{currentMonth} 2023</h3>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><ChevronLeft size={20} /></button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><ChevronRight size={20} /></button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-4 mb-4">
                        {days.map(d => <div key={d} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">{d}</div>)}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-4">
                        {gridDays.map((day, i) => {
                            const isToday = day === currentDate.getDate();
                            const hasEvent = i % 5 === 0; // Fake events
                            return (
                                <div key={i} className={`aspect-square flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 relative ${isToday ? 'bg-primary text-white hover:bg-primary' : 'text-gray-700 dark:text-gray-300'}`}>
                                    <span className="text-sm font-medium">{day <= 31 ? day : day - 31}</span>
                                    {hasEvent && day <= 31 && !isToday && <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1"></span>}
                                </div>
                            )
                        })}
                    </div>
                </div>
                
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Upcoming Schedule</h3>
                        <div className="space-y-4">
                            {UPCOMING_CLASSES.map(cls => (
                                <div key={cls.id} className="flex gap-4 items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg text-center min-w-[50px]">
                                        <span className="text-xs font-bold block">{cls.time.split(' ')[0]}</span>
                                        <span className="text-[10px]">{cls.time.split(' ')[1]}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{cls.title}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{cls.instructor}</p>
                                        <div className="flex items-center gap-1 mt-1 text-xs text-primary font-medium">
                                            <Globe size={12} /> Online Class
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const renderSettings = () => (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
            <p className="text-gray-500 dark:text-gray-400">Manage your profile and preferences</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Profile Information</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="relative">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md" />
                            <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full border-2 border-white dark:border-gray-700 hover:bg-primary/90 transition-colors" aria-label="Change photo">
                                <Settings size={14} />
                            </button>
                        </div>
                        <div>
                            <button className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Change Photo</button>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input 
                              type="text" 
                              value={profileName} 
                              onChange={(e) => setProfileName(e.target.value)}
                              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" 
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input 
                              type="email" 
                              value={profileEmail} 
                              onChange={(e) => setProfileEmail(e.target.value)}
                              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-gray-50/50 dark:bg-gray-800/50">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Preferences</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about your course progress</p>
                        </div>
                        <button onClick={() => setEmailNotifications(!emailNotifications)} className={`p-1 rounded-full transition-colors ${emailNotifications ? 'text-primary' : 'text-gray-400'}`}>
                           {emailNotifications ? <ToggleRight size={32} className="fill-current" /> : <ToggleLeft size={32} />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme appearance</p>
                        </div>
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-1 rounded-full transition-colors ${isDarkMode ? 'text-primary' : 'text-gray-400'}`}>
                           {isDarkMode ? <ToggleRight size={32} className="fill-current" /> : <ToggleLeft size={32} />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Public Profile</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Allow others to see your certificates</p>
                        </div>
                        <button onClick={() => setPublicProfile(!publicProfile)} className={`p-1 rounded-full transition-colors ${publicProfile ? 'text-primary' : 'text-gray-400'}`}>
                           {publicProfile ? <ToggleRight size={32} className="fill-current" /> : <ToggleLeft size={32} />}
                        </button>
                    </div>
                </div>
                
                <div className="mt-8 flex justify-end gap-3">
                    <button onClick={handleCancelSettings} className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSaveSettings} className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 hover:shadow-lg transition-all">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    </div>
  );

  const renderPlaceholder = (title: string) => (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-fadeIn">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Sparkles size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-gray-500 max-w-md">This feature is currently under development. Check back soon for updates!</p>
          <button onClick={() => setActiveTab('dashboard')} className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Return to Dashboard
          </button>
      </div>
  );

  const renderContent = () => {
    switch(activeTab) {
        case 'dashboard': return renderDashboard();
        case 'courses': return renderCourses();
        case 'calendar': return renderCalendar();
        case 'settings': return renderSettings();
        case 'messages': return renderDashboard(); 
        case 'progress': return renderPlaceholder('Progress Analytics');
        case 'certificates': return renderPlaceholder('My Certificates');
        default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen w-64 bg-[#1F2937] text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 shadow-xl`}>
        <div className="h-full px-4 py-6 flex flex-col">
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-2 mb-8 hover:opacity-80 transition-opacity w-fit"
            aria-label="Go to landing page"
          >
            <div className="bg-primary p-2 rounded-lg">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-wide">EduDash</span>
          </button>

          <div className="mb-8 px-2 flex items-center gap-3">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
                alt="Profile" 
                className="w-12 h-12 rounded-full border-2 border-primary object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1F2937] rounded-full"></span>
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm truncate">{profileName}</h3>
              <p className="text-xs text-gray-400 truncate">{profileEmail}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                }}
                aria-current={activeTab === item.id ? 'page' : undefined}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={activeTab === item.id ? 'animate-pulse' : ''} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-700">
             <button 
               onClick={onLogout}
               className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors"
             >
               <LogOut size={20} />
               <span className="font-medium text-sm">Logout</span>
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header ref={headerRef} className="bg-white dark:bg-gray-800 h-20 shadow-sm sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Toggle menu"
              aria-expanded={sidebarOpen}
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-3 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <label htmlFor="search-input" className="sr-only">Search</label>
              <input 
                id="search-input"
                type="text" 
                placeholder="Search courses, skills..." 
                className="pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50 w-64 transition-all placeholder:text-gray-400 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 relative">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="relative">
                <button 
                    onClick={() => {
                        setShowNotifications(!showNotifications);
                        setShowProfileMenu(false);
                    }}
                    className={`relative p-2 rounded-full transition-all duration-200 ${
                        showNotifications ? 'bg-primary/10 text-primary' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    aria-label="Notifications"
                >
                    <Bell size={20} className={showNotifications ? 'fill-current' : ''} />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full animate-pulse"></span>
                    )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                    <div className="absolute top-12 right-0 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-slideDown origin-top-right">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
                             <div className="flex items-center gap-2">
                                <BellRing size={18} className="text-primary" />
                                <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                             </div>
                             <button 
                                onClick={() => setShowNotifications(false)} 
                                className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                             >
                                <X size={16} />
                             </button>
                        </div>
                        <div className="max-h-[360px] overflow-y-auto">
                             {notifications.length > 0 ? (
                                 notifications.map((notif) => (
                                     <div 
                                        key={notif.id} 
                                        onClick={() => markAsRead(notif.id)}
                                        className={`p-4 border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer relative ${!notif.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                                     >
                                         {!notif.read && (
                                             <span className="absolute left-2 top-6 w-2 h-2 rounded-full bg-primary"></span>
                                         )}
                                         <div className="pl-3">
                                             <div className="flex justify-between items-start mb-1">
                                                 <h4 className={`text-sm font-semibold ${!notif.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                                                     {notif.title}
                                                 </h4>
                                                 <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                                             </div>
                                             <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{notif.message}</p>
                                         </div>
                                     </div>
                                 ))
                             ) : (
                                 <div className="p-8 text-center text-gray-500">
                                     <p>No new notifications</p>
                                 </div>
                             )}
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700/30 text-center border-t border-gray-100 dark:border-gray-700">
                             <button 
                                onClick={markAllAsRead}
                                className="text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wide"
                             >
                                 Mark all as read
                             </button>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700 relative">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{profileName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
              </div>
              
              <div className="relative">
                  <button 
                    onClick={() => {
                        setShowProfileMenu(!showProfileMenu);
                        setShowNotifications(false);
                    }}
                    className={`relative rounded-full transition-all duration-200 ring-2 ring-transparent ${
                        showProfileMenu ? 'ring-primary' : 'hover:ring-gray-200 dark:hover:ring-gray-700'
                    }`}
                    aria-label="User menu"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 object-cover shadow-sm"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                      <div className="absolute top-14 right-0 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-slideDown origin-top-right">
                         <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-br from-primary/5 to-transparent">
                             <div className="flex items-center gap-3 mb-2">
                                <img 
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
                                  alt="Profile" 
                                  className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700 shadow-md" 
                                />
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white text-sm">{profileName}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">{profileEmail}</p>
                                </div>
                             </div>
                             <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-md">
                                PRO MEMBER
                             </span>
                         </div>
                         <div className="p-2 space-y-1">
                             <button 
                                onClick={() => { setActiveTab('dashboard'); setShowProfileMenu(false); }} 
                                className="w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl flex items-center gap-3 transition-colors"
                             >
                                 <User size={16} className="text-gray-400" /> My Profile
                             </button>
                             <button 
                                onClick={() => { setActiveTab('settings'); setShowProfileMenu(false); }} 
                                className="w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl flex items-center gap-3 transition-colors"
                             >
                                 <Settings size={16} className="text-gray-400" /> Settings
                             </button>
                             <button 
                                className="w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl flex items-center gap-3 transition-colors"
                             >
                                 <Shield size={16} className="text-gray-400" /> Privacy
                             </button>
                             <div className="h-px bg-gray-100 dark:bg-gray-700 my-1 mx-2"></div>
                             <button 
                                onClick={onLogout} 
                                className="w-full text-left px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl flex items-center gap-3 transition-colors font-medium"
                             >
                                 <LogOut size={16} /> Logout
                             </button>
                         </div>
                      </div>
                  )}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main 
          className="flex-1 p-4 sm:p-8 overflow-y-auto scroll-smooth relative" 
          ref={mainContentRef}
        > 
           {/* Welcome Header (Only show on Dashboard) */}
           {activeTab === 'dashboard' && (
             <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-slideDown">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {profileName.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    You've learned <span className="text-primary font-bold">4.5 hours</span> this week. Keep it up!
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Calendar size={18} className="text-primary" />
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
             </div>
           )}

           {/* Render specific view */}
           {renderContent()}

        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Live Tutor Modal */}
      {isLiveActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative border border-white/10">
                <button 
                    onClick={stopLiveSession} 
                    className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center bg-gradient-to-b from-indigo-500/10 to-transparent">
                    <div className="mb-6 relative">
                        <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${liveStatus === 'speaking' ? 'bg-primary shadow-[0_0_50px_rgba(124,58,237,0.5)] scale-110' : 'bg-gray-200 dark:bg-gray-700'}`}>
                           {liveStatus === 'speaking' ? (
                               <Activity size={48} className="text-white animate-pulse" />
                           ) : liveStatus === 'listening' ? (
                               <Mic size={48} className="text-gray-500 dark:text-gray-300 animate-bounce" />
                           ) : (
                               <Loader2 size={48} className="text-primary animate-spin" />
                           )}
                        </div>
                        {liveStatus === 'speaking' && (
                            <>
                                <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping"></div>
                                <div className="absolute inset-0 border-4 border-primary/10 rounded-full animate-ping animation-delay-300"></div>
                            </>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        AI Tutor Live
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-[260px]">
                        {liveStatus === 'connecting' ? 'Connecting to Gemini...' : 
                         liveStatus === 'listening' ? 'Listening... Ask about your skills or career path.' : 
                         liveStatus === 'speaking' ? 'Speaking...' : 'Ready'}
                    </p>

                    <div className="flex items-center justify-center gap-4">
                         <button 
                            onClick={stopLiveSession}
                            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-red-500/30 flex items-center gap-2"
                         >
                             <PhoneOff size={20} />
                             End Session
                         </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

// Helper function for converting Float32Array to 16-bit PCM and base64 encoding
function createBlob(data: Float32Array) {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  
  let binary = '';
  const bytes = new Uint8Array(int16.buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);

  return {
    data: base64,
    mimeType: 'audio/pcm;rate=16000',
  };
}

// Helper function to decode base64 16-bit PCM to AudioBuffer
async function decodeAudioData(
  base64: string,
  ctx: AudioContext,
): Promise<AudioBuffer> {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const dataInt16 = new Int16Array(bytes.buffer);
  const frameCount = dataInt16.length; 
  // Gemini 2.5 Live API output is 24kHz mono
  const buffer = ctx.createBuffer(1, frameCount, 24000);
  const channelData = buffer.getChannelData(0);
  
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  
  return buffer;
}

export default Dashboard;

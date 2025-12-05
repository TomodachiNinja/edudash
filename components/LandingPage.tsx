import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Menu, 
  X, 
  BookOpen, 
  BarChart2, 
  Award, 
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Star
} from 'lucide-react';
import { TESTIMONIALS, NEWS_UPDATES } from '../constants';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % NEWS_UPDATES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="bg-primary/10 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                EduDash
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors font-medium">Home</a>
              <a href="#courses" className="text-gray-600 hover:text-primary transition-colors font-medium">Courses</a>
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors font-medium">About</a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors font-medium">Contact</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={onLogin}
                className="text-gray-700 hover:text-primary font-medium px-4 py-2 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={onLogin}
                className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 p-2">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Home</a>
              <a href="#courses" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Courses</a>
              <a href="#features" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">About</a>
              <a href="#contact" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Contact</a>
              <div className="mt-4 flex flex-col space-y-3">
                <button onClick={onLogin} className="w-full text-center py-3 border border-gray-200 rounded-lg text-gray-700 font-medium">Login</button>
                <button onClick={onLogin} className="w-full text-center py-3 bg-primary text-white rounded-lg font-medium">Sign Up</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-white via-purple-50 to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
                Transform Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Learning Journey
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Access world-class courses and track your progress with our intuitive dashboard. Join a community of lifelong learners today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={onLogin} className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                  Get Started
                </button>
                <button className="px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-bold text-lg hover:border-primary hover:text-primary hover:bg-white transition-all">
                  Explore Courses
                </button>
              </div>
              
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://picsum.photos/40/40?random=${i+20}`} alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                  ))}
                </div>
                <p>Trusted by 10,000+ students</p>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
              
              <div className="relative rounded-3xl shadow-2xl border-4 border-white overflow-hidden aspect-[4/3] w-full bg-gray-100 group">
                  {NEWS_UPDATES.map((item, index) => (
                    <div 
                      key={item.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentNewsIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms]"
                        />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                          <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
                            <span className="inline-block px-3 py-1 bg-primary/90 rounded-full text-xs font-bold tracking-wider mb-2 backdrop-blur-sm border border-white/20">
                              {item.category}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-1 drop-shadow-lg">
                              {item.title}
                            </h3>
                          </div>
                    </div>
                  ))}
                  
                  {/* Progress Indicators */}
                  <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
                    {NEWS_UPDATES.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentNewsIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                      />
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose EduDash?
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "Interactive Courses", desc: "Engaging content designed for maximum retention." },
              { icon: BarChart2, title: "Track Progress", desc: "Visual analytics to monitor your daily growth." },
              { icon: GraduationCap, title: "Expert Instructors", desc: "Learn from industry leaders and professionals." },
              { icon: Award, title: "Certificates", desc: "Earn recognized certificates upon completion." },
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 hover:-translate-y-2">
                <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white text-primary transition-colors">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-[#1F2937] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "10,000+", label: "Students" },
              { num: "500+", label: "Courses" },
              { num: "100+", label: "Instructors" },
              { num: "95%", label: "Success Rate" },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                  {stat.num}
                </p>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Get Started in 3 Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>
            
            {[
              { step: 1, title: "Sign Up", desc: "Create your free account in seconds." },
              { step: 2, title: "Choose Course", desc: "Browse our catalog and select a path." },
              { step: 3, title: "Start Learning", desc: "Watch lessons and track progress." },
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-100 shadow-lg flex items-center justify-center text-2xl font-bold text-primary mb-6 relative z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-16">
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < t.rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
                  ))}
                </div>
                <p className="text-gray-600 mb-8 italic flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of students today and take the first step towards your new career.
          </p>
          <button onClick={onLogin} className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2937] text-gray-300 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">EduDash</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Empowering learners worldwide with accessible, high-quality education and cutting-edge tools.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Popular Courses</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Science</a></li>
                <li><a href="#" className="hover:text-white transition-colors">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Digital Marketing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Contact</h3>
              <ul className="space-y-4 text-sm">
                <li>hello@edudash.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Education Lane<br/>San Francisco, CA 94105</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} EduDash. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
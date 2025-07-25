import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";
import { Menu, X, Rocket, Play, ChartLine, Shield, Users, Phone, Check } from "lucide-react";
import rocketImage from "../assets/3d-rocket.png";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const createRippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'absolute bg-white bg-opacity-30 rounded-full pointer-events-none animate-ping';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white min-h-screen font-poppins relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs */}
        <div className="absolute top-32 left-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-64 right-32 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute bottom-64 left-64 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 right-48 w-56 h-56 bg-purple-300/15 rounded-full blur-2xl animate-bounce-slow" style={{animationDelay: '2s'}}></div>
        
        {/* Medium orbs */}
        <div className="absolute top-96 left-1/3 w-40 h-40 bg-violet-400/8 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-indigo-300/12 rounded-full blur-lg animate-bounce-slow" style={{animationDelay: '1.5s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/5 w-2 h-2 bg-purple-300/40 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-1/4 w-2.5 h-2.5 bg-indigo-300/35 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/6 w-2 h-2 bg-pink-300/40 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-violet-300/45 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/25 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
        
        {/* Subtle light rays */}
        <div className="absolute top-0 left-1/4 w-px h-64 bg-gradient-to-b from-white/20 to-transparent rotate-12 animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-48 bg-gradient-to-b from-purple-300/20 to-transparent -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
          navbarVisible ? 'translate-y-0' : '-translate-y-full'
        } bg-gradient-to-r from-purple-800/90 to-purple-900/90 backdrop-blur-sm`}
      >
        <div className="flex justify-between items-center p-6 px-4 md:px-10">
          <div className="animate-fade-in flex items-center space-x-2">
            <Rocket className="w-8 h-8 text-white" />
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              SkyHit
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 text-sm font-medium">
            <li>
              <button 
                onClick={() => scrollToSection('about')}
                className="hover:text-purple-200 transition-colors duration-300"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('team')}
                className="hover:text-purple-200 transition-colors duration-300"
              >
                Team
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('services')}
                className="hover:text-purple-200 transition-colors duration-300"
              >
                Services
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="hover:text-purple-200 transition-colors duration-300"
              >
                Pricing
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className="hover:text-purple-200 transition-colors duration-300"
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:text-purple-200 hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* CTA Button */}
          <Button 
            className="hidden md:block bg-white text-purple-800 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-purple-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={(e) => {
              createRippleEffect(e);
              setLocation("/login");
            }}
          >
            GET STARTED
          </Button>
        </div>
      </nav>
      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-purple-900 bg-opacity-95 z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-lg font-medium">
            <button 
              onClick={() => scrollToSection('about')}
              className="hover:text-purple-200 transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className="hover:text-purple-200 transition-colors duration-300"
            >
              Team
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="hover:text-purple-200 transition-colors duration-300"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="hover:text-purple-200 transition-colors duration-300"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-purple-200 transition-colors duration-300"
            >
              Contact
            </button>
            <Button 
              className="bg-white text-purple-800 px-8 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors duration-300 mt-4"
              onClick={(e) => {
                createRippleEffect(e);
                setLocation("/login");
              }}
            >
              GET STARTED
            </Button>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-32 left-10 w-20 h-20 bg-purple-400 opacity-10 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-52 right-16 w-12 h-12 bg-white opacity-5 rounded-full animate-bounce-slow" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                Boost Your<br />
                Website Traffic<br />
                <span className="bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
                  Instantly
                </span>
              </h1>
              
              <p className="max-w-lg text-base md:text-lg opacity-90 mb-8 leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
                Join thousands of businesses using our advanced traffic exchange to drive real visitors and grow your online presence with proven results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 min-w-[160px] relative overflow-hidden"
                  onClick={(e) => {
                    createRippleEffect(e);
                    setLocation("/login");
                  }}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Start Free Trial
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-2 border-white border-opacity-30 text-white px-8 py-3.5 rounded-full font-medium hover:bg-white hover:bg-opacity-10 hover:border-opacity-50 transition-all duration-300 min-w-[160px] bg-transparent"
                  onClick={createRippleEffect}
                >
                  <Play className="w-4 h-4 mr-2" />
                  View Demo
                </Button>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-8 animate-slide-up" style={{animationDelay: '0.6s'}}>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">50K+</div>
                  <div className="text-sm opacity-70">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">2M+</div>
                  <div className="text-sm opacity-70">Hits Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">99.9%</div>
                  <div className="text-sm opacity-70">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right Rocket Image */}
            <div className="flex justify-center lg:justify-end animate-slide-up" style={{animationDelay: '0.8s'}}>
              <div className="relative group">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-purple-400 opacity-20 blur-3xl rounded-full transform scale-110 animate-pulse"></div>
                
                {/* 3D Rocket Image */}
                <div className="relative z-10 transform group-hover:scale-105 transition-all duration-500 ease-out">
                  <img 
                    src={rocketImage} 
                    alt="3D Rocket Launch" 
                    className="w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] drop-shadow-2xl object-contain"
                    style={{transform: 'rotate(28deg)'}}
                  />
                </div>
                
                {/* Floating particles around rocket */}
                <div className="absolute top-12 -left-6 w-2 h-2 bg-white rounded-full opacity-60 animate-ping" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-20 -right-8 w-1.5 h-1.5 bg-purple-200 rounded-full opacity-70 animate-ping" style={{animationDelay: '1.8s'}}></div>
                <div className="absolute bottom-16 -left-4 w-1 h-1 bg-cyan-300 rounded-full opacity-80 animate-ping" style={{animationDelay: '2.5s'}}></div>
                <div className="absolute bottom-24 -right-6 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-ping" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
          </div>
        </div>

      </section>
      {/* Trust Indicators */}
      <section className="py-12 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-12 opacity-70">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-300" />
                <span className="text-sm font-medium">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-300" />
                <span className="text-sm font-medium">Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-8 md:py-12 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              We provide everything you need to accelerate your business growth with confidence and ease.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ChartLine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Growth Analytics</h3>
              <p className="opacity-80 leading-relaxed">Track your business metrics with advanced analytics and insights that drive informed decisions.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
              <p className="opacity-80 leading-relaxed">Bank-level security with 256-bit encryption ensures your business data stays protected.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="opacity-80 leading-relaxed">Seamless collaboration tools that keep your team aligned and productive across all projects.</p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-700 to-purple-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-8 left-8 w-20 h-20 border border-white rounded-full"></div>
              <div className="absolute bottom-8 right-8 w-16 h-16 border border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of successful businesses already using our platform to achieve their growth goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-purple-800 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-lg min-w-[180px] relative overflow-hidden"
                  onClick={(e) => {
                    createRippleEffect(e);
                    setLocation("/login");
                  }}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Get Started Today
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-300 min-w-[180px] bg-transparent"
                  onClick={createRippleEffect}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Sales
                </Button>
              </div>

              <p className="mt-6 text-sm opacity-70">
                <Check className="w-4 h-4 inline mr-2 text-green-300" />
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer id="contact" className="py-12 px-6 border-t border-white border-opacity-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent text-[24px]">SkyHit</span>
              </div>
              <p className="opacity-80 text-sm leading-relaxed">
                Empowering businesses worldwide with innovative solutions for sustainable growth and success.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><button className="hover:text-purple-200 transition-colors duration-300">Features</button></li>
                <li><button className="hover:text-purple-200 transition-colors duration-300">Pricing</button></li>
                <li><button className="hover:text-purple-200 transition-colors duration-300">Security</button></li>
                <li><button className="hover:text-purple-200 transition-colors duration-300">Integrations</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><button className="hover:text-purple-200 transition-colors duration-300">About Us</button></li>
                <li><button className="hover:text-purple-200 transition-colors duration-300">Careers</button></li>
                <li><button className="hover:text-purple-200 transition-colors duration-300">Blog</button></li>
                <li><button className="hover:text-purple-200 transition-colors duration-300">Press</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><button className="hover:text-purple-200 transition-colors duration-300">Help Center</button></li>
                <li><button className="hover:text-purple-200 transition-colors duration-300">Documentation</button></li>
                <li><button className="hover:text-purple-200 transition-colors duration-300">Contact</button></li>
                <li><button className="hover:text-purple-200 transition-colors duration-300">Status</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white border-opacity-10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-60 mb-4 md:mb-0">
              © 2024 SkyHit. All rights reserved. Designed with ❤️
            </p>
            
            <div className="flex space-x-6">
              <button className="text-white opacity-60 hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className="text-white opacity-60 hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button className="text-white opacity-60 hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </button>
              <button className="text-white opacity-60 hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  LogOut, 
  Plus, 
  Play,
  Pause,
  Settings,
  Globe,
  Target,
  Clock,
  Zap,
  Trash2,
  ExternalLink,
  Download,
  TrendingUp,
  Users,
  Activity,
  BarChart3,
  RefreshCw,
  Eye,
  MousePointer,
  Rocket,
  Square
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface Campaign {
  id: string;
  website: string;
  targetHits: number;
  duration: number; // in hours
  hitType: 'page-view' | 'unique-visitor' | 'click';
  isActive: boolean;
  currentHits: number;
  startTime?: Date;
}

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [newWebsite, setNewWebsite] = useState("");
  const [targetHits, setTargetHits] = useState(100);
  const [duration, setDuration] = useState(1);
  const [hitType, setHitType] = useState<'page-view' | 'unique-visitor' | 'click'>('page-view');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load campaigns from backend and auto-refresh
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('/api/campaigns', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCampaigns(data);
        }
      } catch (error) {
        console.error('Failed to load campaigns:', error);
      }
    };

    loadCampaigns();
    // Auto-refresh every 5 seconds for real-time updates
    const interval = setInterval(loadCampaigns, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateCampaign = async () => {
    if (!newWebsite.trim() || targetHits <= 0 || duration <= 0) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          website: newWebsite.trim(),
          targetHits,
          duration,
          hitType,
        }),
      });

      if (response.ok) {
        const newCampaign = await response.json();
        setCampaigns(prev => [...prev, newCampaign]);
        setNewWebsite("");
        setTargetHits(100);
        setDuration(1);
        setHitType('page-view');
      } else {
        console.error('Failed to create campaign');
      }
    } catch (error) {
      console.error('Failed to create campaign:', error);
    }
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCampaigns(prev => prev.filter(c => c.id !== campaignId));
      } else {
        console.error('Failed to delete campaign');
      }
    } catch (error) {
      console.error('Failed to delete campaign:', error);
    }
  };

  const handleRunCampaign = async (campaignId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`/api/campaigns/${campaignId}/start`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Reload campaigns to get updated state
        const updatedResponse = await fetch('/api/campaigns', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (updatedResponse.ok) {
          const data = await updatedResponse.json();
          setCampaigns(data);
        }
      }
    } catch (error) {
      console.error('Failed to start campaign:', error);
    }
  };

  const handlePauseCampaign = async (campaignId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`/api/campaigns/${campaignId}/stop`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Reload campaigns to get updated state
        const updatedResponse = await fetch('/api/campaigns', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (updatedResponse.ok) {
          const data = await updatedResponse.json();
          setCampaigns(data);
        }
      }
    } catch (error) {
      console.error('Failed to pause campaign:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const totalActiveCampaigns = campaigns.filter(c => c.isActive).length;
  const totalHitsToday = campaigns.reduce((sum, c) => sum + c.currentHits, 0);

  // Generate order ID in format: ORDER00{minutes}YYYYMMDD{hour_letter}
  const generateOrderId = () => {
    const now = new Date();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours();
    
    // Convert hour to letter: 0=a, 1=b, 2=c, ..., 12=m, 13=n, ..., 23=x
    const hourLetter = String.fromCharCode(97 + hour); // 97 is 'a' in ASCII
    
    return `ORDER00${minutes}${year}${month}${day}${hourLetter}`;
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Doodles and Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes - Enhanced */}
        <div className="absolute top-20 left-10 w-8 h-8 border-2 border-purple-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-violet-100 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-60 left-1/4 w-4 h-4 border-2 border-pink-200 rotate-45 opacity-30"></div>
        <div className="absolute top-80 right-1/3 w-10 h-10 border-2 border-purple-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/4 right-1/5 w-5 h-5 border-2 border-blue-200 rotate-12 opacity-25 animate-spin-slow"></div>
        <div className="absolute bottom-1/5 left-1/5 w-7 h-7 border-2 border-teal-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 left-3/4 w-4 h-4 bg-cyan-100 rotate-45 opacity-35"></div>
        <div className="absolute bottom-1/4 right-1/6 w-6 h-6 border border-indigo-200 rounded-full opacity-25 animate-bounce"></div>
        <div className="absolute top-1/6 left-2/3 w-3 h-3 bg-purple-100 rotate-30 opacity-30"></div>
        
        {/* Grid pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="grid grid-cols-12 gap-8 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-purple-300 rounded-full"></div>
            ))}
          </div>
        </div>
        
        {/* Scattered dots - More variety */}
        <div className="absolute top-32 left-1/2 w-2 h-2 bg-violet-200 rounded-full opacity-30"></div>
        <div className="absolute top-96 left-16 w-3 h-3 bg-purple-200 rounded-full opacity-25"></div>
        <div className="absolute top-72 right-16 w-2 h-2 bg-pink-200 rounded-full opacity-35"></div>
        <div className="absolute bottom-40 left-1/3 w-4 h-4 bg-violet-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-60 right-1/4 w-3 h-3 bg-purple-200 rounded-full opacity-30"></div>
        <div className="absolute top-20 right-1/3 w-2 h-2 bg-blue-200 rounded-full opacity-25"></div>
        <div className="absolute top-1/3 left-20 w-3 h-3 bg-teal-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 right-40 w-2 h-2 bg-cyan-200 rounded-full opacity-20"></div>
        <div className="absolute top-2/3 right-20 w-1.5 h-1.5 bg-indigo-200 rounded-full opacity-35"></div>
        <div className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-purple-300 rounded-full opacity-25"></div>
        
        {/* Wavy lines - More patterns */}
        <svg className="absolute top-28 left-32 opacity-10" width="100" height="40" viewBox="0 0 100 40">
          <path d="M0,20 Q25,0 50,20 T100,20" stroke="#8b5cf6" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute top-64 right-24 opacity-10" width="80" height="30" viewBox="0 0 80 30">
          <path d="M0,15 Q20,0 40,15 T80,15" stroke="#a855f7" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute bottom-32 left-20 opacity-10" width="120" height="50" viewBox="0 0 120 50">
          <path d="M0,25 Q30,0 60,25 T120,25" stroke="#8b5cf6" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute top-1/2 right-1/3 opacity-8" width="90" height="35" viewBox="0 0 90 35">
          <path d="M0,18 Q22,3 45,18 T90,18" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
        </svg>
        <svg className="absolute bottom-1/4 left-1/3 opacity-12" width="110" height="45" viewBox="0 0 110 45">
          <path d="M0,22 Q27,5 55,22 T110,22" stroke="#0891b2" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute top-1/3 left-1/6 opacity-10" width="70" height="25" viewBox="0 0 70 25">
          <path d="M0,12 Q17,0 35,12 T70,12" stroke="#6366f1" strokeWidth="1.5" fill="none" />
        </svg>
        
        {/* Stars - More scattered */}
        <div className="absolute top-44 left-3/4">
          <svg className="w-4 h-4 text-purple-200 opacity-30" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <div className="absolute top-88 right-32">
          <svg className="w-3 h-3 text-violet-200 opacity-25" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <div className="absolute top-1/5 right-1/2">
          <svg className="w-3 h-3 text-blue-200 opacity-25" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <div className="absolute bottom-1/6 left-1/4">
          <svg className="w-4 h-4 text-teal-200 opacity-30" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <div className="absolute top-3/5 left-1/5">
          <svg className="w-2.5 h-2.5 text-cyan-200 opacity-20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        
        {/* Triangles - Enhanced */}
        <div className="absolute top-52 right-40 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-purple-200 opacity-20"></div>
        <div className="absolute bottom-48 left-40 w-0 h-0 border-l-3 border-r-3 border-b-5 border-l-transparent border-r-transparent border-b-violet-200 opacity-25"></div>
        <div className="absolute top-1/4 left-1/3 w-0 h-0 border-l-3 border-r-3 border-b-4 border-l-transparent border-r-transparent border-b-blue-200 opacity-20"></div>
        <div className="absolute bottom-1/5 right-1/3 w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-teal-200 opacity-25"></div>
        <div className="absolute top-3/5 right-1/5 w-0 h-0 border-l-4 border-r-4 border-b-5 border-l-transparent border-r-transparent border-b-cyan-200 opacity-15"></div>
        
        {/* Plus symbols */}
        <div className="absolute top-36 left-1/6 text-purple-200 opacity-20 text-xl">+</div>
        <div className="absolute bottom-1/4 right-1/4 text-violet-200 opacity-25 text-lg">+</div>
        <div className="absolute top-2/3 left-1/3 text-blue-200 opacity-15 text-sm">+</div>
        <div className="absolute bottom-40 right-1/6 text-teal-200 opacity-20 text-lg">+</div>
        
        {/* Hash symbols */}
        <div className="absolute top-1/3 right-1/4 text-purple-200 opacity-15 text-sm">#</div>
        <div className="absolute bottom-1/3 left-1/6 text-violet-200 opacity-20 text-lg">#</div>
        <div className="absolute top-3/4 right-2/3 text-blue-200 opacity-15 text-sm">#</div>
        
        {/* Floating particles with ping animation */}
        <div className="absolute top-1/6 left-1/4 w-1 h-1 bg-purple-300/40 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/6 w-1.5 h-1.5 bg-violet-300/50 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-300/60 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/5 right-1/2 w-2 h-2 bg-teal-300/45 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-3/5 left-2/3 w-1.5 h-1.5 bg-cyan-300/50 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
        
        {/* Large gradient circles - Enhanced */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-100/20 to-violet-100/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-pink-100/15 to-purple-100/15 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-violet-50/10 to-purple-50/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/6 w-28 h-28 bg-gradient-to-bl from-blue-100/15 to-cyan-100/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-36 h-36 bg-gradient-to-tr from-teal-100/12 to-green-100/12 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/3 w-24 h-24 bg-gradient-to-br from-indigo-100/18 to-purple-100/18 rounded-full blur-xl"></div>
        
        {/* Dotted lines */}
        <div className="absolute top-1/3 left-1/2 flex space-x-2">
          <div className="w-1 h-1 bg-purple-200/30 rounded-full"></div>
          <div className="w-1 h-1 bg-violet-200/25 rounded-full"></div>
          <div className="w-1 h-1 bg-indigo-200/30 rounded-full"></div>
          <div className="w-1 h-1 bg-blue-200/25 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/2 left-1/5 flex flex-col space-y-2">
          <div className="w-1 h-1 bg-teal-200/25 rounded-full"></div>
          <div className="w-1 h-1 bg-cyan-200/30 rounded-full"></div>
          <div className="w-1 h-1 bg-blue-200/25 rounded-full"></div>
        </div>
        
        {/* Diamond shapes */}
        <div className="absolute top-1/5 left-3/4 w-2 h-2 bg-purple-200/30 rotate-45"></div>
        <div className="absolute bottom-1/6 right-1/5 w-3 h-3 bg-violet-200/25 rotate-45"></div>
        <div className="absolute top-2/3 left-1/6 w-2.5 h-2.5 bg-blue-200/20 rotate-45"></div>
      </div>

      {/* Sticky Top Website Navbar with curved container design */}
      <div className="fixed top-4 left-4 right-4 z-50">
        <nav className="max-w-7xl mx-auto bg-white backdrop-blur-sm border border-gray-200 shadow-lg rounded-full px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo - Like pre-login */}
              <div className="flex items-center space-x-3">
                <Rocket className="w-8 h-8 text-purple-600" />
                <span className="text-2xl font-bold text-violet-600">
                  SkyHit
                </span>
              </div>

              {/* Navigation Links */}
              <div className="hidden lg:flex items-center space-x-8">
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium">How It Works?</a>
                <a href="#" className="text-purple-600 hover:text-purple-700 transition-colors text-sm font-medium">Dashboard</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium">Referrals</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium">Premium</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium">Settings</a>
              </div>

              {/* User Info & Sign Out */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center text-sm">
                  <span className="text-gray-800">Hello, </span>
                  <span className="text-purple-600 font-semibold ml-1">
                    {JSON.parse(localStorage.getItem("user") || '{"username":"Aritra Mahatma"}').username}
                  </span>
                </div>
                <Button 
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
        </nav>
      </div>

      

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 mt-24">
        {/* Traffic Statistics Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-800">Traffic Statistics</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{totalHitsToday.toLocaleString()}</div>
                    <div className="text-gray-600 font-medium">Hits Available</div>
                  </div>
                  <Zap className="w-12 h-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{campaigns.reduce((sum, c) => sum + c.currentHits, 0).toLocaleString()}</div>
                    <div className="text-gray-600 font-medium">Hits Received</div>
                  </div>
                  <Download className="w-12 h-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{campaigns.length}</div>
                    <div className="text-gray-600 font-medium">No. of Domains</div>
                  </div>
                  <Globe className="w-12 h-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{campaigns.length}</div>
                    <div className="text-gray-600 font-medium">No. of Links</div>
                  </div>
                  <ExternalLink className="w-12 h-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{Math.floor(campaigns.reduce((sum, c) => sum + c.currentHits, 0) * 0.08)}</div>
                    <div className="text-gray-600 font-medium">Referrals</div>
                  </div>
                  <Users className="w-12 h-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{totalActiveCampaigns}</div>
                    <div className="text-gray-600 font-medium">Active Sessions</div>
                  </div>
                  <RefreshCw className="w-12 h-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campaign Launch Center */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <Target className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-800">Campaign Launch Center</h2>
          </div>
          
          <Card className="bg-white border-gray-200 rounded-2xl shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Target Website</label>
                    <Input
                      value={newWebsite}
                      onChange={(e) => setNewWebsite(e.target.value)}
                      placeholder="Enter your website URL..."
                      className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-xl focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Target Volume: {targetHits} hits</label>
                    <input
                      type="range"
                      min="1"
                      max="10000"
                      value={targetHits}
                      onChange={(e) => setTargetHits(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider accent-purple-600"
                    />
                    <div className="flex justify-between text-gray-500 text-sm mt-1">
                      <span>1</span>
                      <span>10,000</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Duration</label>
                    <Select value={duration.toString()} onValueChange={(value) => setDuration(Number(value))}>
                      <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 rounded-xl focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">30 minutes</SelectItem>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Traffic Quality</label>
                    <Select value={hitType} onValueChange={(value: any) => setHitType(value)}>
                      <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 rounded-xl focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select traffic type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="page-view">Page Views</SelectItem>
                        <SelectItem value="click">Clicks</SelectItem>
                        <SelectItem value="unique-visitor">Unique Visitors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center items-center space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Launch?</h3>
                    <p className="text-gray-600">Start driving quality traffic to your website</p>
                  </div>
                  
                  <Button
                    onClick={handleCreateCampaign}
                    disabled={!newWebsite.trim() || targetHits <= 0 || duration <= 0}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <Zap className="w-6 h-6 mr-3" />
                    Launch Campaign
                  </Button>
                  
                  <div className="flex items-center space-x-4 text-gray-500 text-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Instant Start</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Real-time Analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts Section */}
        <div className="mb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hits Received Chart */}
            <Card className="bg-white border-gray-200 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Hits Received</CardTitle>
                <p className="text-gray-600 text-sm">Real Time</p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { time: '10 Jul', hits: campaigns.reduce((sum, c) => sum + Math.floor(c.currentHits * 0.1), 0) },
                      { time: '15 Jul', hits: campaigns.reduce((sum, c) => sum + Math.floor(c.currentHits * 0.3), 0) },
                      { time: '20 Jul', hits: campaigns.reduce((sum, c) => sum + Math.floor(c.currentHits * 0.5), 0) },
                      { time: '25 Jul', hits: campaigns.reduce((sum, c) => sum + Math.floor(c.currentHits * 0.8), 0) },
                      { time: 'Today', hits: campaigns.reduce((sum, c) => sum + c.currentHits, 0) }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="hits" 
                        stroke="#8b5cf6" 
                        fill="url(#colorHits)"
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="colorHits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Referral Source Chart */}
            <Card className="bg-white border-gray-200 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Traffic Sources</CardTitle>
                <p className="text-gray-600 text-sm">Real Time</p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { time: '10 Jul', organic: Math.floor(totalHitsToday * 0.4), social: Math.floor(totalHitsToday * 0.3), direct: Math.floor(totalHitsToday * 0.3) },
                      { time: '15 Jul', organic: Math.floor(totalHitsToday * 0.5), social: Math.floor(totalHitsToday * 0.25), direct: Math.floor(totalHitsToday * 0.25) },
                      { time: '20 Jul', organic: Math.floor(totalHitsToday * 0.45), social: Math.floor(totalHitsToday * 0.35), direct: Math.floor(totalHitsToday * 0.2) },
                      { time: '25 Jul', organic: Math.floor(totalHitsToday * 0.6), social: Math.floor(totalHitsToday * 0.25), direct: Math.floor(totalHitsToday * 0.15) },
                      { time: 'Today', organic: Math.floor(totalHitsToday * 0.55), social: Math.floor(totalHitsToday * 0.3), direct: Math.floor(totalHitsToday * 0.15) }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Line type="monotone" dataKey="organic" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} />
                      <Line type="monotone" dataKey="social" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                      <Line type="monotone" dataKey="direct" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Organic</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Social</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Direct</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campaign Control Panel */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <Settings className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-800">Campaign Control Panel</h2>
          </div>
          
          <Card className="bg-white border-gray-200 rounded-2xl shadow-lg">
            <CardContent className="p-8">
              {campaigns.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No campaigns running</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Launch your first traffic campaign to start driving visitors to your website.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800 text-lg">{generateOrderId()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-violet-300 text-violet-600 hover:bg-violet-50 rounded-full px-4 py-2 text-sm font-medium"
                            onClick={() => window.open(campaign.website, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit
                          </Button>
                          
                          <Switch
                            checked={campaign.isActive}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleRunCampaign(campaign.id);
                              } else {
                                handlePauseCampaign(campaign.id);
                              }
                            }}
                            className="data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-gray-300"
                          />
                          
                          <button 
                            className="text-violet-600 hover:text-violet-800 p-3 hover:bg-violet-50 rounded-full transition-colors"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{campaign.currentHits.toLocaleString()}</div>
                          <div className="text-gray-600 text-sm">Hits Received</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{campaign.targetHits.toLocaleString()}</div>
                          <div className="text-gray-600 text-sm">Target Hits</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{Math.round((campaign.currentHits / campaign.targetHits) * 100)}%</div>
                          <div className="text-gray-600 text-sm">Progress</div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            campaign.isActive 
                              ? 'bg-gradient-to-r from-violet-500 to-purple-600 animate-pulse' 
                              : 'bg-gradient-to-r from-violet-400 to-purple-500'
                          }`}
                          style={{ width: `${Math.min((campaign.currentHits / campaign.targetHits) * 100, 100)}%` }}
                        ></div>
                      </div>

                      {campaign.isActive && campaign.startTime && (
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Started: {campaign.startTime ? new Date(campaign.startTime).toLocaleTimeString() : 'Not started'}</span>
                          {campaign.duration && (
                            <span>
                              Remaining: {campaign.startTime ? Math.max(0, campaign.duration - ((new Date().getTime() - new Date(campaign.startTime).getTime()) / (1000 * 60 * 60))).toFixed(1) : campaign.duration}h
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 py-16 mt-20 rounded-b-3xl">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-gray-200/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gray-100/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* SkyHit Brand */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Rocket className="w-8 h-8 text-gray-800" />
                  <span className="text-2xl font-bold text-gray-800">SkyHit</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Empowering businesses worldwide with innovative solutions for sustainable growth and success.
                </p>
              </div>

              {/* Product Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Product</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-600 hover:text-gray-800 transition-colors text-sm">Features</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-800 transition-colors text-sm">Pricing</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-800 transition-colors text-sm">Security</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-800 transition-colors text-sm">Integrations</a>
                </div>
              </div>

              {/* Company Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Company</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-600 hover:text-gray-800 transition-colors text-sm">About Us</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-800 transition-colors text-sm">Careers</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-800 transition-colors text-sm">Blog</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-800 transition-colors text-sm">Press</a>
                </div>
              </div>

              {/* Support Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Support</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-600 hover:text-gray-800 transition-colors text-sm">Help Center</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-800 transition-colors text-sm">Documentation</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-800 transition-colors text-sm">Contact</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-800 transition-colors text-sm">Status</a>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-300 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-600 text-sm">
                  © 2024 SkyHit. All rights reserved. Designed with <span className="text-red-400">♥</span>
                </p>
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.informatica-.146l-.637 2.433c-.230.889-.85 2.002-1.267 2.696.955.294 1.68.415 2.564.415 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
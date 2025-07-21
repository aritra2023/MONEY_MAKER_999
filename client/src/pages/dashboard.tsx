import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LogOut, 
  Plus, 
  Download,
  Globe,
  Users,
  Settings,
  BarChart3,
  ExternalLink
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [websites, setWebsites] = useState<string[]>([]);
  const [newWebsite, setNewWebsite] = useState("");
  const [hitsAvailable] = useState(1000);
  const [hitsReceived] = useState(0);
  const [hitsRequested] = useState(0);
  const [hitsProvided] = useState(0);

  const handleAddWebsite = () => {
    if (newWebsite.trim() && !websites.includes(newWebsite.trim())) {
      setWebsites([...websites, newWebsite.trim()]);
      setNewWebsite("");
    }
  };

  const handleRemoveWebsite = (website: string) => {
    setWebsites(websites.filter(w => w !== website));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-6">
            <img 
              src="https://files.catbox.moe/hlexdm.png" 
              alt="Logo" 
              className="h-8 w-auto"
            />
            <nav className="hidden md:flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-purple-600">How it Works?</a>
              <a href="#" className="hover:text-purple-600">FAQ</a>
              <a href="#" className="hover:text-purple-600">Menu</a>
              <a href="#" className="hover:text-purple-600">Pages</a>
              <a href="#" className="hover:text-purple-600">Legal</a>
              <a href="#" className="hover:text-purple-600">Media</a>
              <a href="#" className="hover:text-purple-600">SEO Tools</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Hello, Aritra Mahatma!</span>
            <Button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2"
            >
              SIGN OUT
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="px-6">
          <nav className="flex space-x-8">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === "dashboard" 
                  ? "border-pink-500 text-pink-600 bg-pink-50" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("downloads")}
              className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center space-x-2 ${
                activeTab === "downloads" 
                  ? "border-pink-500 text-pink-600 bg-pink-50" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Download & Earn Hits</span>
            </button>
            <button 
              onClick={() => setActiveTab("websites")}
              className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center space-x-2 ${
                activeTab === "websites" 
                  ? "border-pink-500 text-pink-600 bg-pink-50" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Websites</span>
            </button>
            <button 
              onClick={() => setActiveTab("referrals")}
              className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center space-x-2 ${
                activeTab === "referrals" 
                  ? "border-pink-500 text-pink-600 bg-pink-50" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>My Referrals</span>
            </button>
            <button 
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center space-x-2 ${
                activeTab === "settings" 
                  ? "border-pink-500 text-pink-600 bg-pink-50" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>My Settings</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 py-6">
        {/* Donation Banner */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6 flex items-center">
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Donate us through PayPal or Bitcoin</span> to support our developers, help desk team and cloud services.
            </p>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <span className="font-medium">⚠️ Please add domains or URLs to increase traffic, run our traffic exchange software with a valid token for consistent traffic. </span>
            <a href="#" className="text-blue-600 hover:underline font-medium">CLICK HERE!</a>
          </p>
        </div>

        {activeTab === "dashboard" && (
          <>
            {/* Traffic Statistics */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
                <BarChart3 className="mr-2" />
                Traffic Statistics
              </h2>

              {/* Video/Image Placeholder */}
              <div className="bg-black rounded-lg mb-6 relative overflow-hidden">
                <div className="aspect-video flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-white/40 rounded"></div>
                    </div>
                    <p className="text-lg">Traffic Exchange Preview</p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                    Shop Now
                  </Button>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-pink-600 mb-2">
                      {hitsAvailable.toLocaleString()}
                      <span className="text-lg ml-1">💎</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Hits Available</h3>
                    <p className="text-sm text-gray-600">Hits owned by you</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-pink-600 mb-2">
                      {hitsReceived}
                      <span className="text-lg ml-1">🔥</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Hits Received</h3>
                    <p className="text-sm text-gray-600">Hits received to your site</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-pink-600 mb-2">
                      {hitsRequested}
                      <span className="text-lg ml-1">🎯</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Hits Requested</h3>
                    <p className="text-sm text-gray-600">Hits requested from your sites</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-pink-600 mb-2">
                      {hitsProvided}
                      <span className="text-lg ml-1">🔗</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Hits Provided</h3>
                    <p className="text-sm text-gray-600">Hits provided to other sites</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {activeTab === "websites" && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Website Management</h2>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Add New Website</h3>
                <div className="flex space-x-4">
                  <Input
                    type="url"
                    placeholder="Enter website URL (e.g., https://example.com)"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleAddWebsite}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    Add Website
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Websites</h3>
                {websites.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No websites added yet. Add your first website above to start receiving traffic.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {websites.map((website, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                      >
                        <div className="flex items-center space-x-3">
                          <Globe className="w-5 h-5 text-gray-400" />
                          <span className="font-medium">{website}</span>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleRemoveWebsite(website)}
                            variant="destructive"
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "downloads" && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Download & Earn Hits</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">Download our traffic exchange software to earn more hits for your websites.</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="mr-2 w-4 h-4" />
                  Download Traffic Exchange
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "referrals" && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Referrals</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">Invite friends and earn bonus hits when they join.</p>
                <div className="text-center py-8 text-gray-500">
                  No referrals yet. Share your referral link to start earning bonus hits.
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" value="user@example.com" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <Input value="ArirtraMahatma" />
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Update Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
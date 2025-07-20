import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Lock, Rocket } from "lucide-react";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert("Login Success! 🚀");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 flex items-center justify-center px-6 font-poppins">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-400 opacity-10 rounded-full animate-bounce-slow"></div>
      <div className="absolute top-40 right-16 w-12 h-12 bg-white opacity-5 rounded-full animate-bounce-slow" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-20 w-16 h-16 bg-purple-300 opacity-8 rounded-full animate-bounce-slow" style={{animationDelay: '2s'}}></div>

      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Login to Continue
          </CardTitle>
          <p className="text-white/80 text-sm">
            Enter your credentials to launch your journey
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:bg-white/15 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-12 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:bg-white/15 h-12"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 h-12 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Launching...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Rocket className="w-4 h-4" />
                  <span>Login</span>
                </div>
              )}
            </Button>
          </form>

          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="w-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center">
            <p className="text-white/60 text-xs">
              Don't have an account?{" "}
              <button className="text-white hover:text-purple-200 underline transition-colors">
                Sign up here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
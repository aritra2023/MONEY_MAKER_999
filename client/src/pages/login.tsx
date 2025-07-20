import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Lock, Rocket, User } from "lucide-react";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login/signup process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert(isSignUp ? "Account Created Successfully!" : "Login Success!");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 flex items-center justify-center px-6 font-poppins">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-400 opacity-10 rounded-full animate-bounce-slow"></div>
      <div className="absolute top-40 right-16 w-12 h-12 bg-white opacity-5 rounded-full animate-bounce-slow" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-20 w-16 h-16 bg-purple-300 opacity-8 rounded-full animate-bounce-slow" style={{animationDelay: '2s'}}></div>

      {/* Main Form Container */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-xl">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-white/70">
            {isSignUp ? "Join thousands of businesses growing with us" : "Sign in to continue your journey"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field for signup */}
            {isSignUp && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-white/60 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-base"
                />
              </div>
            )}

            {/* Email field */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-white/60 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-base"
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-white/60 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-base"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isSignUp ? "Creating Account..." : "Signing In..."}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Rocket className="w-5 h-5" />
                  <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                </div>
              )}
            </Button>
          </form>

          {/* Toggle between Login/Signup */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
            >
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <span className="text-white font-semibold underline">
                {isSignUp ? "Sign In" : "Sign Up"}
              </span>
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="w-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
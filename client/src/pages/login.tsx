import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Rocket, Eye, EyeOff, Mail, User, Lock, Sparkles, ArrowRight, Shield, Zap } from "lucide-react";
import { useLocation } from "wouter";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast({
        title: "Login successful!",
        description: "Welcome back to SkyHit.",
      });
      setLocation("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: z.infer<typeof signupSchema>) => {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Signup failed");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast({
        title: "Account created successfully!",
        description: "Welcome to SkyHit.",
      });
      setLocation("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(data);
  };

  const onSignupSubmit = (data: z.infer<typeof signupSchema>) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 opacity-15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400 opacity-10 rounded-full blur-2xl animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-purple-900 to-purple-800 rounded-full flex items-center justify-center">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-30 blur-sm animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent mb-2">
              SkyHit
            </h1>
            <p className="text-purple-200 text-lg font-medium">
              {isLogin ? "Welcome back to the future" : "Join the rocket ship to success"}
            </p>
          </div>

          <Card className="bg-black/40 backdrop-blur-xl border-purple-800/50 shadow-2xl rounded-3xl overflow-hidden animate-slide-up">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-6 border-b border-purple-800/30">
              <CardTitle className="text-white text-center text-2xl font-bold flex items-center justify-center gap-2">
                {isLogin ? (
                  <>
                    <Lock className="w-6 h-6 text-purple-400" />
                    Sign In
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    Create Account
                  </>
                )}
              </CardTitle>
              <p className="text-purple-200 text-center mt-2 text-sm">
                {isLogin ? "Access your control center" : "Start your journey with us"}
              </p>
            </div>
            
            <CardContent className="p-8 space-y-6">
              {isLogin ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-white font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4 text-purple-400" />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="your@email.com"
                              autoComplete="email"
                              className="bg-black/20 border-purple-700/50 text-white placeholder:text-purple-300/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 h-14 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-black/30"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-white font-medium flex items-center gap-2">
                            <Lock className="w-4 h-4 text-purple-400" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="bg-black/20 border-purple-700/50 text-white placeholder:text-purple-300/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 h-14 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-black/30 pr-12"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-4 text-purple-400 hover:text-white hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-purple-500/25 flex items-center justify-center gap-2"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Signing in...
                          </>
                        ) : (
                          <>
                            <ArrowRight className="w-5 h-5" />
                            Sign In
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-white font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-400" />
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Choose a unique username"
                      value={signupForm.watch("username") || ""}
                      onChange={(e) => signupForm.setValue("username", e.target.value)}
                      className="w-full px-4 py-4 bg-black/20 border border-purple-700/50 rounded-xl text-white placeholder:text-purple-300/60 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 backdrop-blur-sm transition-all duration-300 hover:bg-black/30"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-white font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-400" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={signupForm.watch("email") || ""}
                      onChange={(e) => signupForm.setValue("email", e.target.value)}
                      className="w-full px-4 py-4 bg-black/20 border border-purple-700/50 rounded-xl text-white placeholder:text-purple-300/60 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 backdrop-blur-sm transition-all duration-300 hover:bg-black/30"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-white font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-400" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={signupForm.watch("password") || ""}
                        onChange={(e) => signupForm.setValue("password", e.target.value)}
                        className="w-full px-4 py-4 bg-black/20 border border-purple-700/50 rounded-xl text-white placeholder:text-purple-300/60 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 backdrop-blur-sm transition-all duration-300 hover:bg-black/30 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        const values = {
                          username: signupForm.watch("username") || "",
                          email: signupForm.watch("email") || "",
                          password: signupForm.watch("password") || ""
                        };
                        if (!values.username || !values.email || !values.password) {
                          toast({
                            title: "Missing Information",
                            description: "Please fill in all fields",
                            variant: "destructive",
                          });
                          return;
                        }
                        signupMutation.mutate(values);
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-purple-500/25 flex items-center justify-center gap-2"
                      disabled={signupMutation.isPending}
                    >
                      {signupMutation.isPending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating account...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Security badges */}
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-purple-800/30">
                <div className="flex items-center gap-2 text-purple-300 text-sm">
                  <Shield className="w-4 h-4" />
                  Secure
                </div>
                <div className="flex items-center gap-2 text-purple-300 text-sm">
                  <Zap className="w-4 h-4" />
                  Fast
                </div>
                <div className="flex items-center gap-2 text-purple-300 text-sm">
                  <Rocket className="w-4 h-4" />
                  Modern
                </div>
              </div>

              {/* Toggle between login and signup */}
              <div className="text-center pt-4">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-200 hover:text-white transition-all duration-300 font-medium relative group"
                >
                  <span className="relative z-10">
                    {isLogin
                      ? "Don't have an account? Sign up"
                      : "Already have an account? Sign in"}
                  </span>
                  <div className="absolute inset-0 bg-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -m-2"></div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
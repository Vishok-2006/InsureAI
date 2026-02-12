"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, Shield, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"customer" | "agent" | "admin">("customer")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("insureflow_user", JSON.stringify({ email, userType }))
      localStorage.setItem("insureflow_usertype", userType)
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const features = [
    { icon: Shield, title: "Secure & Trusted", desc: "Bank-level encryption for your data" },
    { icon: CheckCircle2, title: "Easy Scheduling", desc: "Book appointments in seconds" },
    { icon: Lock, title: "Privacy First", desc: "Your information is always protected" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animation-delay-2000"></div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Left side - Insurance Info & Features */}
        <div className="hidden lg:flex flex-col justify-between">
          {/* Header with Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">InsureFlow</h1>
            </div>
            <p className="text-slate-600">Automated Insurance Management</p>
          </div>

          {/* Main Tagline */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
              Insurance Made Simple, Appointments Made Easy
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Schedule appointments with trusted agents, manage your policies, and solve queries with AI-powered voice
              assistance—all in one platform.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-4 items-start group cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-teal-600 transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md p-8 card-shadow bg-white/95 backdrop-blur">
            {/* User Type Selector */}
            <div className="mb-8">
              <p className="text-sm font-medium text-slate-700 mb-3">Login as</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "customer", label: "Customer", icon: "👤" },
                  { id: "agent", label: "Agent", icon: "👨‍💼" },
                  { id: "admin", label: "Admin", icon: "⚙️" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setUserType(type.id as any)}
                    className={`py-3 px-3 rounded-lg font-medium text-sm transition-all ${
                      userType === type.id
                        ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <div className="text-lg mb-1">{type.icon}</div>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Welcome Back</h2>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Logging in...
                  </div>
                ) : (
                  "Login Securely"
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">New to InsureFlow?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <Button
                type="button"
                variant="outline"
                className="w-full py-3 rounded-lg border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors bg-transparent"
              >
                Create Account
              </Button>
            </form>

            {/* Footer */}
            <p className="text-xs text-center text-slate-500 mt-6">
              By logging in, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}

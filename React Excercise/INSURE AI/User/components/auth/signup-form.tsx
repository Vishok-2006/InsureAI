"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Phone, User, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SignupFormProps {
  onSwitch: () => void
}

export default function SignupForm({ onSwitch }: SignupFormProps) {
  const [step, setStep] = useState<"details" | "otp">("details")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [otp, setOtp] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setIsLoading(true)
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false)
      setStep("otp")
    }, 1000)
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP")
      return
    }
    setIsLoading(true)
    // Simulate OTP verification
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        ...formData,
        role: "customer",
        verified: true,
        createdAt: new Date(),
      }
      localStorage.setItem("insureflow_user", JSON.stringify(userData))
      localStorage.setItem("insureflow_usertype", "customer")
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <Card className="w-full max-w-md p-8 card-shadow bg-white/95 backdrop-blur">
      {step === "details" ? (
        <>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
          <p className="text-slate-600 text-sm mb-6">Join InsureFlow and get access to affordable insurance plans</p>

          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">We'll verify this with an OTP</p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending OTP...
                </>
              ) : (
                <>
                  Next <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>

          <p className="text-sm text-center text-slate-600 mt-4">
            Already have an account?{" "}
            <button onClick={onSwitch} className="text-blue-600 font-semibold hover:text-blue-700">
              Login
            </button>
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Your Phone</h2>
          <p className="text-slate-600 text-sm mb-6">
            We sent a 6-digit code to <strong>{formData.phone}</strong>
          </p>

          <form onSubmit={handleOtpSubmit} className="space-y-4">
            {/* OTP Input */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-slate-700 mb-2">
                Enter OTP Code
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-4 text-center text-2xl tracking-widest rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors font-mono"
                required
              />
              <p className="text-xs text-slate-500 text-center mt-2">Check your email and SMS</p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-75"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                "Verify & Create Account"
              )}
            </Button>

            {/* Resend OTP */}
            <Button
              type="button"
              variant="outline"
              className="w-full py-3 rounded-lg border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors bg-transparent"
            >
              Resend OTP
            </Button>
          </form>

          <button
            onClick={() => setStep("details")}
            className="text-sm text-blue-600 font-semibold hover:text-blue-700 mt-4 mx-auto block"
          >
            Back to Details
          </button>
        </>
      )}
    </Card>
  )
}

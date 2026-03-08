"use client"

import { useState } from "react"
import { Shield, CheckCircle2, Lock, Phone } from "lucide-react"
import LoginForm from "./auth/login-form"
import SignupForm from "./auth/signup-form"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const features = [
    { icon: Lock, title: "Secure & Trusted", desc: "Bank-level encryption for your data" },
    { icon: Phone, title: "OTP Verification", desc: "Secure phone verification via SMS" },
    { icon: CheckCircle2, title: "Easy Insurance", desc: "Browse and buy plans instantly" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animation-delay-2000"></div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Left side - Info */}
        <div className="hidden lg:flex flex-col justify-between">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">InsureFlow</h1>
            </div>
            <p className="text-slate-600">Automated Insurance Management</p>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {isLogin ? "Welcome Back to Your Insurance" : "Get Affordable Insurance in Minutes"}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {isLogin
                ? "Access your policies, view appointments from agents, and manage your insurance coverage seamlessly."
                : "Join thousands of customers who trust InsureFlow for secure, affordable insurance plans and expert agent support."}
            </p>
          </div>

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

        {/* Right side - Auth Forms */}
        <div className="flex items-center justify-center">
          {isLogin ? (
            <LoginForm onSwitch={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitch={() => setIsLogin(true)} />
          )}
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

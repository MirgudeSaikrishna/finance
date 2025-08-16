"use client"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, AlertCircle } from "lucide-react" // Removed Eye, EyeOff

export default function Dashboard() {
  const router = useRouter()
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false) // Removed showPassword, setShowPassword

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (input === "omnamashivaya") {
        localStorage.setItem("dashboardAccess", "true")
        router.push("/main")
        return
      }

      setError("Incorrect password. Please try again.")
    } catch (err) {
      setError("An error occurred. Please try again." +err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Dashboard</h1>
            <p className="text-slate-600">Enter your password to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12"
                  aria-describedby={error ? "password-error" : undefined}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                id="password-error"
                className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                "Enter Dashboard"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">Secure access required</p>
          </div>
        </div>
      </div>
    </div>
  )
}

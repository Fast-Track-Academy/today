'use client'

import { useState } from 'react'

interface LoginFormProps {
  onLogin: (username: string) => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedUsername = username.trim()
    
    if (!trimmedUsername) {
      setError('Please enter a username')
      return
    }
    
    if (trimmedUsername.length < 2) {
      setError('Username must be at least 2 characters')
      return
    }
    
    if (trimmedUsername.length > 30) {
      setError('Username must be 30 characters or less')
      return
    }
    
    setError('')
    onLogin(trimmedUsername)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Avatar & AI Bot Creator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create game-style avatars and conversational AI bots
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Enter your name to get started
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"

            />
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Creating
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Fast Track Academy - AI & Digital Bot Creation
        </p>
      </div>
    </div>
  )
}

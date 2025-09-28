'use client'

import { useState } from 'react'
import AvatarBuilder from '@/components/AvatarBuilder'
import BotBuilder from '@/components/BotBuilder'
import Navigation from '@/components/Navigation'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'avatar' | 'bot'>('avatar')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                🤖 Avatar & AI Bot Creator
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create game-style avatars and conversational AI bots
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Fast Track Academy
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {activeTab === 'avatar' && <AvatarBuilder />}
          {activeTab === 'bot' && <BotBuilder />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Built with Next.js for Fast Track Academy&apos;s AI & Digital Bot Creation curriculum</p>
            <p className="mt-1">
              Learn more at{' '}
              <a 
                href="https://github.com/Fast-Track-Academy/curriculum" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Fast Track Academy Curriculum
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

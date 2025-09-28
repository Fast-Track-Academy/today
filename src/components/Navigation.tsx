interface NavigationProps {
  activeTab: 'avatar' | 'bot'
  setActiveTab: (tab: 'avatar' | 'bot') => void
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('avatar')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'avatar'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            🎭 Avatar Builder
          </button>
          <button
            onClick={() => setActiveTab('bot')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bot'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            🤖 Bot Builder
          </button>
        </div>
      </div>
    </nav>
  )
}
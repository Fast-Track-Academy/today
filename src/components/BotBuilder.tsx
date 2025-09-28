'use client'

import { useState } from 'react'

interface BotPersonality {
  name: string
  role: string
  personality: string
  communicationStyle: string
  expertise: string[]
  tone: string
  responseLength: string
  creativity: number
  formality: number
  helpfulness: number
}

interface BotSettings {
  apiProvider: string
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
}

const personalityPresets = [
  {
    name: 'Friendly Helper',
    role: 'Personal Assistant',
    personality: 'Cheerful, supportive, and encouraging. Always looking to help and motivate.',
    communicationStyle: 'Warm and conversational',
    expertise: ['General Knowledge', 'Productivity', 'Learning Support'],
    tone: 'friendly',
    responseLength: 'medium',
    creativity: 70,
    formality: 30,
    helpfulness: 90
  },
  {
    name: 'Tech Mentor',
    role: 'Programming Tutor',
    personality: 'Knowledgeable, patient, and detail-oriented. Loves explaining complex topics simply.',
    communicationStyle: 'Educational and methodical',
    expertise: ['Programming', 'Technology', 'Problem Solving'],
    tone: 'professional',
    responseLength: 'long',
    creativity: 50,
    formality: 70,
    helpfulness: 95
  },
  {
    name: 'Creative Companion',
    role: 'Creative Writing Assistant',
    personality: 'Imaginative, expressive, and inspiring. Encourages creative thinking and artistic expression.',
    communicationStyle: 'Artistic and inspiring',
    expertise: ['Creative Writing', 'Storytelling', 'Art'],
    tone: 'casual',
    responseLength: 'long',
    creativity: 95,
    formality: 20,
    helpfulness: 85
  },
  {
    name: 'Study Buddy',
    role: 'Learning Companion',
    personality: 'Encouraging, organized, and focused on learning. Helps break down complex topics.',
    communicationStyle: 'Educational but fun',
    expertise: ['Study Techniques', 'Homework Help', 'Test Preparation'],
    tone: 'encouraging',
    responseLength: 'medium',
    creativity: 60,
    formality: 40,
    helpfulness: 100
  }
]

const samplePrompts = {
  'General Knowledge': [
    'Explain quantum physics in simple terms',
    'What are the benefits of renewable energy?',
    'How do I develop good study habits?'
  ],
  'Programming': [
    'How do I start learning Python?',
    'Explain the difference between frontend and backend',
    'What is version control and why is it important?'
  ],
  'Creative Writing': [
    'Help me brainstorm ideas for a sci-fi story',
    'What makes a compelling character?',
    'How do I overcome writer\'s block?'
  ],
  'Personal Development': [
    'How can I be more productive?',
    'What are some good time management strategies?',
    'How do I set and achieve goals?'
  ]
}

export default function BotBuilder() {
  const [botPersonality, setBotPersonality] = useState<BotPersonality>({
    name: 'My AI Bot',
    role: 'Personal Assistant',
    personality: 'Helpful, friendly, and knowledgeable. Ready to assist with various tasks and questions.',
    communicationStyle: 'Conversational and approachable',
    expertise: ['General Knowledge'],
    tone: 'friendly',
    responseLength: 'medium',
    creativity: 70,
    formality: 50,
    helpfulness: 85
  })

  const [botSettings, setBotSettings] = useState<BotSettings>({
    apiProvider: 'openai',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 500,
    systemPrompt: ''
  })

  const [testMessage, setTestMessage] = useState('')
  const [testResponse, setTestResponse] = useState('')
  const [isTestingBot, setIsTestingBot] = useState(false)
  const [selectedPromptCategory, setSelectedPromptCategory] = useState('General Knowledge')

  const handlePersonalityChange = (field: keyof BotPersonality, value: string | number | string[]) => {
    setBotPersonality(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Note: handleSettingsChange can be used for future API integration features
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSettingsChange = (field: keyof BotSettings, value: string | number) => {
    setBotSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const applyPreset = (preset: typeof personalityPresets[0]) => {
    setBotPersonality({
      ...botPersonality,
      ...preset
    })
  }

  const generateSystemPrompt = () => {
    const prompt = `You are ${botPersonality.name}, a ${botPersonality.role}.

Personality: ${botPersonality.personality}

Communication Style: ${botPersonality.communicationStyle}

Areas of Expertise: ${botPersonality.expertise.join(', ')}

Guidelines:
- Maintain a ${botPersonality.tone} tone
- Provide ${botPersonality.responseLength} length responses
- Creativity level: ${botPersonality.creativity}/100
- Formality level: ${botPersonality.formality}/100
- Helpfulness level: ${botPersonality.helpfulness}/100

Always be helpful, accurate, and engaging in your responses. If you don't know something, admit it and offer to help find the information.`

    setBotSettings(prev => ({
      ...prev,
      systemPrompt: prompt
    }))
  }

  const testBot = async () => {
    setIsTestingBot(true)
    // Simulate AI response (in a real app, this would call the actual AI API)
    setTimeout(() => {
      const mockResponse = `Hello! I'm ${botPersonality.name}, your ${botPersonality.role}. ${testMessage.includes('help') ? 'I\'d be happy to help you with that!' : 'That\'s an interesting question!'} Based on my ${botPersonality.communicationStyle.toLowerCase()} style and expertise in ${botPersonality.expertise.join(', ')}, I can provide you with detailed assistance. This is a demo response showing how I would respond with a ${botPersonality.tone} tone.`
      
      setTestResponse(mockResponse)
      setIsTestingBot(false)
    }, 2000)
  }

  const exportBot = () => {
    const botData = {
      personality: botPersonality,
      settings: botSettings,
      exportDate: new Date().toISOString(),
      instructions: 'Import this configuration into your AI bot platform'
    }
    
    const dataStr = JSON.stringify(botData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `${botPersonality.name.toLowerCase().replace(/\s+/g, '-')}-bot-config.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Build Your AI Conversational Bot
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configure personality, expertise, and conversation style for your AI companion
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bot Configuration */}
        <div className="space-y-6">
          {/* Personality Presets */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Quick Personality Presets</h3>
            <div className="grid grid-cols-1 gap-3">
              {personalityPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
                >
                  <div className="font-medium text-sm text-gray-900 dark:text-white">{preset.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{preset.role}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">{preset.personality.substring(0, 80)}...</div>
                </button>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bot Name</label>
              <input
                type="text"
                value={botPersonality.name}
                onChange={(e) => handlePersonalityChange('name', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., Alex Assistant, Study Buddy, Creative Helper"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role/Function</label>
              <input
                type="text"
                value={botPersonality.role}
                onChange={(e) => handlePersonalityChange('role', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., Personal Assistant, Tutor, Creative Partner"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Personality Description</label>
              <textarea
                value={botPersonality.personality}
                onChange={(e) => handlePersonalityChange('personality', e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Describe your bot's personality traits, characteristics, and behavior style"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Communication Style</label>
              <input
                type="text"
                value={botPersonality.communicationStyle}
                onChange={(e) => handlePersonalityChange('communicationStyle', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., Casual and friendly, Professional, Educational"
              />
            </div>
          </div>

          {/* Expertise Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Areas of Expertise</h3>
            <div className="space-y-2">
              {['General Knowledge', 'Programming', 'Creative Writing', 'Math & Science', 'Personal Development', 'Study Help', 'Technology', 'Art & Design'].map((area) => (
                <label key={area} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={botPersonality.expertise.includes(area)}
                    onChange={(e) => {
                      const currentExpertise = botPersonality.expertise
                      if (e.target.checked) {
                        handlePersonalityChange('expertise', [...currentExpertise, area])
                      } else {
                        handlePersonalityChange('expertise', currentExpertise.filter(ex => ex !== area))
                      }
                    }}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{area}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Personality Sliders */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personality Traits</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Creativity: {botPersonality.creativity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={botPersonality.creativity}
                onChange={(e) => handlePersonalityChange('creativity', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Formality: {botPersonality.formality}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={botPersonality.formality}
                onChange={(e) => handlePersonalityChange('formality', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Helpfulness: {botPersonality.helpfulness}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={botPersonality.helpfulness}
                onChange={(e) => handlePersonalityChange('helpfulness', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Bot Preview & Testing */}
        <div className="space-y-6">
          {/* Bot Summary */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Bot Summary</h3>
            
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{botPersonality.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Role:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{botPersonality.role}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Tone:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{botPersonality.tone}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Expertise:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {botPersonality.expertise.map((exp, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{botPersonality.creativity}%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Creative</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">{botPersonality.formality}%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Formal</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{botPersonality.helpfulness}%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Helpful</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Prompts */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Sample Prompts</h3>
            <div className="mb-3">
              <select
                value={selectedPromptCategory}
                onChange={(e) => setSelectedPromptCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {Object.keys(samplePrompts).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              {samplePrompts[selectedPromptCategory as keyof typeof samplePrompts].map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setTestMessage(prompt)}
                  className="w-full p-3 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300">{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bot Testing */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Test Your Bot</h3>
            <div className="space-y-3">
              <textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Type a message to test your bot's response..."
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={testBot}
                disabled={!testMessage.trim() || isTestingBot}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {isTestingBot ? '🤖 Bot is thinking...' : '💬 Test Bot Response'}
              </button>
              
              {testResponse && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded-lg">
                  <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">{botPersonality.name} says:</div>
                  <div className="text-gray-700 dark:text-gray-300">{testResponse}</div>
                </div>
              )}
            </div>
          </div>

          {/* Generate System Prompt */}
          <div className="space-y-3">
            <button
              onClick={generateSystemPrompt}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              🔧 Generate System Prompt
            </button>
            
            {botSettings.systemPrompt && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Generated System Prompt:</div>
                <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{botSettings.systemPrompt}</pre>
              </div>
            )}

            <button
              onClick={exportBot}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              💾 Export Bot Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
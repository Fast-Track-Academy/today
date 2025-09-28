'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface AvatarOptions {
  style: string
  skinTone: string
  hairColor: string
  hairStyle: string
  eyeColor: string
  clothing: string
  accessories: string
  background: string
}

const avatarPresets = [
  { name: 'Casual Gamer', style: 'modern', skinTone: 'light', hairColor: 'brown', hairStyle: 'messy', eyeColor: 'blue', clothing: 'hoodie', accessories: 'headphones', background: 'neon' },
  { name: 'Professional', style: 'business', skinTone: 'medium', hairColor: 'black', hairStyle: 'neat', eyeColor: 'brown', clothing: 'suit', accessories: 'glasses', background: 'office' },
  { name: 'Creative Artist', style: 'artistic', skinTone: 'dark', hairColor: 'purple', hairStyle: 'wavy', eyeColor: 'green', clothing: 'artsy', accessories: 'paint_brush', background: 'studio' },
  { name: 'Tech Enthusiast', style: 'futuristic', skinTone: 'light', hairColor: 'blue', hairStyle: 'short', eyeColor: 'gray', clothing: 'tech_wear', accessories: 'smartwatch', background: 'digital' }
]

export default function AvatarBuilder() {
  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>({
    style: 'modern',
    skinTone: 'medium',
    hairColor: 'brown',
    hairStyle: 'neat',
    eyeColor: 'brown',
    clothing: 'casual',
    accessories: 'none',
    background: 'simple'
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleOptionChange = (category: keyof AvatarOptions, value: string) => {
    setAvatarOptions(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const applyPreset = (preset: typeof avatarPresets[0]) => {
    setAvatarOptions(preset)
    setUploadedImage(null)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const exportAvatar = () => {
    const avatarData = {
      ...avatarOptions,
      uploadedImage,
      exportDate: new Date().toISOString()
    }
    
    const dataStr = JSON.stringify(avatarData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'my-avatar.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Create Your Game-Style Avatar
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your virtual representation or upload your own image
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Avatar Preview */}
        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Avatar Preview</h3>
            
            {uploadedImage ? (
              <div className="relative">
                <Image
                  src={uploadedImage}
                  alt="Uploaded avatar"
                  width={200}
                  height={200}
                  className="mx-auto rounded-full object-cover"
                />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-200 to-purple-300 dark:from-blue-800 dark:to-purple-900 rounded-full flex items-center justify-center">
                <div className="text-6xl">
                  {avatarOptions.style === 'modern' ? '😊' :
                   avatarOptions.style === 'business' ? '👔' :
                   avatarOptions.style === 'artistic' ? '🎨' :
                   avatarOptions.style === 'futuristic' ? '🤖' : '😊'}
                </div>
              </div>
            )}

            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">Avatar Details</h4>
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <p>Style: {avatarOptions.style}</p>
                <p>Skin: {avatarOptions.skinTone}</p>
                <p>Hair: {avatarOptions.hairColor} ({avatarOptions.hairStyle})</p>
                <p>Eyes: {avatarOptions.eyeColor}</p>
                <p>Outfit: {avatarOptions.clothing}</p>
                <p>Accessories: {avatarOptions.accessories}</p>
                <p>Background: {avatarOptions.background}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={exportAvatar}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              💾 Export Avatar
            </button>
          </div>
        </div>

        {/* Customization Panel */}
        <div className="space-y-6">
          {/* Quick Presets */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Quick Presets</h3>
            <div className="grid grid-cols-2 gap-3">
              {avatarPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
                >
                  <div className="font-medium text-sm text-gray-900 dark:text-white">{preset.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {preset.style} • {preset.clothing}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Custom Image */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Upload Custom Image</h3>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <div className="text-3xl mb-2">📷</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload your own avatar image</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customize Avatar</h3>
            
            {/* Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Avatar Style</label>
              <select
                value={avatarOptions.style}
                onChange={(e) => handleOptionChange('style', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="modern">Modern</option>
                <option value="business">Business</option>
                <option value="artistic">Artistic</option>
                <option value="futuristic">Futuristic</option>
              </select>
            </div>

            {/* Skin Tone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skin Tone</label>
              <div className="flex gap-2">
                {['light', 'medium', 'dark', 'tan'].map((tone) => (
                  <button
                    key={tone}
                    onClick={() => handleOptionChange('skinTone', tone)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      avatarOptions.skinTone === tone ? 'border-blue-500' : 'border-gray-300'
                    } ${
                      tone === 'light' ? 'bg-yellow-100' :
                      tone === 'medium' ? 'bg-yellow-300' :
                      tone === 'dark' ? 'bg-yellow-700' :
                      'bg-yellow-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Hair */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hair Color</label>
                <select
                  value={avatarOptions.hairColor}
                  onChange={(e) => handleOptionChange('hairColor', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="black">Black</option>
                  <option value="brown">Brown</option>
                  <option value="blonde">Blonde</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                  <option value="green">Green</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hair Style</label>
                <select
                  value={avatarOptions.hairStyle}
                  onChange={(e) => handleOptionChange('hairStyle', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="short">Short</option>
                  <option value="neat">Neat</option>
                  <option value="messy">Messy</option>
                  <option value="wavy">Wavy</option>
                  <option value="long">Long</option>
                  <option value="bald">Bald</option>
                </select>
              </div>
            </div>

            {/* Eyes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Eye Color</label>
              <select
                value={avatarOptions.eyeColor}
                onChange={(e) => handleOptionChange('eyeColor', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="brown">Brown</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="gray">Gray</option>
                <option value="hazel">Hazel</option>
              </select>
            </div>

            {/* Clothing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Clothing</label>
              <select
                value={avatarOptions.clothing}
                onChange={(e) => handleOptionChange('clothing', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="casual">Casual</option>
                <option value="hoodie">Hoodie</option>
                <option value="suit">Suit</option>
                <option value="artsy">Artsy</option>
                <option value="tech_wear">Tech Wear</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            {/* Accessories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Accessories</label>
              <select
                value={avatarOptions.accessories}
                onChange={(e) => handleOptionChange('accessories', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="none">None</option>
                <option value="glasses">Glasses</option>
                <option value="headphones">Headphones</option>
                <option value="hat">Hat</option>
                <option value="smartwatch">Smartwatch</option>
                <option value="paint_brush">Paint Brush</option>
                <option value="necklace">Necklace</option>
              </select>
            </div>

            {/* Background */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Background</label>
              <select
                value={avatarOptions.background}
                onChange={(e) => handleOptionChange('background', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="simple">Simple</option>
                <option value="neon">Neon Gaming</option>
                <option value="office">Professional Office</option>
                <option value="studio">Art Studio</option>
                <option value="digital">Digital/Tech</option>
                <option value="nature">Nature</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
# Avatar & AI Bot Creator

A modern web interface for creating game-style avatars and conversational AI bots, built for Fast Track Academy's AI & Digital Bot Creation curriculum.

## 🎯 Features

### 🎭 Avatar Builder
- **Visual Customization**: Game-style avatar creation with comprehensive options
- **Quick Presets**: Pre-designed templates for different persona types
- **Custom Image Upload**: Upload your own avatar images
- **Export Functionality**: Download avatar configurations as JSON

**Customization Options:**
- Avatar style (Modern, Business, Artistic, Futuristic)
- Skin tones and appearance
- Hair color and styles
- Eye colors
- Clothing options
- Accessories (glasses, headphones, smartwatch, etc.)
- Background themes

### 🤖 Bot Builder
- **Personality Configuration**: Define your bot's character and behavior
- **Expertise Areas**: Select from 8+ knowledge domains
- **Communication Style**: Adjust tone, formality, creativity levels
- **Sample Prompts**: Test with category-specific conversation starters
- **System Prompt Generation**: Auto-generate prompts for AI platforms
- **Export Configuration**: Download complete bot settings

**Bot Personality Presets:**
- Friendly Helper (Personal Assistant)
- Tech Mentor (Programming Tutor) 
- Creative Companion (Writing Assistant)
- Study Buddy (Learning Companion)

### 🎨 User Experience
- Clean, intuitive interface with tab-based navigation
- Real-time preview and configuration updates
- Responsive design for desktop and mobile
- Dark/light theme support
- Educational alignment with curriculum content

## 🚀 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom responsive components
- **Image Handling**: Next.js Image optimization
- **State Management**: React hooks (useState)

## 🏁 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Fast-Track-Academy/curriculum.git
cd curriculum/avatar-ai-creator

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
avatar-ai-creator/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Main page
│   │   └── globals.css      # Global styles
│   └── components/          # React components
│       ├── AvatarBuilder.tsx # Avatar creation interface
│       ├── BotBuilder.tsx    # Bot configuration interface
│       └── Navigation.tsx    # Tab navigation
├── public/                  # Static assets
└── README.md               # This file
```

## 🎓 Educational Alignment

This application directly supports the Fast Track Academy curriculum's **AI & Digital Bot Creation** module by providing:

### Learning Objectives Covered:
- ✅ Hands-on AI bot personality development
- ✅ Understanding of conversational AI concepts
- ✅ Visual design and customization skills
- ✅ Introduction to prompt engineering
- ✅ Export/import of AI configurations

### Curriculum Integration:
- **Project 1**: Your First Chatbot - Configure basic bot personalities
- **Project 2**: AI Avatar Creator - Design visual representations 
- **Beginner-Friendly**: No coding required for basic usage
- **Real-World Applications**: Export configurations for actual AI platforms

## 🌐 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Fast-Track-Academy/curriculum/tree/main/avatar-ai-creator)

## 🔧 Customization

### Adding New Avatar Styles
Extend the `avatarPresets` array in `AvatarBuilder.tsx`:

```typescript
const newPreset = {
  name: 'Your Style',
  style: 'custom',
  skinTone: 'medium',
  // ... other options
}
```

### Adding New Bot Personalities
Extend the `personalityPresets` array in `BotBuilder.tsx`:

```typescript
const newPersonality = {
  name: 'Your Bot Type',
  role: 'Specialist Role',
  personality: 'Description...',
  // ... other settings
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Learning Resources

- [Fast Track Academy Curriculum](https://github.com/Fast-Track-Academy/curriculum)
- [AI & Digital Bot Creation Module](../ai-bot-creation.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This project is part of the Fast Track Academy curriculum and follows the same licensing terms.

## 🙋‍♂️ Support

For questions about this application or the curriculum:
- Open an issue in the main curriculum repository
- Reference the AI & Digital Bot Creation curriculum documentation
- Check the Fast Track Academy community resources

---

*Built with ❤️ for Fast Track Academy's project-based learning approach*

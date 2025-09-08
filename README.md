# SampleSecure

**Find, clear, and manage your music samples in minutes, not months.**

SampleSecure is a comprehensive web application that helps remix artists quickly identify, legally clear, and track music samples using AI-powered tools and a streamlined platform.

## 🎵 Features

### Core Functionality
- **🔍 Sample Identification & Discovery**: Upload audio snippets or provide song titles to identify potential samples and their original sources using AI
- **📞 Rights Holder Contact Database**: Access a searchable database of verified contact information for music publishers, labels, and administrators
- **📝 Standardized Clearance Request Forms**: Generate pre-filled, customizable forms for faster rights holder outreach
- **📊 Deal Tracking & Management**: Centralized dashboard to manage all ongoing sample clearance requests, contracts, and payments

### AI-Powered Tools
- **🤖 OpenAI Integration**: Advanced audio analysis and sample identification
- **✍️ Automated Clearance Requests**: AI-generated professional clearance request letters
- **📈 Request Analysis**: Get feedback and suggestions to improve your clearance requests

### Blockchain Integration
- **🔗 Base Network Support**: Built on Coinbase's Base L2 for fast, low-cost transactions
- **💳 OnchainKit Integration**: Seamless wallet connection and blockchain interactions
- **💰 Crypto Payments**: Support for ETH and USDC payments on Base

### Subscription Tiers
- **Free**: 3 sample searches/month, 1 clearance request/month
- **Creator ($15/month)**: 50 sample searches/month, 10 clearance requests/month
- **Pro ($49/month)**: Unlimited searches and clearance requests

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** with custom design system
- **React Router v6** for navigation
- **Framer Motion** for animations
- **React Hook Form** for form handling
- **React Dropzone** for file uploads

### Blockchain & Web3
- **OnchainKit** for Base integration
- **Wagmi** for Ethereum interactions
- **Viem** for low-level blockchain operations
- **Coinbase Wallet** integration

### Backend Services
- **Supabase** for database, authentication, and file storage
- **OpenAI GPT-4** for AI-powered sample identification
- **Stripe** for subscription management and payments

### Development Tools
- **Vite** for build tooling
- **PostCSS** and **Autoprefixer** for CSS processing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- OpenAI API key
- Stripe account (for payments)
- WalletConnect Project ID (for Web3 features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/this-is-a-1302.git
   cd this-is-a-1302
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your API keys in `.env`:
   ```bash
   # Supabase
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # OpenAI
   VITE_OPENAI_API_KEY=your_openai_api_key
   
   # Stripe
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   
   # WalletConnect
   VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ActionForm.jsx   # Sample search and clearance forms
│   ├── DataTable.jsx    # Data display tables
│   ├── SampleCard.jsx   # Sample display cards
│   ├── StatusBadge.jsx  # Status indicators
│   └── ...
├── contexts/            # React context providers
│   ├── AuthContext.jsx  # Authentication state
│   ├── DataContext.jsx  # Application data state
│   └── ...
├── pages/               # Main application pages
│   ├── Dashboard.jsx    # User dashboard
│   ├── FindSamples.jsx  # Sample identification
│   ├── MyClearances.jsx # Clearance management
│   └── ...
├── config/              # Configuration files
│   └── wagmi.js         # Web3 wallet configuration
├── hooks/               # Custom React hooks
└── data/                # Mock data and constants
```

## 🔧 Configuration

### Design System
The application uses a custom design system built with Tailwind CSS. Key design tokens are defined in `tailwind.config.js`:

- **Colors**: Primary blue, accent orange, neutral grays
- **Typography**: Display, heading, body, and caption styles
- **Spacing**: Consistent spacing scale (xs to xxl)
- **Border Radius**: Rounded corners (sm to xl)
- **Shadows**: Card and modal shadows

### Web3 Configuration
Web3 functionality is configured in `src/config/wagmi.js` with support for:
- **Base Mainnet** and **Base Sepolia** testnets
- **Coinbase Wallet** (Smart Wallet preferred)
- **MetaMask** and **WalletConnect** support

## 🔐 Authentication & Security

- **Supabase Auth**: Secure authentication with JWT tokens
- **Row Level Security (RLS)**: Database-level security policies
- **API Key Management**: Secure handling of third-party API keys
- **Input Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error handling and logging

## 💳 Subscription Management

SampleSecure uses Stripe for subscription management with three tiers:

1. **Free Tier**: Limited usage for trying the platform
2. **Creator Tier**: Moderate usage for regular users
3. **Pro Tier**: Unlimited usage for power users

Usage limits are enforced through database functions and tracked in the `usageTracking` table.

## 🧪 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally

### Environment Variables

See `.env.example` for all required environment variables. Key variables include:

- **VITE_SUPABASE_URL**: Your Supabase project URL
- **VITE_SUPABASE_ANON_KEY**: Your Supabase anonymous key
- **VITE_OPENAI_API_KEY**: Your OpenAI API key
- **VITE_STRIPE_PUBLISHABLE_KEY**: Your Stripe publishable key
- **VITE_WALLETCONNECT_PROJECT_ID**: Your WalletConnect project ID

### Feature Flags

The application supports feature flags for gradual rollouts:

- **VITE_ENABLE_AUDIO_ANALYSIS**: Enable/disable AI audio analysis
- **VITE_ENABLE_PAYMENTS**: Enable/disable Stripe payments
- **VITE_ENABLE_BLOCKCHAIN**: Enable/disable Web3 features

## 🚀 Deployment

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting platform**
   - **Vercel**: Connect your GitHub repo and deploy automatically
   - **Netlify**: Drag and drop the `dist` folder or connect via Git

3. **Set up environment variables** in your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/vistara-apps/this-is-a-1302/issues)
- **Email**: support@samplesecure.com

## 🎯 Roadmap

- [ ] Advanced audio fingerprinting
- [ ] Enhanced Base blockchain integration
- [ ] Mobile application
- [ ] API for third-party integrations
- [ ] Advanced analytics and reporting
- [ ] Multi-language support

---

**SampleSecure** - Making sample clearance simple, fast, and reliable for music creators worldwide. 🎵

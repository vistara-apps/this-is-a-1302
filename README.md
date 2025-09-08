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

### Backend Services
- **Supabase** for database, authentication, and file storage
- **OpenAI GPT-4** for AI-powered sample identification
- **Stripe** for subscription management and payments

### Development Tools
- **Vite** for build tooling
- **PostCSS** and **Autoprefixer** for CSS processing
- **Docker** for containerization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- OpenAI API key
- Stripe account (for payments)

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
   ```

4. **Set up the database**
   - Go to your Supabase project dashboard
   - Run the SQL script from `docs/database-setup.sql` in the SQL editor
   - This will create all necessary tables, policies, and sample data

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
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
├── services/            # API and external service integrations
│   ├── supabase.js      # Database operations
│   ├── openai.js        # AI sample identification
│   ├── stripe.js        # Payment processing
│   └── errorHandler.js  # Error handling
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

### API Integration
All external API integrations are handled through service modules:

- **Supabase Service** (`src/services/supabase.js`): Database operations, authentication, file storage
- **OpenAI Service** (`src/services/openai.js`): AI-powered sample identification and text generation
- **Stripe Service** (`src/services/stripe.js`): Subscription management and payment processing
- **Error Handler** (`src/services/errorHandler.js`): Centralized error handling and logging

## 📊 Database Schema

The application uses PostgreSQL through Supabase with the following main tables:

- **users**: User accounts and subscription information
- **projects**: User projects containing samples
- **samples**: Audio samples with identification and clearance information
- **rightsHolders**: Rights holders and their contact information
- **clearanceRequests**: Sample clearance requests and their status
- **usageTracking**: Track user actions for subscription limits

See `docs/database-setup.sql` for the complete schema.

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

### Feature Flags

The application supports feature flags for gradual rollouts:

- **VITE_ENABLE_AUDIO_ANALYSIS**: Enable/disable AI audio analysis
- **VITE_ENABLE_PAYMENTS**: Enable/disable Stripe payments
- **VITE_ENABLE_BLOCKCHAIN**: Enable/disable future blockchain features

## 🚀 Deployment

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting platform**
   - **Vercel**: Connect your GitHub repo and deploy automatically
   - **Netlify**: Drag and drop the `dist` folder or connect via Git
   - **Docker**: Use the included `Dockerfile`

3. **Set up environment variables** in your hosting platform

4. **Configure your database** using the provided SQL schema

### Docker Deployment

```bash
# Build the Docker image
docker build -t samplesecure .

# Run the container
docker run -p 3000:3000 samplesecure
```

## 📚 API Documentation

Comprehensive API documentation is available in `docs/API.md`, including:

- Authentication flows
- Database operations
- AI service integration
- Payment processing
- Error handling
- Rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs/API.md](docs/API.md)
- **Issues**: [GitHub Issues](https://github.com/vistara-apps/this-is-a-1302/issues)
- **Email**: support@samplesecure.com

## 🎯 Roadmap

- [ ] Advanced audio fingerprinting
- [ ] Blockchain-based rights management
- [ ] Mobile application
- [ ] API for third-party integrations
- [ ] Advanced analytics and reporting
- [ ] Multi-language support

---

**SampleSecure** - Making sample clearance simple, fast, and reliable for music creators worldwide. 🎵

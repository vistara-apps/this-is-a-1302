import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Music, Search, FileText, Users, Check } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useSubscription } from '../contexts/SubscriptionContext'

const Landing = () => {
  const navigate = useNavigate()
  const { login, signup } = useAuth()
  const { tiers, upgradeTier } = useSubscription()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await signup(email, password)
      }
      navigate('/app')
    } catch (error) {
      console.error('Authentication error:', error)
    }
  }

  const handleGetStarted = (tier) => {
    upgradeTier(tier)
    navigate('/app')
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="border-b border-dark-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Music className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-dark-text">SampleSecure</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-dark-text-secondary hover:text-dark-text transition-colors">Features</a>
              <a href="#pricing" className="text-dark-text-secondary hover:text-dark-text transition-colors">Pricing</a>
              <a href="#about" className="text-dark-text-secondary hover:text-dark-text transition-colors">About</a>
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-text mb-6">
            Our Remix Sample Secure<br />
            <span className="text-gradient">for artists Simple or Clearways</span>
          </h1>
          <p className="text-xl text-dark-text-secondary mb-8 max-w-3xl mx-auto">
            Find, clear, and manage your music samples in minutes, not months. 
            SampleSecure streamlines the entire sample clearance process for remix artists.
          </p>
          
          {/* Auth Form */}
          <div className="max-w-md mx-auto mb-12">
            <form onSubmit={handleAuth} className="bg-dark-surface p-6 rounded-lg border border-dark-border">
              <h3 className="text-lg font-semibold text-dark-text mb-4">
                {isLogin ? 'Login to Continue' : 'Create Your Account'}
              </h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-md text-dark-text placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-md text-dark-text placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>
              </div>
              <p className="text-sm text-dark-text-secondary mt-4 text-center">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:text-primary/80"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-dark-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-dark-text mb-12">
            Everything you need for sample clearance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: 'Sample Identification',
                description: 'AI-powered audio matching to identify samples and their original sources.'
              },
              {
                icon: Users,
                title: 'Rights Holder Database',
                description: 'Access verified contact information for music publishers and labels.'
              },
              {
                icon: FileText,
                title: 'Clearance Forms',
                description: 'Pre-filled, standardized forms for faster clearance requests.'
              },
              {
                icon: Music,
                title: 'Deal Tracking',
                description: 'Centralized dashboard to manage all your sample agreements.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-dark-text mb-2">{feature.title}</h3>
                <p className="text-dark-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-dark-text mb-12">
            Choose your plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(tiers).map(([key, tier]) => (
              <div key={key} className="bg-dark-surface border border-dark-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-dark-text mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-dark-text mb-4">
                  ${tier.price}<span className="text-lg text-dark-text-secondary">/mo</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-dark-text-secondary">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    {tier.clearances === -1 ? 'Unlimited' : tier.clearances} clearances/month
                  </li>
                  <li className="flex items-center text-dark-text-secondary">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    {tier.searches === -1 ? 'Unlimited' : tier.searches} searches/month
                  </li>
                  <li className="flex items-center text-dark-text-secondary">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Rights holder database access
                  </li>
                  {key === 'pro' && (
                    <li className="flex items-center text-dark-text-secondary">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Priority support
                    </li>
                  )}
                </ul>
                <button
                  onClick={() => handleGetStarted(key)}
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
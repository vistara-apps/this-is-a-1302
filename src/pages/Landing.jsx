import React from 'react'
import { Link } from 'react-router-dom'
import { 
  MusicalNoteIcon,
  MagnifyingGlassIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon,
  BoltIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: MagnifyingGlassIcon,
    title: 'Sample Identification & Discovery',
    description: 'Upload audio snippets or provide song titles to identify potential samples and their original sources using AI-powered matching.'
  },
  {
    icon: UserGroupIcon,
    title: 'Rights Holder Contact Database',
    description: 'Access verified contact information for music publishers, labels, and administrators for seamless sample clearance outreach.'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Standardized Clearance Forms',
    description: 'Generate pre-filled, customizable forms that include all necessary information for faster clearance processing.'
  },
  {
    icon: ClockIcon,
    title: 'Deal Tracking & Management',
    description: 'Centralized dashboard to manage all ongoing sample clearance requests, contracts, and payments with status updates.'
  }
]

const pricing = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started',
    features: [
      '5 sample searches per month',
      '2 clearance requests per month',
      'Basic rights holder database',
      'Standard forms'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Creator',
    price: '$15',
    period: '/month',
    description: 'For active remix artists',
    features: [
      'Unlimited sample searches',
      '10 clearance requests per month',
      'Full rights holder database',
      'Premium form templates',
      'Email support'
    ],
    cta: 'Start Creator Plan',
    popular: true
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For professional producers',
    features: [
      'Everything in Creator',
      'Unlimited clearance requests',
      'Priority processing',
      'Advanced analytics',
      'Direct agent outreach',
      'Priority support'
    ],
    cta: 'Go Pro',
    popular: false
  }
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <MusicalNoteIcon className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-dark-text">SampleSecure</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/auth"
                className="text-dark-text-secondary hover:text-dark-text transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/auth"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-dark-text mb-6">
            Our Remix Sample Secure
            <br />
            <span className="text-primary">for amast Simpe or Clearwass</span>
          </h1>
          <p className="text-xl text-dark-text-secondary mb-8 max-w-3xl mx-auto">
            Find, clear, and manage your music samples in minutes, not months. 
            SampleSecure helps remix artists quickly identify, legally clear, and track music samples using a streamlined platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth" className="btn-primary text-lg px-8 py-4">
              Start Free Trial
            </Link>
            <button className="btn-secondary text-lg px-8 py-4">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-text mb-4">
              Everything you need to clear samples
            </h2>
            <p className="text-xl text-dark-text-secondary">
              Streamline your sample clearance workflow with our comprehensive platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-dark-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-dark-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-text mb-4">
              Choose your plan
            </h2>
            <p className="text-xl text-dark-text-secondary">
              Start free and scale as you grow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div key={index} className={`card relative ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold text-dark-text mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-dark-text-secondary mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-dark-text">
                      {plan.price}
                    </span>
                    <span className="text-dark-text-secondary ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 text-primary mr-3" />
                      <span className="text-dark-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/auth"
                  className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'bg-dark-border hover:bg-dark-text-secondary text-dark-text'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to streamline your sample clearance?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of artists who trust SampleSecure for their sample clearance needs
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            <BoltIcon className="h-5 w-5 mr-2" />
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-surface border-t border-dark-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MusicalNoteIcon className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-dark-text">SampleSecure</span>
            </div>
            <div className="text-dark-text-secondary">
              © 2024 SampleSecure. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
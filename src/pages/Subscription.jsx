import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { 
  CheckIcon,
  XMarkIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'month',
    description: 'Perfect for getting started',
    features: [
      '5 sample searches per month',
      '2 clearance requests per month',
      'Basic rights holder database',
      'Standard forms',
      'Email support'
    ],
    limitations: [
      'Limited AI analysis',
      'No priority processing',
      'Basic analytics only'
    ],
    popular: false,
    current: false
  },
  {
    id: 'creator',
    name: 'Creator',
    price: 15,
    period: 'month',
    description: 'For active remix artists',
    features: [
      'Unlimited sample searches',
      '10 clearance requests per month',
      'Full rights holder database',
      'Premium form templates',
      'Advanced AI analysis',
      'Email support',
      'Usage analytics'
    ],
    limitations: [
      'No priority processing',
      'No direct agent outreach'
    ],
    popular: true,
    current: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    period: 'month',
    description: 'For professional producers',
    features: [
      'Everything in Creator',
      'Unlimited clearance requests',
      'Priority processing',
      'Advanced analytics & insights',
      'Direct agent outreach',
      'Custom form templates',
      'Priority support',
      'API access'
    ],
    limitations: [],
    popular: false,
    current: false
  }
]

export default function Subscription() {
  const { user, updateSubscription } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Mark current plan
  const plansWithCurrent = plans.map(plan => ({
    ...plan,
    current: plan.id === user?.subscriptionTier
  }))

  const handlePlanSelect = (plan) => {
    if (plan.current) return
    setSelectedPlan(plan)
  }

  const handleUpgrade = async () => {
    if (!selectedPlan) return

    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      updateSubscription(selectedPlan.id)
      setIsProcessing(false)
      setSelectedPlan(null)
      alert(`Successfully upgraded to ${selectedPlan.name} plan!`)
    }, 2000)
  }

  const currentPlan = plansWithCurrent.find(plan => plan.current)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-text">Subscription</h1>
        <p className="text-dark-text-secondary mt-1">
          Choose the plan that best fits your sample clearance needs
        </p>
      </div>

      {/* Current Plan Status */}
      <div className="card bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-dark-text">Current Plan</h2>
            <p className="text-dark-text-secondary">
              You're currently on the <span className="font-medium text-primary capitalize">{user?.subscriptionTier}</span> plan
            </p>
          </div>
          {currentPlan && (
            <div className="text-right">
              <p className="text-2xl font-bold text-dark-text">
                ${currentPlan.price}
                <span className="text-dark-text-secondary text-base font-normal">/{currentPlan.period}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Usage Stats (for current plan) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-text-secondary text-sm">Searches This Month</p>
              <p className="text-2xl font-bold text-dark-text">3</p>
            </div>
            <div className="text-right">
              <p className="text-dark-text-secondary text-sm">
                {user?.subscriptionTier === 'free' ? '/ 5' : 'Unlimited'}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-text-secondary text-sm">Clearance Requests</p>
              <p className="text-2xl font-bold text-dark-text">2</p>
            </div>
            <div className="text-right">
              <p className="text-dark-text-secondary text-sm">
                {user?.subscriptionTier === 'free' ? '/ 2' : 
                 user?.subscriptionTier === 'creator' ? '/ 10' : 'Unlimited'}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-text-secondary text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-dark-text">75%</p>
            </div>
            <div className="text-right">
              <p className="text-dark-text-secondary text-sm">Clearances</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dark-text mb-2">Choose Your Plan</h2>
          <p className="text-dark-text-secondary">Upgrade or downgrade at any time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plansWithCurrent.map((plan) => (
            <div
              key={plan.id}
              className={`card relative cursor-pointer transition-all duration-fast ${
                plan.current
                  ? 'ring-2 ring-primary bg-primary/5'
                  : plan.popular
                  ? 'ring-2 ring-accent'
                  : selectedPlan?.id === plan.id
                  ? 'ring-2 ring-primary'
                  : 'hover:bg-dark-bg'
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <StarIcon className="h-4 w-4" />
                    <span>Most Popular</span>
                  </span>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Current
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-dark-text mb-2">
                  {plan.name}
                </h3>
                <p className="text-dark-text-secondary mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-dark-text">
                    ${plan.price}
                  </span>
                  <span className="text-dark-text-secondary ml-1">
                    /{plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-medium text-dark-text mb-2">Included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                        <span className="text-dark-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-dark-text mb-2">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <XMarkIcon className="h-4 w-4 text-red-500 mr-2 shrink-0" />
                          <span className="text-dark-text-secondary">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.current
                    ? 'bg-dark-border text-dark-text cursor-default'
                    : plan.popular
                    ? 'bg-accent hover:bg-accent/90 text-white'
                    : 'bg-primary hover:bg-primary/90 text-white'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : `Select ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="card">
        <h2 className="text-xl font-semibold text-dark-text mb-6">Feature Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left py-3 text-dark-text">Feature</th>
                <th className="text-center py-3 text-dark-text">Free</th>
                <th className="text-center py-3 text-dark-text">Creator</th>
                <th className="text-center py-3 text-dark-text">Pro</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-dark-border">
                <td className="py-3 text-dark-text">Sample searches</td>
                <td className="text-center py-3 text-dark-text-secondary">5/month</td>
                <td className="text-center py-3 text-dark-text-secondary">Unlimited</td>
                <td className="text-center py-3 text-dark-text-secondary">Unlimited</td>
              </tr>
              <tr className="border-b border-dark-border">
                <td className="py-3 text-dark-text">Clearance requests</td>
                <td className="text-center py-3 text-dark-text-secondary">2/month</td>
                <td className="text-center py-3 text-dark-text-secondary">10/month</td>
                <td className="text-center py-3 text-dark-text-secondary">Unlimited</td>
              </tr>
              <tr className="border-b border-dark-border">
                <td className="py-3 text-dark-text">AI analysis</td>
                <td className="text-center py-3">
                  <XMarkIcon className="h-4 w-4 text-red-500 mx-auto" />
                </td>
                <td className="text-center py-3">
                  <CheckIcon className="h-4 w-4 text-green-500 mx-auto" />
                </td>
                <td className="text-center py-3">
                  <CheckIcon className="h-4 w-4 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-dark-border">
                <td className="py-3 text-dark-text">Priority processing</td>
                <td className="text-center py-3">
                  <XMarkIcon className="h-4 w-4 text-red-500 mx-auto" />
                </td>
                <td className="text-center py-3">
                  <XMarkIcon className="h-4 w-4 text-red-500 mx-auto" />
                </td>
                <td className="text-center py-3">
                  <CheckIcon className="h-4 w-4 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-3 text-dark-text">API access</td>
                <td className="text-center py-3">
                  <XMarkIcon className="h-4 w-4 text-red-500 mx-auto" />
                </td>
                <td className="text-center py-3">
                  <XMarkIcon className="h-4 w-4 text-red-500 mx-auto" />
                </td>
                <td className="text-center py-3">
                  <CheckIcon className="h-4 w-4 text-green-500 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-surface rounded-lg shadow-modal w-full max-w-md">
            <div className="p-6 border-b border-dark-border">
              <h2 className="text-xl font-semibold text-dark-text">
                Upgrade to {selectedPlan.name}
              </h2>
              <p className="text-dark-text-secondary mt-1">
                Confirm your subscription upgrade
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-dark-bg rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-dark-text">Plan</span>
                  <span className="font-medium text-dark-text">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-text">Price</span>
                  <span className="font-medium text-dark-text">
                    ${selectedPlan.price}/{selectedPlan.period}
                  </span>
                </div>
              </div>

              <div className="text-sm text-dark-text-secondary">
                <ShieldCheckIcon className="h-4 w-4 inline mr-1" />
                Secure payment processing with Stripe
              </div>
            </div>

            <div className="p-6 border-t border-dark-border flex justify-end space-x-4">
              <button
                onClick={() => setSelectedPlan(null)}
                className="btn-secondary"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handleUpgrade}
                className="btn-primary flex items-center space-x-2"
                disabled={isProcessing}
              >
                <CreditCardIcon className="h-4 w-4" />
                <span>{isProcessing ? 'Processing...' : 'Upgrade Now'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
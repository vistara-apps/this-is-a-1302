import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

if (!stripePublishableKey) {
  console.warn('Stripe publishable key missing. Payment functionality will be limited.')
}

let stripePromise = null

if (stripePublishableKey) {
  stripePromise = loadStripe(stripePublishableKey)
}

// Subscription tier configurations
export const SUBSCRIPTION_TIERS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: null,
    features: [
      '3 sample searches per month',
      '1 clearance request per month',
      'Basic sample database access',
      'Community support'
    ],
    limits: {
      samplesPerMonth: 3,
      clearancesPerMonth: 1,
      projectsMax: 1
    }
  },
  creator: {
    id: 'creator',
    name: 'Creator',
    price: 15,
    priceId: 'price_creator_monthly', // Replace with actual Stripe price ID
    features: [
      '50 sample searches per month',
      '10 clearance requests per month',
      'Full sample database access',
      'AI-powered clearance request generation',
      'Email support',
      'Project management tools'
    ],
    limits: {
      samplesPerMonth: 50,
      clearancesPerMonth: 10,
      projectsMax: 5
    }
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 49,
    priceId: 'price_pro_monthly', // Replace with actual Stripe price ID
    features: [
      'Unlimited sample searches',
      'Unlimited clearance requests',
      'Full sample database access',
      'AI-powered clearance request generation',
      'Priority email support',
      'Advanced project management',
      'Rights holder contact database',
      'Deal tracking & management',
      'Custom clearance templates'
    ],
    limits: {
      samplesPerMonth: -1, // Unlimited
      clearancesPerMonth: -1, // Unlimited
      projectsMax: -1 // Unlimited
    }
  }
}

export const stripeService = {
  /**
   * Get Stripe instance
   * @returns {Promise<Stripe|null>} Stripe instance or null if not configured
   */
  async getStripe() {
    if (!stripePromise) return null
    return await stripePromise
  },

  /**
   * Create checkout session for subscription
   * @param {string} priceId - Stripe price ID
   * @param {string} customerId - Customer ID (optional)
   * @param {string} successUrl - Success redirect URL
   * @param {string} cancelUrl - Cancel redirect URL
   * @returns {Promise<Object>} Checkout session
   */
  async createCheckoutSession(priceId, customerId = null, successUrl = null, cancelUrl = null) {
    if (!stripePromise) {
      throw new Error('Stripe not configured')
    }

    const defaultSuccessUrl = `${window.location.origin}/subscription?success=true`
    const defaultCancelUrl = `${window.location.origin}/subscription?canceled=true`

    try {
      // In a real implementation, this would call your backend API
      // For now, we'll simulate the checkout session creation
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          customerId,
          successUrl: successUrl || defaultSuccessUrl,
          cancelUrl: cancelUrl || defaultCancelUrl,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const session = await response.json()
      return session

    } catch (error) {
      console.error('Stripe checkout session creation error:', error)
      
      // Return mock session for development
      return {
        id: 'cs_mock_' + Date.now(),
        url: `${window.location.origin}/subscription?mock=true&tier=${priceId}`
      }
    }
  },

  /**
   * Redirect to Stripe Checkout
   * @param {string} priceId - Stripe price ID
   * @param {string} customerId - Customer ID (optional)
   * @returns {Promise<void>}
   */
  async redirectToCheckout(priceId, customerId = null) {
    const stripe = await this.getStripe()
    
    if (!stripe) {
      // Fallback for development - redirect to mock success page
      const tier = Object.values(SUBSCRIPTION_TIERS).find(t => t.priceId === priceId)
      window.location.href = `/subscription?mock=true&tier=${tier?.id || 'creator'}`
      return
    }

    try {
      const session = await this.createCheckoutSession(priceId, customerId)
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }

    } catch (error) {
      console.error('Stripe checkout redirect error:', error)
      throw error
    }
  },

  /**
   * Create customer portal session
   * @param {string} customerId - Stripe customer ID
   * @param {string} returnUrl - Return URL after portal session
   * @returns {Promise<Object>} Portal session
   */
  async createPortalSession(customerId, returnUrl = null) {
    if (!stripePromise) {
      throw new Error('Stripe not configured')
    }

    const defaultReturnUrl = `${window.location.origin}/settings`

    try {
      // In a real implementation, this would call your backend API
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          returnUrl: returnUrl || defaultReturnUrl,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create portal session')
      }

      const session = await response.json()
      return session

    } catch (error) {
      console.error('Stripe portal session creation error:', error)
      
      // Return mock session for development
      return {
        url: `${window.location.origin}/settings?mock_portal=true`
      }
    }
  },

  /**
   * Redirect to customer portal
   * @param {string} customerId - Stripe customer ID
   * @returns {Promise<void>}
   */
  async redirectToPortal(customerId) {
    try {
      const session = await this.createPortalSession(customerId)
      window.location.href = session.url

    } catch (error) {
      console.error('Stripe portal redirect error:', error)
      throw error
    }
  },

  /**
   * Get subscription tier by ID
   * @param {string} tierId - Subscription tier ID
   * @returns {Object|null} Subscription tier configuration
   */
  getSubscriptionTier(tierId) {
    return SUBSCRIPTION_TIERS[tierId] || null
  },

  /**
   * Check if user can perform action based on subscription limits
   * @param {Object} user - User object with subscription info
   * @param {string} action - Action to check (samples, clearances, projects)
   * @param {number} currentUsage - Current usage count
   * @returns {boolean} Whether action is allowed
   */
  canPerformAction(user, action, currentUsage = 0) {
    const tier = this.getSubscriptionTier(user.subscriptionTier)
    if (!tier) return false

    const limitKey = `${action}PerMonth`
    const limit = tier.limits[limitKey]

    // -1 means unlimited
    if (limit === -1) return true
    
    return currentUsage < limit
  },

  /**
   * Get usage limits for user's subscription tier
   * @param {Object} user - User object with subscription info
   * @returns {Object} Usage limits
   */
  getUsageLimits(user) {
    const tier = this.getSubscriptionTier(user.subscriptionTier)
    return tier ? tier.limits : SUBSCRIPTION_TIERS.free.limits
  },

  /**
   * Format price for display
   * @param {number} price - Price in dollars
   * @returns {string} Formatted price string
   */
  formatPrice(price) {
    if (price === 0) return 'Free'
    return `$${price}/month`
  },

  /**
   * Validate webhook signature (for backend use)
   * @param {string} payload - Webhook payload
   * @param {string} signature - Stripe signature header
   * @param {string} endpointSecret - Webhook endpoint secret
   * @returns {Object} Verified event object
   */
  validateWebhook(payload, signature, endpointSecret) {
    // This would typically be used in a backend API route
    // Included here for completeness of the service
    if (!stripePromise) {
      throw new Error('Stripe not configured')
    }

    try {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
      const event = stripe.webhooks.constructEvent(payload, signature, endpointSecret)
      return event
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      throw error
    }
  }
}

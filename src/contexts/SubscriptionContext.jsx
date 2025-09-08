import React, { createContext, useContext, useState } from 'react'

const SubscriptionContext = createContext()

export const useSubscription = () => {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}

export const SubscriptionProvider = ({ children }) => {
  const [subscriptionTier, setSubscriptionTier] = useState('free')
  const [clearancesUsed, setClearancesUsed] = useState(0)

  const tiers = {
    free: { name: 'Free', price: 0, clearances: 3, searches: 10 },
    creator: { name: 'Creator', price: 15, clearances: 10, searches: 100 },
    pro: { name: 'Pro', price: 49, clearances: -1, searches: -1 }
  }

  const upgradeTier = (tier) => {
    setSubscriptionTier(tier)
  }

  const canUseClearance = () => {
    const tier = tiers[subscriptionTier]
    return tier.clearances === -1 || clearancesUsed < tier.clearances
  }

  const useClearance = () => {
    if (canUseClearance()) {
      setClearancesUsed(prev => prev + 1)
      return true
    }
    return false
  }

  return (
    <SubscriptionContext.Provider value={{
      subscriptionTier,
      clearancesUsed,
      tiers,
      upgradeTier,
      canUseClearance,
      useClearance
    }}>
      {children}
    </SubscriptionContext.Provider>
  )
}
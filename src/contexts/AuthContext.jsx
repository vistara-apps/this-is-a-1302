import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check
    const savedUser = localStorage.getItem('samplesecure_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    // Simulate sign in
    const mockUser = {
      id: '1',
      email,
      subscriptionTier: 'free',
      createdAt: new Date().toISOString()
    }
    setUser(mockUser)
    localStorage.setItem('samplesecure_user', JSON.stringify(mockUser))
    return mockUser
  }

  const signUp = async (email, password) => {
    // Simulate sign up
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      subscriptionTier: 'free',
      createdAt: new Date().toISOString()
    }
    setUser(mockUser)
    localStorage.setItem('samplesecure_user', JSON.stringify(mockUser))
    return mockUser
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('samplesecure_user')
  }

  const updateSubscription = (tier) => {
    const updatedUser = { ...user, subscriptionTier: tier }
    setUser(updatedUser)
    localStorage.setItem('samplesecure_user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    updateSubscription,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
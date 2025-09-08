import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, supabaseService } from '../services/supabase'
import { handleError } from '../services/errorHandler'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase?.auth.getSession() || { data: { session: null }, error: null }
        
        if (error) {
          handleError(error, { component: 'AuthProvider', action: 'getSession' })
        }

        if (session?.user) {
          await handleAuthUser(session.user)
        } else {
          // Fallback to localStorage for development
          const savedUser = localStorage.getItem('samplesecure_user')
          if (savedUser) {
            setUser(JSON.parse(savedUser))
          }
        }
      } catch (error) {
        handleError(error, { component: 'AuthProvider', action: 'getInitialSession' })
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase?.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await handleAuthUser(session.user)
      } else {
        setUser(null)
        localStorage.removeItem('samplesecure_user')
      }
      setLoading(false)
    }) || { data: { subscription: null } }

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const handleAuthUser = async (authUser) => {
    try {
      // Get or create user in our database
      let userData = await supabaseService.getUser(authUser.id)
      
      if (!userData) {
        // Create user if doesn't exist
        userData = {
          userId: authUser.id,
          email: authUser.email,
          subscriptionTier: 'free',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        if (supabase) {
          const { data, error } = await supabase
            .from('users')
            .insert([userData])
            .select()
            .single()
          
          if (error) throw error
          userData = data
        }
      }

      setUser(userData)
      localStorage.setItem('samplesecure_user', JSON.stringify(userData))
    } catch (error) {
      handleError(error, { component: 'AuthProvider', action: 'handleAuthUser' })
      
      // Fallback user object
      const fallbackUser = {
        id: authUser.id,
        email: authUser.email,
        subscriptionTier: 'free',
        createdAt: new Date().toISOString()
      }
      setUser(fallbackUser)
      localStorage.setItem('samplesecure_user', JSON.stringify(fallbackUser))
    }
  }

  const signIn = async (email, password) => {
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) throw error
        return data.user
      } else {
        // Fallback for development
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
    } catch (error) {
      handleError(error, { component: 'AuthProvider', action: 'signIn' })
      throw error
    }
  }

  const signUp = async (email, password) => {
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        })

        if (error) throw error
        return data.user
      } else {
        // Fallback for development
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
    } catch (error) {
      handleError(error, { component: 'AuthProvider', action: 'signUp' })
      throw error
    }
  }

  const signOut = async () => {
    try {
      if (supabase) {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      }
      
      setUser(null)
      localStorage.removeItem('samplesecure_user')
    } catch (error) {
      handleError(error, { component: 'AuthProvider', action: 'signOut' })
      throw error
    }
  }

  const updateSubscription = async (tier) => {
    try {
      const updatedUser = { ...user, subscriptionTier: tier }
      
      if (supabase && user?.userId) {
        const { data, error } = await supabase
          .from('users')
          .update({ subscriptionTier: tier })
          .eq('userId', user.userId)
          .select()
          .single()
        
        if (error) throw error
        setUser(data)
        localStorage.setItem('samplesecure_user', JSON.stringify(data))
      } else {
        setUser(updatedUser)
        localStorage.setItem('samplesecure_user', JSON.stringify(updatedUser))
      }
    } catch (error) {
      handleError(error, { component: 'AuthProvider', action: 'updateSubscription' })
      throw error
    }
  }

  const resetPassword = async (email) => {
    try {
      if (supabase) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`
        })
        
        if (error) throw error
      }
    } catch (error) {
      handleError(error, { component: 'AuthProvider', action: 'resetPassword' })
      throw error
    }
  }

  const updatePassword = async (newPassword) => {
    try {
      if (supabase) {
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        })
        
        if (error) throw error
      }
    } catch (error) {
      handleError(error, { component: 'AuthProvider', action: 'updatePassword' })
      throw error
    }
  }

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    updateSubscription,
    resetPassword,
    updatePassword,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

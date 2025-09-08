import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email, password) => {
    // Mock authentication
    const mockUser = {
      userId: 'user-1',
      email: email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setUser(mockUser)
    setIsAuthenticated(true)
    return mockUser
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const signup = async (email, password) => {
    // Mock signup
    return login(email, password)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      signup
    }}>
      {children}
    </AuthContext.Provider>
  )
}
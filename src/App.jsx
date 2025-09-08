import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { SubscriptionProvider } from './contexts/SubscriptionContext'
import Header from './components/Header'
import SidebarNav from './components/SidebarNav'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import FindSamples from './pages/FindSamples'
import MyClearances from './pages/MyClearances'
import RightsHolders from './pages/RightsHolders'
import Settings from './pages/Settings'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <AuthProvider>
      <SubscriptionProvider>
        <div className="min-h-screen bg-dark-bg text-dark-text">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app/*" element={
              <div className="flex h-screen">
                <SidebarNav 
                  collapsed={sidebarCollapsed} 
                  onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
                />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <main className="flex-1 overflow-auto p-6">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/find-samples" element={<FindSamples />} />
                      <Route path="/clearances" element={<MyClearances />} />
                      <Route path="/rights-holders" element={<RightsHolders />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </main>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </SubscriptionProvider>
    </AuthProvider>
  )
}

export default App
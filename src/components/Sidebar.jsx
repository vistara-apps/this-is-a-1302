import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  DocumentCheckIcon, 
  UserGroupIcon, 
  Cog6ToothIcon,
  Bars3Icon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Find Samples', href: '/find-samples', icon: MagnifyingGlassIcon },
  { name: 'My Clearances', href: '/clearances', icon: DocumentCheckIcon },
  { name: 'Rights Holders', href: '/rights-holders', icon: UserGroupIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
]

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-dark-surface border-r border-dark-border transition-all duration-base ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-dark-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <MusicalNoteIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-dark-text">SampleSecure</span>
            </div>
          )}
          <button
            onClick={() => onToggle(!collapsed)}
            className="p-2 rounded-lg hover:bg-dark-border transition-colors"
          >
            <Bars3Icon className="h-5 w-5 text-dark-text" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-dark-text-secondary hover:text-dark-text hover:bg-dark-border'
                }`
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
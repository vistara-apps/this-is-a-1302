import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  Users, 
  Settings, 
  ChevronLeft,
  Music
} from 'lucide-react'
import clsx from 'clsx'

const SidebarNav = ({ collapsed, onToggle }) => {
  const navItems = [
    { to: '/app', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/app/find-samples', icon: Search, label: 'Find Samples' },
    { to: '/app/clearances', icon: FileText, label: 'My Clearances' },
    { to: '/app/rights-holders', icon: Users, label: 'Rights Holders' },
    { to: '/app/settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <div className={clsx(
      'bg-dark-surface border-r border-dark-border transition-all duration-300 flex flex-col',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo & Toggle */}
      <div className="p-4 border-b border-dark-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Music className="w-8 h-8 text-primary" />
              <span className="text-lg font-bold text-dark-text">SampleSecure</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-dark-bg transition-colors"
          >
            <ChevronLeft className={clsx(
              'w-5 h-5 text-dark-text-secondary transition-transform',
              collapsed && 'rotate-180'
            )} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center px-3 py-2 rounded-md transition-colors',
                    'hover:bg-dark-bg',
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-dark-text-secondary hover:text-dark-text',
                    collapsed ? 'justify-center' : 'space-x-3'
                  )
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default SidebarNav
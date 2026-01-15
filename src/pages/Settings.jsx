import { useState } from 'react'
import { Save, Bell, Lock, User, Globe, Palette, Shield } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'

function Settings() {
  const { theme, toggleTheme } = useTheme()
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
    security: {
      twoFactor: false,
      loginAlerts: true,
    },
    profile: {
      name: 'Admin User',
      email: 'admin@example.com',
      language: 'en',
      timezone: 'UTC',
    },
    appearance: {
      theme: 'light',
      compactMode: false,
    },
  })

  const handleToggle = (category, key) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }))
  }

  const handleInputChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
  }

  const SettingSection = ({ icon: Icon, title, children }) => (
    <Card className="animate-fade-in">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3">
          <Icon className="text-primary-600 dark:text-primary-400" size={20} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      </div>
      {children}
    </Card>
  )

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{label}</p>
        {description && <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
        </div>
        <Button variant="primary" className="flex items-center">
          <Save size={20} className="mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Profile Settings */}
      <SettingSection icon={User} title="Profile Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              value={settings.profile.name}
              onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={settings.profile.email}
              onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Language</label>
              <select
                value={settings.profile.language}
                onChange={(e) => handleInputChange('profile', 'language', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
              <select
                value={settings.profile.timezone}
                onChange={(e) => handleInputChange('profile', 'timezone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="GMT">GMT</option>
              </select>
            </div>
          </div>
        </div>
      </SettingSection>

      {/* Notifications */}
      <SettingSection icon={Bell} title="Notifications">
        <div>
          <ToggleSwitch
            enabled={settings.notifications.email}
            onChange={() => handleToggle('notifications', 'email')}
            label="Email Notifications"
            description="Receive notifications via email"
          />
          <ToggleSwitch
            enabled={settings.notifications.push}
            onChange={() => handleToggle('notifications', 'push')}
            label="Push Notifications"
            description="Receive push notifications in your browser"
          />
          <ToggleSwitch
            enabled={settings.notifications.sms}
            onChange={() => handleToggle('notifications', 'sms')}
            label="SMS Notifications"
            description="Receive notifications via SMS"
          />
        </div>
      </SettingSection>

      {/* Security */}
      <SettingSection icon={Shield} title="Security">
        <div>
          <ToggleSwitch
            enabled={settings.security.twoFactor}
            onChange={() => handleToggle('security', 'twoFactor')}
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
          />
          <ToggleSwitch
            enabled={settings.security.loginAlerts}
            onChange={() => handleToggle('security', 'loginAlerts')}
            label="Login Alerts"
            description="Get notified when someone logs into your account"
          />
        </div>
      </SettingSection>

      {/* Appearance */}
      <SettingSection icon={Palette} title="Appearance">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Theme</label>
            <div className="flex space-x-4">
              <button
                onClick={toggleTheme}
                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                  theme === 'light'
                    ? 'border-primary-600 dark:border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Current theme: <span className="font-semibold capitalize">{theme}</span>
            </p>
          </div>
          <ToggleSwitch
            enabled={settings.appearance.compactMode}
            onChange={() => handleToggle('appearance', 'compactMode')}
            label="Compact Mode"
            description="Reduce spacing and padding for a more compact view"
          />
        </div>
      </SettingSection>
    </div>
  )
}

export default Settings

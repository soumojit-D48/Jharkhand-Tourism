


import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiService } from '@/lib/api.js'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // start with true until checkAuth finishes

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await apiService.checkAuth()
      if (response.success && response.user) {
        setUser(response.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        setUser(null) // User not authenticated
      } else {
        console.error('Auth check failed:', error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await apiService.login(credentials)
      if (response.success) {
        if (response.user) {
          setUser(response.user) // Set user from login response
        } else {
          await checkAuth() // Fallback to checkAuth if no user in response
        }
        return { success: true, message: response.message }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Login failed',
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData)
      if (response.success) {
        if (response.user) {
          setUser(response.user) // Set user from register response
        } else {
          await checkAuth() // Fallback to checkAuth if no user in response
        }
        return { success: true, message: response.message }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Registration failed',
      }
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
      setUser(null)
      return { success: true, message: 'Logged out successfully' }
    } catch (error) {
      console.error('Logout error:', error.message)
      setUser(null) // Always clear user state even if logout request fails
      return { success: false, message: error.message }
    }
  }

  // Password reset methods
  const sendResetOtp = async (email) => {
    try {
      const response = await apiService.sendResetOtp(email)
      return { success: response.success, message: response.message }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to send reset OTP',
      }
    }
  }

  const resetPassword = async (resetData) => {
    try {
      const response = await apiService.resetPassword(resetData)
      return { success: response.success, message: response.message }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Password reset failed',
      }
    }
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    checkAuth,
    sendResetOtp,
    resetPassword,
    isAuthenticated: !!user,
    // Helper properties
    userName: user?.name,
    userEmail: user?.email,
    userId: user?.id,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
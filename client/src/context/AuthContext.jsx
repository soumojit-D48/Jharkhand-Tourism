// import React, { createContext, useContext, useState, useEffect } from 'react'
// import { apiService } from '@/lib/api'

// const AuthContext = createContext({})

// export const useAuth = () => {
//     const context = useContext(AuthContext)
//     if(!context) {
//         throw new Error('useAuth must be used within AuthProvider')
//     }
//     return context
// }

// export const AuthProvider = ({children}) => {
//     const [user, setUser] = useState(null)
//     const [loading, setIsloading] = useState(null)

//     useEffect(() => {
//         checkAuth()
//     },[])

//     const checkAuth = async () => {
//         try {
//             const response = await apiService.checkAuth()
//             if(response.success){
//                 setUser(response.user)
//             } else {
//               setUser(null) //
//             }
//         } catch (error) {
//             console.error('Auth check failed: ', error)
//             setUser(null)
//         } finally{
//             setIsloading(false)
//         }
//     }
//     /*
//     catch (error) {
//       if (error.response?.status === 401) {
//         setIsLoggedin(false);
//         console.log("User is not logged in.");
//       } else {
//         toast.error("Something went wrong. Please try again.");
//         console.error("Axios error:", error.message);
//       }
//     }
//      */

//     const login = async (credentials) => {
//         try {
//             const response = await apiService.login(credentials)

//             if(response.success) {
//                 await checkAuth()  // Refresh user data
//                 return {success: true}
//             }
//             return { success: false, message: response.message }
//         } catch (error) {
//             return { success: false, message: error.message }
//         }
//     }

//     const register = async (userData) => {
//     try {
//       const response = await apiService.register(userData)
//       if (response.success) {
//         await checkAuth() // Auto-login after registration
//         return { success: true, message: response.message }
//       }
//       return { success: false, message: response.message }
//     } catch (error) {
//       return { success: false, message: error.message }
//     }
//   }

//   const logout = async () => {
//     try {
//         await apiService.logout()
//     } catch (error) {
//         console.error('Logout error:', error)
//     } finally {
//         setUser(null) // if api call resolve or reject, clear user
//     }
//   }

//   const value = {
//     user, loading, register, login, logout, checkAuth, isAuthenticated: !!user
//   }

//   return (
//     <AuthContext.Provider value={value}>
//         {children}
//     </AuthContext.Provider>
//   )


// }














import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiService } from '@/lib/api'

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
      if (response.success) {
        setUser(response.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      // Axios errors have error.response
      if (error.response?.status === 401) {
        setUser(null) // not logged in
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
        await checkAuth()
        return { success: true }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData)
      if (response.success) {
        await checkAuth() // Auto-login after registration
        return { success: true, message: response.message }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      }
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error('Logout error:', error.message)
    } finally {
      setUser(null) // Always clear user state
    }
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

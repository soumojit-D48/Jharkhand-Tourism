// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000"

// class ApiService {
//     async request(endpoint, options = {}) {
//         const url = `${API_BASE}/api${endpoint}`

//         const defaultOptions = {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include' // Include cookies for authentication
//         }

//         try {
//             const response = await fetch(url, { ...defaultOptions, ...options })
//             const data = await response.json()

//             if (!response.ok) {
//                 throw new Error(data.message || 'Request Failed')
//             }

//             return data
//         } catch (error) {
//             throw new Error(error.message || 'Network error')
//         }
//     }

//     async register(userData) {
//         return this.request('/auth/register', {
//             method: 'POST',
//             body: JSON.stringify(userData)
//         })
//     }

//     async login(credentials) {
//         return this.request('/auth/login', {
//             method: 'POST',
//             body: JSON.stringify(credentials),
//         })
//     }

//     async logout() {
//         return this.request('/auth/logout', {
//             method: 'POST',
//         })
//     }

//     // async checkAuth() {
//     //     return this.request('/user//user-data', {
//     //         method: 'GET'
//     //     })
//     // }

//     async checkAuth() {
//         return this.request('/auth/is-auth', {
//             method: 'GET'
//         })
//     }

//      async sendVerifyOtp() {
//     return this.request('/auth/send-verify-otp', {
//       method: 'POST',
//     })
//   }

//   async verifyEmail(otp) {
//     return this.request('/auth/verify-email', {
//       method: 'POST',
//       body: JSON.stringify({ otp }),
//     })
//   }


//   async sendResetOtp(email) {
//     return this.request('/auth/send-reset-otp', {
//       method: 'POST',
//       body: JSON.stringify({ email }),
//     })
//   }

//   async resetPassword(credentials){
//     return this.request('/auth/reset-password', {
//     method: 'POST',
//       body: JSON.stringify(credentials),
//     })
//   }


// }


// export const apiService = new ApiService()







import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE}/api`,
      withCredentials: true, // for cookies
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async request(endpoint, options = {}) {
    try {
      const response = await this.api.request({
        url: endpoint,
        method: options.method || "GET",
        data: options.body ? JSON.parse(options.body) : undefined, // axios uses "data" instead of "body"
        ...options,
      });

      return response.data; // axios already gives JSON
    } catch (error) {
      // Axios error handling
      if (error.response) {
        throw new Error(error.response.data.message || "Request failed");
      } else if (error.request) {
        throw new Error("No response from server");
      } else {
        throw new Error(error.message || "Network error");
      }
    }
  }

  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  async checkAuth() {
    return this.request("/auth/is-auth", {
      method: "GET",
    });
  }

  async sendVerifyOtp() {
    return this.request("/auth/send-verify-otp", {
      method: "POST",
    });
  }

  async verifyEmail(otp) {
    return this.request("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ otp }),
    });
  }

  async sendResetOtp(email) {
    return this.request("/auth/send-reset-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(credentials) {
    return this.request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }
}

export const apiService = new ApiService();

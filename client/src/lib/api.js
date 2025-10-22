
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

// class ApiService {
//   constructor() {
//     this.api = axios.create({
//       baseURL: `${API_BASE}/api`,
//       withCredentials: true, // for cookies
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }

//   async request(endpoint, options = {}) {
//     try {
//       const response = await this.api.request({
//         url: endpoint,
//         method: options.method || "GET",
//         data: options.body ? JSON.parse(options.body) : undefined, // axios uses "data" instead of "body"
//         ...options,
//       });

//       return response.data; // axios already gives JSON
//     } catch (error) {
//       // Axios error handling
//       if (error.response) {
//         throw new Error(error.response.data.message || "Request failed");
//       } else if (error.request) {
//         throw new Error("No response from server");
//       } else {
//         throw new Error(error.message || "Network error");
//       }
//     }
//   }

//   async register(userData) {
//     return this.request("/auth/register", {
//       method: "POST",
//       body: JSON.stringify(userData),
//     });
//   }

//   async login(credentials) {
//     return this.request("/auth/login", {
//       method: "POST",
//       body: JSON.stringify(credentials),
//     });
//   }

//   async logout() {
//     return this.request("/auth/logout", {
//       method: "POST",
//     });
//   }

//   async checkAuth() {
//     return this.request("/auth/is-auth", {
//       method: "GET",
//     });
//   }

//   async sendVerifyOtp() {
//     return this.request("/auth/send-verify-otp", {
//       method: "POST",
//     });
//   }

//   async verifyEmail(otp) {
//     return this.request("/auth/verify-email", {
//       method: "POST",
//       body: JSON.stringify({ otp }),
//     });
//   }

//   async sendResetOtp(email) {
//     return this.request("/auth/send-reset-otp", {
//       method: "POST",
//       body: JSON.stringify({ email }),
//     });
//   }

//   async resetPassword(credentials) {
//     return this.request("/auth/reset-password", {
//       method: "POST",
//       body: JSON.stringify(credentials),
//     });
//   }
// }

// export const apiService = new ApiService();







// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

// class ApiService {
//   constructor() {
//     this.api = axios.create({
//       baseURL: `${API_BASE}/api`,
//       withCredentials: true, // for cookies
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     // Add response interceptor to handle errors globally
//     this.api.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         // Handle common error scenarios
//         if (error.response?.status === 401) {
//           // Token expired or invalid - redirect to login or clear auth state
//           console.log('Authentication failed');
//         }
//         return Promise.reject(error);
//       }
//     );
//   }

//   async request(endpoint, options = {}) {
//     try {
//       const response = await this.api.request({
//         url: endpoint,
//         method: options.method || "GET",
//         data: options.data, // Use data directly instead of parsing body
//         ...options,
//       });

//       return response.data; // axios already gives JSON
//     } catch (error) {
//       // Axios error handling
//       if (error.response) {
//         // Server responded with error status
//         throw new Error(error.response.data.message || "Request failed");
//       } else if (error.request) {
//         // Request was made but no response received
//         throw new Error("No response from server");
//       } else {
//         // Something else happened
//         throw new Error(error.message || "Network error");
//       }
//     }
//   }

//   async register(userData) {
//     return this.request("/auth/register", {
//       method: "POST",
//       data: userData, // Use data instead of body
//     });
//   }

//   async login(credentials) {
//     return this.request("/auth/login", {
//       method: "POST",
//       data: credentials, // Use data instead of body
//     });
//   }

//   async logout() {
//     return this.request("/auth/logout", {
//       method: "POST",
//     });
//   }

//   async checkAuth() {
//     return this.request("/auth/is-auth", {
//       method: "GET",
//     });
//   }

//   async sendVerifyOtp() {
//     return this.request("/auth/send-verify-otp", {
//       method: "POST",
//     });
//   }

//   async verifyEmail(otp) {
//     return this.request("/auth/verify-email", {
//       method: "POST",
//       data: { otp }, // Use data instead of body
//     });
//   }

//   async sendResetOtp(email) {
//     return this.request("/auth/send-reset-otp", {
//       method: "POST",
//       data: { email }, // Use data instead of body
//     });
//   }

//   async resetPassword(credentials) {
//     return this.request("/auth/reset-password", {
//       method: "POST",
//       data: credentials, // Use data instead of body
//     });
//   }
// }

// export const apiService = new ApiService();







import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Fixed port

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE}/api`,
      withCredentials: true, // for cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add response interceptor to handle errors globally
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle common error scenarios
        if (error.response?.status === 401) {
          // Token expired or invalid - redirect to login or clear auth state
          console.log('Authentication failed');
        }
        return Promise.reject(error);
      }
    );
  }

  async request(endpoint, options = {}) {
    try {
      const response = await this.api.request({
        url: endpoint,
        method: options.method || "GET",
        data: options.data,
        ...options,
      });

      return response.data; // axios already gives JSON
    } catch (error) {
      // Axios error handling
      if (error.response) {
        // Server responded with error status
        throw new Error(error.response.data.message || "Request failed");
      } else if (error.request) {
        // Request was made but no response received
        throw new Error("No response from server");
      } else {
        // Something else happened
        throw new Error(error.message || "Network error");
      }
    }
  }

  // Authentication methods
  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      data: userData,
    });
  }

  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      data: credentials,
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

  // Password reset methods
  async sendResetOtp(email) {
    return this.request("/auth/send-reset-otp", {
      method: "POST",
      data: { email },
    });
  }

  async resetPassword(resetData) {
    return this.request("/auth/reset-password", {
      method: "POST",
      data: resetData, // { email, otp, newPassword }
    });
  }


   // ============================================
  // ADMIN - Role Management
  // ============================================

  async getPendingRequests() {
    return this.request("/admin/pending-requests", {
      method: "GET",
    });
  }

  async approveRole(userId) {
    return this.request(`/admin/approve/${userId}`, {
      method: "PUT",
    });
  }

  async rejectRole(userId) {
    return this.request(`/admin/reject/${userId}`, {
      method: "PUT",
    });
  }

  async getAllAdmins() {
    return this.request("/admin/get-admins", {
      method: "GET",
    });
  }

  async addAdmin(email) {
    return this.request("/admin/add-admin", {
      method: "POST",
      data: { email },
    });
  }

  async removeAdmin(userId) {
    return this.request(`/admin/remove-admin/${userId}`, {
      method: "DELETE",
    });
  }



  // // ============================================
  // // HOTELS - Public
  // // ============================================

  // async getAllHotels(params = {}) {
  //   const queryString = new URLSearchParams(params).toString();
  //   return this.request(`/hotels?${queryString}`, {
  //     method: "GET",
  //   });
  // }

  // async getHotelById(hotelId) {
  //   return this.request(`/hotels/${hotelId}`, {
  //     method: "GET",
  //   });
  // }

  // async getHotelRooms(hotelId, params = {}) {
  //   const queryString = new URLSearchParams(params).toString();
  //   return this.request(`/hotels/${hotelId}/rooms?${queryString}`, {
  //     method: "GET",
  //   });
  // }

  // async getRoomById(roomId) {
  //   return this.request(`/hotels/rooms/${roomId}`, {
  //     method: "GET",
  //   });
  // }

  // // ============================================
  // // HOTELS - Manager Only
  // // ============================================

  // async createHotel(formData) {
  //   return this.request("/hotels", {
  //     method: "POST",
  //     data: formData,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // }

  // async getMyHotels(params = {}) {
  //   const queryString = new URLSearchParams(params).toString();
  //   return this.request(`/hotels/manager/my-hotels?${queryString}`, {
  //     method: "GET",
  //   });
  // }

  // async updateHotel(hotelId, formData) {
  //   return this.request(`/hotels/${hotelId}`, {
  //     method: "PUT",
  //     data: formData,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // }

  // async deleteHotelImage(hotelId, imageUrl) {
  //   return this.request(`/hotels/${hotelId}/images`, {
  //     method: "DELETE",
  //     data: { imageUrl },
  //   });
  // }

  // async deleteHotel(hotelId) {
  //   return this.request(`/hotels/${hotelId}`, {
  //     method: "DELETE",
  //   });
  // }

  // // ============================================
  // // ROOMS - Manager Only
  // // ============================================

  // async addRoom(hotelId, roomData) {
  //   return this.request(`/hotels/${hotelId}/rooms`, {
  //     method: "POST",
  //     data: roomData,
  //   });
  // }

  // async addMultipleRooms(hotelId, rooms) {
  //   return this.request(`/hotels/${hotelId}/rooms/bulk`, {
  //     method: "POST",
  //     data: { rooms },
  //   });
  // }

  // async updateRoom(roomId, roomData) {
  //   return this.request(`/hotels/rooms/${roomId}`, {
  //     method: "PUT",
  //     data: roomData,
  //   });
  // }

  // async deleteRoom(roomId) {
  //   return this.request(`/hotels/rooms/${roomId}`, {
  //     method: "DELETE",
  //   });
  // }




  // ============================================
  // HOTEL ROUTES
  // ============================================

  // Public Routes
  async getAllHotels(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/hotels${queryString ? `?${queryString}` : ""}`);
  }

  async getHotelById(hotelId) {
    return this.request(`/hotels/${hotelId}`);
  }

  // Manager Routes
  async createHotel(formData) {
    return this.request("/hotels", {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async getMyHotels(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/hotels/manager/my-hotels${queryString ? `?${queryString}` : ""}`);
  }

  async updateHotel(hotelId, formData) {
    return this.request(`/hotels/${hotelId}`, {
      method: "PUT",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async deleteHotelImage(hotelId, imageUrl) {
    return this.request(`/hotels/${hotelId}/images`, {
      method: "DELETE",
      data: { imageUrl },
    });
  }

  async deleteHotel(hotelId) {
    return this.request(`/hotels/${hotelId}`, {
      method: "DELETE",
    });
  }

  // ============================================
  // ROOM ROUTES
  // ============================================

  // Public Routes
  async getHotelRooms(hotelId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/hotels/${hotelId}/rooms${queryString ? `?${queryString}` : ""}`);
  }

  async getRoomById(roomId) {
    return this.request(`/hotels/rooms/${roomId}`);
  }

  // Manager Routes
  async addRoom(hotelId, roomData) {
    return this.request(`/hotels/${hotelId}/rooms`, {
      method: "POST",
      data: roomData,
    });
  }

  async addMultipleRooms(hotelId, rooms) {
    return this.request(`/hotels/${hotelId}/rooms/bulk`, {
      method: "POST",
      data: { rooms },
    });
  }

  async updateRoom(roomId, roomData) {
    return this.request(`/hotels/rooms/${roomId}`, {
      method: "PUT",
      data: roomData,
    });
  }

  async deleteRoom(roomId) {
    return this.request(`/hotels/rooms/${roomId}`, {
      method: "DELETE",
    });
  }
  
}

export const apiService = new ApiService();







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


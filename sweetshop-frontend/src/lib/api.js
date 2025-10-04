// const mockSweets = [
//   {
//   id: 1,
//   name: "Chocolate Fudge Brownie",
//   category: "Chocolate",
//   price: 3.99,
//   quantity: 15,
//   description: "Rich, decadent chocolate brownies with fudge chunks",
//   image: "/images/chocolate_brownie.png"
// },
//   {
//     id: 2,
//     name: "Strawberry Lollipop",
//     category: "Lollipops",
//     price: 1.50,
//     quantity: 25,
//     description: "Sweet strawberry flavored lollipops",
//     image: "/images/strawberry_lollipop.png"
//   },
//   {
//     id: 3,
//     name: "Vanilla Cupcake",
//     category: "Cupcakes",
//     price: 2.75,
//     quantity: 8,
//     description: "Fluffy vanilla cupcakes with buttercream frosting",
//     image: "/images/vanilla_cupcake.png"
//   },
//   {
//     id: 6, // Make sure IDs are unique
//     name: "Gulab Jamun",
//     category: "Milk-based",
//     price: 6.99,
//     quantity: 20,
//     description: "Deep-fried milk solids (khoya) soaked in a rose-flavored sugar syrup",
//     image: "/images/gulabJamun.png"
//   },
//   {
//     id: 8,
//     name: "Kaju Katli",
//     category: "Nut-based",
//     price: 12.99,
//     quantity: 10,
//     description: "Diamond-shaped cashew fudge, typically garnished with edible silver leaf",
//     image: "/images/kaju-katli.png"
//   },
//   {
//     id: 10,
//     name: "Rasgulla",
//     category: "Cheese-based",
//     price: 7.50,
//     quantity: 18,
//     description: "Spongy, soft cheese balls (chenna) cooked in a light sugar syrup",
//     image: "/images/rasgulla.png"
//   },
//   {
//     id: 5,
//     name: "Caramel Popcorn",
//     category: "Popcorn",
//     price: 5.50,
//     quantity: 0,
//     description: "Crunchy popcorn covered in sweet caramel",
//     image: "/images/popcorn.png"
//   },
//   {
//     id: 13,
//     name: "Peda",
//     category: "Milk-based",
//     price: 7.00,
//     quantity: 30,
//     description: "Soft, semi-soft sweet disks made from khoya (milk solids) and sugar, often garnished with nuts.",
//     image: "/images/peda.png" // Note: Similar appearance to Kaju Katli
//   },
// ];



// // Mock user data
// const mockUser = {
//   id: 1,
//   username: "testuser",
//   email: "test@example.com",
//   role: "USER"
// };

// // Helper function to simulate API delay
// const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// // Mock Auth API
// export const authAPI = {
//   register: async (userData) => {
//     await mockDelay();
//     // Simulate successful registration
//     const token = "mock-jwt-token";
//     return {
//       data: {
//         user: { ...mockUser, username: userData.username, email: userData.email },
//         token
//       }
//     };
//   },
//   login: async (credentials) => {
//     await mockDelay();
//     // Simulate successful login
//     const token = "mock-jwt-token";
//     return {
//       data: {
//         user: mockUser,
//         token
//       }
//     };
//   },
// };

// // Mock Sweets API
// export const sweetsAPI = {
//   getAll: async () => {
//     await mockDelay();
//     return {
//       data: mockSweets
//     };
//   },
//   getById: async (id) => {
//     await mockDelay();
//     const sweet = mockSweets.find(s => s.id === parseInt(id));
//     if (!sweet) {
//       throw new Error('Sweet not found');
//     }
//     return {
//       data: sweet
//     };
//   },
//   search: async (params) => {
//     await mockDelay();
//     let filtered = [...mockSweets];
    
//     if (params.name) {
//       filtered = filtered.filter(sweet => 
//         sweet.name.toLowerCase().includes(params.name.toLowerCase())
//       );
//     }
    
//     if (params.category) {
//       filtered = filtered.filter(sweet => sweet.category === params.category);
//     }
    
//     return {
//       data: filtered
//     };
//   },
//   create: async (sweetData) => {
//     await mockDelay();
//     const newSweet = {
//       id: Math.max(...mockSweets.map(s => s.id)) + 1,
//       ...sweetData
//     };
//     mockSweets.push(newSweet);
//     return {
//       data: newSweet
//     };
//   },
//   update: async (id, sweetData) => {
//     await mockDelay();
//     const index = mockSweets.findIndex(s => s.id === parseInt(id));
//     if (index === -1) {
//       throw new Error('Sweet not found');
//     }
//     mockSweets[index] = { ...mockSweets[index], ...sweetData };
//     return {
//       data: mockSweets[index]
//     };
//   },
//   delete: async (id) => {
//     await mockDelay();
//     const index = mockSweets.findIndex(s => s.id === parseInt(id));
//     if (index === -1) {
//       throw new Error('Sweet not found');
//     }
//     mockSweets.splice(index, 1);
//     return {
//       data: { message: 'Sweet deleted successfully' }
//     };
//   },
//   purchase: async (id, quantity = 1) => {
//     await mockDelay();
//     const sweet = mockSweets.find(s => s.id === parseInt(id));
//     if (!sweet) {
//       throw new Error('Sweet not found');
//     }
//     if (sweet.quantity < quantity) {
//       throw new Error('Insufficient quantity');
//     }
//     sweet.quantity -= quantity;
//     return {
//       data: { message: 'Purchase successful', sweet }
//     };
//   },
//   restock: async (id, quantity) => {
//     await mockDelay();
//     const sweet = mockSweets.find(s => s.id === parseInt(id));
//     if (!sweet) {
//       throw new Error('Sweet not found');
//     }
//     sweet.quantity += quantity;
//     return {
//       data: { message: 'Restock successful', sweet }
//     };
//   },
// };
// const api = { authAPI, sweetsAPI };
// export default api;

import axios from 'axios';

// 1️⃣ Base URL for backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// 2️⃣ Create Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// 3️⃣ Interceptor to add JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // get JWT from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- AUTH API ---
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// --- SWEETS API ---
export const sweetsAPI = {
  getAll: () => api.get('/sweets'),
  search: (params) => api.get('/sweets/search', { params }),

  // POST a new sweet (Admin) with JSON
  create: (sweetData) => api.post('/sweets', sweetData),

  // PUT to update a sweet (Admin) with JSON
  update: (id, sweetData) => api.put(`/sweets/${id}`, sweetData),

  delete: (id) => api.delete(`/sweets/${id}`),
  purchase: (id, quantity = 1) => api.post(`/sweets/${id}/purchase`, { quantity }),
  restock: (id, quantity) => api.post(`/sweets/${id}/restock`, { quantity }),
};

export default api;


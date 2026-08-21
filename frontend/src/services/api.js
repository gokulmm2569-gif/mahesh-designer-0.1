import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Request interceptor — attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('md_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — auto-logout on expired token (except for login/register endpoints)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isAuthEndpoint = err.config?.url?.includes('/auth/login') || err.config?.url?.includes('/auth/register');
    if (err.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('md_token');
      localStorage.removeItem('md_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

// ─── Auth ─────────────────────────────────────────────────────────
export const authAPI = {
  login:         (data) => api.post('/auth/login', data),
  register:      (data) => api.post('/auth/register', data),
  getProfile:    ()     => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// ─── Categories ───────────────────────────────────────────────────
export const categoriesAPI = {
  list: () => api.get('/categories'),
};

// ─── Products ─────────────────────────────────────────────────────
export const productsAPI = {
  list:     (params) => api.get('/products', { params }),
  featured: ()       => api.get('/products/featured'),
  detail:   (slug)   => api.get(`/products/${slug}`),
};

// ─── Wishlist ─────────────────────────────────────────────────────
export const wishlistAPI = {
  get:    ()          => api.get('/wishlist'),
  toggle: (productId) => api.post(`/wishlist/toggle/${productId}`),
  remove: (productId) => api.delete(`/wishlist/${productId}`),
};

// ─── Cart ─────────────────────────────────────────────────────────
export const cartAPI = {
  get:    ()                              => api.get('/cart'),
  add:    (data)                          => api.post('/cart/add', data),
  update: (itemId, data)                  => api.put(`/cart/${itemId}`, data),
  remove: (itemId)                        => api.delete(`/cart/${itemId}`),
  clear:  ()                              => api.delete('/cart/clear/all'),
};

// ─── Orders ───────────────────────────────────────────────────────
export const ordersAPI = {
  place:  (data)    => api.post('/orders', data),
  list:   ()        => api.get('/orders'),
  detail: (orderId) => api.get(`/orders/${orderId}`),
};

// ─── Reviews ──────────────────────────────────────────────────────
export const reviewsAPI = {
  list:   (productId) => api.get(`/reviews/${productId}`),
  submit: (data)      => api.post('/reviews', data),
};

// ─── Admin ───────────────────────────────────────────────────────
export const adminAPI = {
  dashboard:      ()                       => api.get('/admin/dashboard'),
  // Products
  listProducts:   ()                       => api.get('/admin/products'),
  createProduct:  (formData)               => api.post('/admin/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateProduct:  (id, data)               => api.put(`/admin/products/${id}`, data),
  deleteProduct:  (id)                     => api.delete(`/admin/products/${id}`),
  uploadImage:    (id, formData)           => api.post(`/admin/products/${id}/images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  // Categories
  listCategories: ()                       => api.get('/admin/categories'),
  createCategory: (data)                   => api.post('/admin/categories', data),
  updateCategory: (id, data)               => api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id)                     => api.delete(`/admin/categories/${id}`),
  // Orders
  listOrders:     (status)                 => api.get('/admin/orders', { params: { status_filter: status } }),
  updateOrder:    (id, data)               => api.put(`/admin/orders/${id}/status`, data),
  // Customers
  listCustomers:  ()                       => api.get('/admin/customers'),
  // Reviews
  listReviews:    ()                       => api.get('/admin/reviews'),
  approveReview:  (id)                     => api.put(`/admin/reviews/${id}/approve`),
  deleteReview:   (id)                     => api.delete(`/admin/reviews/${id}`),
};

export default api;

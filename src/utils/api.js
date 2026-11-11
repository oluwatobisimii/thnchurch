// API Helper for THN Church Website Backend Communication

const API_BASE = import.meta.env.DEV 
  ? 'http://localhost:8000/api' 
  : '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}/${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
    credentials: 'include', // Transmits cookies for PHP session validation
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`API Error on endpoint ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Public Data
  getSiteData: () => request('get_site_data.php'),
  submitContact: (formData) => request('contact.php', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),
  submitForm: (formData) => request('submit_form.php', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),

  // Admin Auth
  login: (password) => request('login.php', {
    method: 'POST',
    body: JSON.stringify({ password }),
  }),
  logout: () => request('logout.php', {
    method: 'POST',
  }),
  checkSession: () => request('check_session.php'),

  // Admin Actions (Require active session)
  saveSiteData: (siteData) => request('save_site_data.php', {
    method: 'POST',
    body: JSON.stringify(siteData),
  }),
  changePassword: (currentPassword, newPassword) => request('save_site_data.php', {
    method: 'POST',
    body: JSON.stringify({
      change_password: true,
      current_password: currentPassword,
      new_password: newPassword,
    }),
  }),
  getMessages: () => request('get_messages.php'),
  getSubmissions: () => request('get_submissions.php'),
};

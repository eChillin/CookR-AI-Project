const API_URL = "http://192.168.4.21:4000";  
// Make sure this is your laptop IPv4

export default {
  signupRequest: `${API_URL}/signup/request`,
  signupVerify: `${API_URL}/signup/verify`,
  login: `${API_URL}/auth/login`,
  sendReset: `${API_URL}/auth/send-reset`,
  verifyReset: `${API_URL}/auth/verify-reset`,
  resetPassword: `${API_URL}/auth/reset-password`,
  forgotUsername: `${API_URL}/auth/forgot-username`,
};

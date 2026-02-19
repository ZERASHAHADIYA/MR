const API_BASE_URL = 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken() {
    if (typeof window !== 'undefined') {
      return this.token || localStorage.getItem('token');
    }
    return this.token;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Backend may not be running.');
      }
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error.message);
      throw error;
    }
  }

  // Auth endpoints
  async sendOTP(mobile, language = 'ta') {
    return this.request('/auth/send-otp', {
      method: 'POST',
      body: { mobile, language }
    });
  }

  async verifyOTP(mobile, otp, name, language = 'ta') {
    const response = await this.request('/auth/verify-otp', {
      method: 'POST',
      body: { mobile, otp, name, language }
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  // User endpoints
  async updateLanguage(language) {
    return this.request('/user/language', {
      method: 'PUT',
      body: { language }
    });
  }

  // Health ID endpoints
  async getHealthId() {
    return this.request('/health-id');
  }

  async updateHealthId(data) {
    return this.request('/health-id', {
      method: 'PUT',
      body: data
    });
  }

  // AI endpoints
  async symptomCheck(symptoms, language = 'ta') {
    return this.request('/ai/symptom-check', {
      method: 'POST',
      body: { symptoms, language }
    });
  }

  async chatWithAI(message, language = 'ta', chatId = null) {
    return this.request('/ai/chat', {
      method: 'POST',
      body: { message, language, chatId }
    });
  }

  async getSymptomHistory(page = 1) {
    return this.request(`/ai/symptom-history?page=${page}`);
  }

  async getChatHistory(page = 1) {
    return this.request(`/ai/chat-history?page=${page}`);
  }

  // Consultation endpoints
  async getHospitals(latitude, longitude, language = 'ta') {
    const params = new URLSearchParams({ language });
    if (latitude && longitude) {
      params.append('latitude', latitude);
      params.append('longitude', longitude);
    }
    return this.request(`/consult/hospitals?${params}`);
  }

  async getDoctors(hospitalId, language = 'ta') {
    return this.request(`/consult/doctors?hospitalId=${hospitalId}&language=${language}`);
  }

  async bookConsultation(data) {
    return this.request('/consult/book', {
      method: 'POST',
      body: data
    });
  }

  async getConsultationHistory(page = 1) {
    return this.request(`/consult/history?page=${page}`);
  }

  // SOS endpoints
  async triggerSOS(data) {
    return this.request('/sos/trigger', {
      method: 'POST',
      body: data
    });
  }

  async getSOSHistory(page = 1) {
    return this.request(`/sos/history?page=${page}`);
  }

  // Health videos
  async getHealthVideos(language = 'ta', category = null, page = 1) {
    const params = new URLSearchParams({ language, page });
    if (category) params.append('category', category);
    return this.request(`/health/videos?${params}`);
  }

  // Lab Test Booking endpoints
  async getLabTests() {
    return this.request('/labs/tests');
  }

  async getLabTestById(id) {
    return this.request(`/labs/tests/${id}`);
  }

  async getDiagnosticLabs(district, city) {
    try {
      const params = new URLSearchParams();
      if (district) params.append('district', district);
      if (city) params.append('city', city);
      return this.request(`/labs/labs?${params}`);
    } catch (error) {
      console.error('getDiagnosticLabs error:', error);
      return { labs: [] };
    }
  }

  async getDistricts() {
    try {
      return this.request('/labs/districts');
    } catch (error) {
      console.error('getDistricts error:', error);
      return { districts: [] };
    }
  }

  async getCities(district) {
    try {
      const params = district ? `?district=${district}` : '';
      return this.request(`/labs/cities${params}`);
    } catch (error) {
      console.error('getCities error:', error);
      return { cities: [] };
    }
  }

  async bookLabTest(data) {
    return this.request('/labs/book', {
      method: 'POST',
      body: data
    });
  }

  async confirmLabPayment(bookingId) {
    return this.request('/labs/confirm-payment', {
      method: 'POST',
      body: { bookingId }
    });
  }

  async getUserLabBookings(userId) {
    return this.request(`/labs/bookings/user/${userId}`);
  }

  async getLabBookingById(bookingId) {
    return this.request(`/labs/bookings/${bookingId}`);
  }

  async getLabReport(bookingId) {
    return this.request(`/labs/report/${bookingId}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health-check');
  }

  // Enhanced Video Consultation endpoints
  async createConsultationRequest(data) {
    return this.request('/consult/request', {
      method: 'POST',
      body: data
    });
  }

  async getMyConsultationRequests() {
    return this.request('/consult/my-requests');
  }

  async getDoctorRequests(doctorId) {
    return this.request(`/doctor/requests?doctorId=${doctorId}`);
  }

  async updateConsultationRequest(requestId, status, rejectionReason = '') {
    return this.request(`/doctor/request/${requestId}`, {
      method: 'PUT',
      body: { status, rejectionReason }
    });
  }

  async getPatientQRCode() {
    return this.request('/patient/qr-code');
  }

  async scanPatientQR(qrCode) {
    return this.request(`/doctor/scan-qr/${qrCode}`);
  }

  async updateMedicalProfile(data) {
    return this.request('/patient/medical-profile', {
      method: 'PUT',
      body: data
    });
  }

  async createPrescription(data) {
    return this.request('/doctor/prescription', {
      method: 'POST',
      body: data
    });
  }

  async getMyPrescriptions() {
    return this.request('/patient/prescriptions');
  }

  async getPrescriptionById(prescriptionId) {
    return this.request(`/prescription/${prescriptionId}`);
  }
}

const apiClient = new ApiClient();
export default apiClient;
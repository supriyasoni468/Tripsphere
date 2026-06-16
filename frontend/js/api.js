const API_URL = 'http://localhost:8000/api';

// ==========================================
// TOURIST APIs
// ==========================================

async function registerTourist(touristData) {
  try {
    const response = await fetch(`${API_URL}/tourists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(touristData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering tourist:', error);
    throw error;
  }
}

async function getTourists() {
  try {
    const response = await fetch(`${API_URL}/tourists`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tourists:', error);
    throw error;
  }
}

// ==========================================
// BUSINESS APIs
// ==========================================

async function getBusinesses(category = '') {
  try {
    const url = category 
      ? `${API_URL}/businesses?category=${category}`
      : `${API_URL}/businesses`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    throw error;
  }
}

async function addBusiness(businessData) {
  try {
    const response = await fetch(`${API_URL}/businesses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(businessData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding business:', error);
    throw error;
  }
}

// ==========================================
// EMERGENCY APIs
// ==========================================

async function getEmergencyContacts(category = '') {
  try {
    const url = category 
      ? `${API_URL}/emergency?category=${category}`
      : `${API_URL}/emergency`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching emergency contacts:', error);
    throw error;
  }
}

async function addEmergencyContact(emergencyData) {
  try {
    const response = await fetch(`${API_URL}/emergency`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emergencyData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding emergency contact:', error);
    throw error;
  }
}

// ==========================================
// ASSISTANCE REQUEST APIs
// ==========================================

async function createAssistanceRequest(requestData) {
  try {
    const response = await fetch(`${API_URL}/assistance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating assistance request:', error);
    throw error;
  }
}

async function getAssistanceRequests() {
  try {
    const response = await fetch(`${API_URL}/assistance`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching assistance requests:', error);
    throw error;
  }
}

// ==========================================
// BOOKING HELPER
// ==========================================

async function submitBooking(bookingData) {
  try {
    // Create a tourist first
    const tourist = await registerTourist({
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone || '+91-0000000000',
      country: bookingData.country || 'India',
      preferredLanguage: 'English'
    });

    // Then create assistance request for the booking
    const assistanceRequest = await createAssistanceRequest({
      touristId: tourist._id,
      requestType: 'Information',
      description: `Booking Request: ${bookingData.destination} for ${bookingData.guests} guests on ${bookingData.date}. Package: ${bookingData.package}. ${bookingData.message ? 'Additional info: ' + bookingData.message : ''}`,
      status: 'Pending',
      priority: 'Medium'
    });

    return { tourist, assistanceRequest };
  } catch (error) {
    console.error('Error submitting booking:', error);
    throw error;
  }
}

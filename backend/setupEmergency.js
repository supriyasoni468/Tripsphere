const mongoose = require('mongoose');
require('dotenv').config();
const Emergency = require('./models/Emergency');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log(' Connected to MongoDB');
  
  // Clear existing emergency contacts
  await Emergency.deleteMany({});
  console.log('  Cleared old emergency contacts');
  
  // Add ALL-INDIA GENERAL emergency contacts
  const emergencies = await Emergency.insertMany([
    // ========== ALL INDIA GENERAL NUMBERS ==========
    {
      serviceName: 'Police (All India)',
      category: 'Police',
      phone: '100',
      address: 'Available from any phone',
      city: 'All India',
      available24x7: true
    },
    {
      serviceName: 'Fire Brigade (All India)',
      category: 'Fire',
      phone: '101',
      address: 'Available from any phone',
      city: 'All India',
      available24x7: true
    },
    {
      serviceName: 'Ambulance (All India)',
      category: 'Ambulance',
      phone: '102',
      address: 'Available from any phone',
      city: 'All India',
      available24x7: true
    },
    {
      serviceName: 'National Emergency Number',
      category: 'Ambulance',
      phone: '112',
      address: 'Single number for all emergencies',
      city: 'All India',
      available24x7: true
    },
    {
      serviceName: 'Ambulance Service (Best)',
      category: 'Ambulance',
      phone: '108',
      address: 'Free ambulance service',
      city: 'All India',
      available24x7: true
    },
    {
      serviceName: 'Women Helpline',
      category: 'Police',
      phone: '1091',
      address: 'For women in distress',
      city: 'All India',
      available24x7: true
    },
    {
      serviceName: 'Child Helpline',
      category: 'Tourist Help',
      phone: '1098',
      address: 'For children in need',
      city: 'All India',
      available24x7: true
    },
    {
      serviceName: 'Tourist Helpline India',
      category: 'Tourist Help',
      phone: '1363',
      address: 'Ministry of Tourism, Govt of India',
      city: 'All India',
      available24x7: true
    },
    {
      serviceName: 'Tourist Helpline (Toll Free)',
      category: 'Tourist Help',
      phone: '1800-11-1363',
      address: 'Multi-language support available',
      city: 'All India',
      available24x7: true
    },
    {
      serviceName: 'Disaster Management Helpline',
      category: 'Fire',
      phone: '1078',
      address: 'Natural disasters, floods, earthquakes',
      city: 'All India',
      available24x7: true
    },
    {
      serviceName: 'Road Accident Emergency',
      category: 'Ambulance',
      phone: '1073',
      address: 'Highway emergencies',
      city: 'All India',
      available24x7: true
    },
    {
      serviceName: 'Cyber Crime Helpline',
      category: 'Police',
      phone: '1930',
      address: 'Report cyber fraud, online scams',
      city: 'All India',
      available24x7: true
    },
    
    // ========== DELHI SPECIFIC ==========
    {
      serviceName: 'Delhi Police Control Room',
      category: 'Police',
      phone: '011-23490000',
      address: 'Delhi Police Headquarters',
      city: 'Delhi',
      available24x7: true
    },
    {
      serviceName: 'AIIMS Hospital Delhi',
      category: 'Hospital',
      phone: '011-26588500',
      address: 'Ansari Nagar, New Delhi',
      city: 'Delhi',
      available24x7: true
    },
    {
      serviceName: 'US Embassy Delhi',
      category: 'Embassy',
      phone: '011-24198000',
      address: 'Shantipath, Chanakyapuri, New Delhi',
      city: 'Delhi',
      available24x7: false
    },
    
    // ========== MUMBAI SPECIFIC ==========
    {
      serviceName: 'Mumbai Police Control Room',
      category: 'Police',
      phone: '022-22621855',
      address: 'Mumbai Police HQ, Crawford Market',
      city: 'Mumbai',
      available24x7: true
    },
    {
      serviceName: 'Lilavati Hospital Mumbai',
      category: 'Hospital',
      phone: '022-26567891',
      address: 'Bandra West, Mumbai',
      city: 'Mumbai',
      available24x7: true
    },
    
    // ========== BANGALORE SPECIFIC ==========
    {
      serviceName: 'Bangalore Police Control Room',
      category: 'Police',
      phone: '080-22943000',
      address: 'Police Commissioner Office',
      city: 'Bangalore',
      available24x7: true
    },
    {
      serviceName: 'Manipal Hospital Bangalore',
      category: 'Hospital',
      phone: '080-25023456',
      address: 'HAL Airport Road, Bangalore',
      city: 'Bangalore',
      available24x7: true
    },
    
    // ========== GOA SPECIFIC ==========
    {
      serviceName: 'Goa Police Headquarters',
      category: 'Police',
      phone: '0832-2421845',
      address: 'Panaji, Goa',
      city: 'Goa',
      available24x7: true
    },
    {
      serviceName: 'Goa Medical College Hospital',
      category: 'Hospital',
      phone: '0832-2458700',
      address: 'Bambolim, Goa',
      city: 'Goa',
      available24x7: true
    }
  ]);
  
  console.log(` Inserted ${emergencies.length} emergency contacts`);
  console.log(' Emergency contacts setup complete!');
  console.log('\n Summary:');
  console.log(`   - All India General: 12 contacts`);
  console.log(`   - Delhi Specific: 3 contacts`);
  console.log(`   - Mumbai Specific: 2 contacts`);
  console.log(`   - Bangalore Specific: 2 contacts`);
  console.log(`   - Goa Specific: 2 contacts`);
  console.log(`   Total: ${emergencies.length} contacts`);
  
  process.exit(0);
  
}).catch(err => {
  console.error(' Error:', err);
  process.exit(1);
});

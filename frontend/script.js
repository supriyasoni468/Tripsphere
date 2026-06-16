document.addEventListener('DOMContentLoaded', () => {

    
    let video = document.querySelector('#video-slider');
    let videoBtns = document.querySelectorAll('.vid-btn');
    
    if (video && videoBtns.length > 0) {
        videoBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const activeBtn = document.querySelector('.controls .active');
                if (activeBtn) activeBtn.classList.remove('active');
                btn.classList.add('active');
                let src = btn.getAttribute('data-src');
                video.src = src; 
                video.play();
            });
        });
    }

    
    const searchBtn = document.getElementById('search-btn');
    const loginBtn = document.getElementById('login-btn');
    const menuBtn = document.getElementById('menu-btn');
    const loginForm = document.getElementById('login-form');
    const navbar = document.getElementById('navbar');

    if (loginBtn && loginForm) {
        loginBtn.addEventListener('click', () => {
            loginForm.classList.toggle('hidden');
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('Search functionality coming soon!');
        });
    }

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('hidden');
            navbar.classList.toggle('md:flex');
        });
    }

    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;

            try {
                const tourist = await registerTourist({
                    name: email.split('@')[0],
                    email: email,
                    phone: '+91-0000000000',
                    country: 'India',
                    preferredLanguage: 'English'
                });

                alert(' Login Successful! Welcome ' + tourist.name);
                this.classList.add('hidden');
                this.reset();
                loadStatistics();

            } catch (error) {
                alert(' Login failed. Please try again.');
                console.error('Login Error:', error);
            }
        });
    }

    
    const bookingForms = document.querySelectorAll('.booking-form');
    
    bookingForms.forEach(form => {
        if (form.closest('#book')) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();

                const destination = this.querySelector('input[placeholder="Where to?"]')?.value;
                const guests = this.querySelector('input[placeholder="How many guests?"]')?.value;
                const date = this.querySelector('input[type="date"]')?.value;
                const packageType = this.querySelector('select')?.value;
                const name = this.querySelector('input[placeholder="Your name"]')?.value;
                const email = this.querySelector('input[placeholder="Your email"]')?.value;
                const message = this.querySelector('textarea')?.value || '';

                if (!destination || !guests || !date || !packageType || !name || !email) {
                    alert('Please fill all required fields!');
                    return;
                }

                const formData = {
                    destination: destination,
                    guests: guests,
                    date: date,
                    package: packageType,
                    name: name,
                    email: email,
                    phone: '+91-0000000000',
                    country: 'India',
                    message: message
                };

                try {
                    const submitBtn = this.querySelector('input[type="submit"]');
                    const originalText = submitBtn.value;
                    submitBtn.value = 'Booking...';
                    submitBtn.disabled = true;

                    const result = await submitBooking(formData);

                    alert(` Booking Successful!\n\nThank you ${name}!\nWe will contact you at ${email} soon.\n\nBooking Details:\n- Destination: ${destination}\n- Guests: ${guests}\n- Date: ${date}\n- Package: ${packageType}`);
                    
                    this.reset();
                    submitBtn.value = originalText;
                    submitBtn.disabled = false;
                    
                    loadStatistics();

                } catch (error) {
                    alert(' Error submitting booking. Please try again.');
                    console.error('Booking Error:', error);
                    
                    const submitBtn = this.querySelector('input[type="submit"]');
                    submitBtn.value = 'Book Now';
                    submitBtn.disabled = false;
                }
            });
        }
    });

    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const contactForm = contactSection.querySelector('form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();

                const name = this.querySelector('input[placeholder*="Name"]')?.value;
                const email = this.querySelector('input[type="email"]')?.value;
                const subject = this.querySelector('input[placeholder="Subject"]')?.value;
                const message = this.querySelector('textarea')?.value;

                if (!name || !email || !subject || !message) {
                    alert('Please fill all fields!');
                    return;
                }

                try {
                    const submitBtn = this.querySelector('input[type="submit"]');
                    const originalText = submitBtn.value;
                    submitBtn.value = 'Sending...';
                    submitBtn.disabled = true;

                    const tourist = await registerTourist({
                        name: name,
                        email: email,
                        phone: '+91-0000000000',
                        country: 'India',
                        preferredLanguage: 'English'
                    });

                    await createAssistanceRequest({
                        touristId: tourist._id,
                        requestType: 'Information',
                        description: `Contact Form: ${subject}\n\nMessage: ${message}`,
                        status: 'Pending',
                        priority: 'Low'
                    });

                    alert(` Message Sent Successfully!\n\nThank you ${name}!\nWe will respond at ${email} within 24 hours.`);
                    
                    this.reset();
                    submitBtn.value = originalText;
                    submitBtn.disabled = false;

                } catch (error) {
                    alert(' Error sending message. Please try again.');
                    console.error('Contact Form Error:', error);
                    
                    const submitBtn = this.querySelector('input[type="submit"]');
                    submitBtn.value = 'Send Message';
                    submitBtn.disabled = false;
                }
            });
        }
    }

    
    window.loadServices = async function(category = '') {
        try {
            const businesses = await getBusinesses(category);
            const container = document.getElementById('servicesDisplay');
            
            if (!container) return;

            if (!businesses || businesses.length === 0) {
                container.innerHTML = '<p class="col-span-full text-center text-gray-600">No services available yet. Coming soon!</p>';
                return;
            }

            const html = businesses.map(business => `
                <div class="p-8 shadow-xl rounded-xl border-t-4 border-primary-accent hover:shadow-2xl transition">
                    <i class="fas fa-store text-5xl text-primary-accent mb-4"></i>
                    <h3 class="text-2xl font-semibold mb-3 text-secondary-dark">${business.name}</h3>
                    <span class="inline-block bg-primary-accent text-white px-3 py-1 rounded-full text-sm mb-3">${business.category}</span>
                    <p class="text-gray-600 mb-3">${business.description}</p>
                    <p class="text-gray-800"><i class="fas fa-map-marker-alt text-primary-accent"></i> ${business.address}</p>
                    <p class="text-gray-800 font-bold mt-2"><i class="fas fa-phone text-primary-accent"></i> ${business.phone}</p>
                    ${business.rating ? `
                        <div class="flex items-center gap-2 mt-3">
                            <div class="flex text-yellow-500">${generateStars(business.rating)}</div>
                            <span class="text-gray-600">${business.rating}/5</span>
                        </div>
                    ` : ''}
                </div>
            `).join('');

            container.innerHTML = html;
        } catch (error) {
            console.error('Error loading services:', error);
            const container = document.getElementById('servicesDisplay');
            if (container) {
                container.innerHTML = '<p class="col-span-full text-center text-gray-600">Unable to load services. Please check your connection.</p>';
            }
        }
    };

   
    window.loadEmergency = async function(category = '') {
        try {
            const emergencies = await getEmergencyContacts(category);
            const container = document.getElementById('emergencyDisplay');
            
            if (!container) return;

            if (!emergencies || emergencies.length === 0) {
                container.innerHTML = '<p class="col-span-full text-center text-gray-600">No emergency contacts available yet. Coming soon!</p>';
                return;
            }

            const html = emergencies.map(emergency => `
                <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition">
                    <div class="flex items-center gap-3 mb-3">
                        <i class="fas fa-phone-alt text-3xl text-red-500"></i>
                        <h3 class="text-xl font-bold text-secondary-dark">${emergency.serviceName}</h3>
                    </div>
                    <p class="text-gray-600 mb-2"><strong>Category:</strong> ${emergency.category}</p>
                    <p class="text-2xl font-bold text-red-500 mb-2">
                        <a href="tel:${emergency.phone}" class="hover:underline">${emergency.phone}</a>
                    </p>
                    ${emergency.address ? `<p class="text-gray-600 mb-2"><i class="fas fa-map-marker-alt"></i> ${emergency.address}</p>` : ''}
                    <p class="text-gray-600"><strong>Location:</strong> ${emergency.city}</p>
                    ${emergency.available24x7 ? '<span class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mt-2">Available 24×7</span>' : '<span class="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mt-2">Limited Hours</span>'}
                </div>
            `).join('');

            container.innerHTML = html;
        } catch (error) {
            console.error('Error loading emergency contacts:', error);
            const container = document.getElementById('emergencyDisplay');
            if (container) {
                container.innerHTML = '<p class="col-span-full text-center text-gray-600">Unable to load emergency contacts. Please check your connection.</p>';
            }
        }
    };

    
    window.filterByCity = async function(city) {
        try {
            const emergencies = await getEmergencyContacts();
            const container = document.getElementById('emergencyDisplay');
            
            if (!container) return;

            let filtered = emergencies;
            
            if (city && city !== 'All India') {
                filtered = emergencies.filter(e => e.city === city);
            }

            if (filtered.length === 0) {
                container.innerHTML = `<p class="col-span-full text-center text-gray-600">No emergency contacts found for ${city}.</p>`;
                return;
            }

            const html = filtered.map(emergency => `
                <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition">
                    <div class="flex items-center gap-3 mb-3">
                        <i class="fas fa-phone-alt text-3xl text-red-500"></i>
                        <h3 class="text-xl font-bold text-secondary-dark">${emergency.serviceName}</h3>
                    </div>
                    <p class="text-gray-600 mb-2"><strong>Category:</strong> ${emergency.category}</p>
                    <p class="text-2xl font-bold text-red-500 mb-2">
                        <a href="tel:${emergency.phone}" class="hover:underline">${emergency.phone}</a>
                    </p>
                    ${emergency.address ? `<p class="text-gray-600 mb-2"><i class="fas fa-map-marker-alt"></i> ${emergency.address}</p>` : ''}
                    <p class="text-gray-600"><strong>Location:</strong> ${emergency.city}</p>
                    ${emergency.available24x7 ? '<span class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mt-2">Available 24×7</span>' : '<span class="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mt-2">Limited Hours</span>'}
                </div>
            `).join('');

            container.innerHTML = html;
        } catch (error) {
            console.error('Error filtering by city:', error);
        }
    };

    async function loadStatistics() {
        try {
            const [tourists, businesses, emergencies, requests] = await Promise.all([
                getTourists().catch(() => []),
                getBusinesses().catch(() => []),
                getEmergencyContacts().catch(() => []),
                getAssistanceRequests().catch(() => [])
            ]);

            const touristCount = Array.isArray(tourists) ? tourists.length : 0;
            const businessCount = Array.isArray(businesses) ? businesses.length : 0;
            const emergencyCount = Array.isArray(emergencies) ? emergencies.length : 0;
            const requestCount = Array.isArray(requests) ? requests.length : 0;

            console.log('📊 Stats loaded:', { touristCount, businessCount, emergencyCount, requestCount });

            safeSetValue('totalTourists', touristCount);
            safeSetValue('totalBookings', requestCount);
            safeSetValue('totalBusinesses', businessCount);
            safeSetValue('emergencyContacts', emergencyCount);

        } catch (error) {
            console.error('Error loading statistics:', error);
            safeSetValue('totalTourists', 0);
            safeSetValue('totalBookings', 0);
            safeSetValue('totalBusinesses', 0);
            safeSetValue('emergencyContacts', 0);
        }
    }

    function safeSetValue(id, value) {
        const element = document.getElementById(id);
        if (!element) return;
        
        if (value > 0 && value < 100) {
            animateValue(id, 0, value, 1000);
        } else {
            element.textContent = value;
        }
    }

    function animateValue(id, start, end, duration) {
        const element = document.getElementById(id);
        if (!element || end <= 0 || isNaN(end)) {
            if (element) element.textContent = 0;
            return;
        }

        if (start >= end) {
            element.textContent = end;
            return;
        }

        const range = end - start;
        const startTime = Date.now();
        
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (range * progress));
            
            element.textContent = current;
            
            if (progress >= 1) {
                element.textContent = end;
                clearInterval(timer);
            }
        }, 16);
    }

    
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        return stars;
    }

    
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                if (navbar && window.innerWidth < 768) {
                    navbar.classList.add('hidden');
                }
            }
        });
    });

  
    const packageButtons = document.querySelectorAll('.packages .box a[href="#book"]');
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const bookSection = document.getElementById('book');
            if (bookSection) {
                bookSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                const packageBox = this.closest('.box');
                const packageName = packageBox?.querySelector('h3')?.textContent;
                
                if (packageName) {
                    setTimeout(() => {
                        const selectElement = document.querySelector('#book select');
                        if (selectElement) {
                            if (packageName.includes('Goa')) {
                                selectElement.value = 'goa';
                            } else if (packageName.includes('Jaipur')) {
                                selectElement.value = 'jaipur';
                            } else if (packageName.includes('Kerala')) {
                                selectElement.value = 'kerala';
                            }
                        }
                    }, 500);
                }
            }
        });
    });

    
    console.log('🚀 TRIPsphere Website Loading...');
    
    loadServices();
    loadEmergency();
    loadStatistics();

    setInterval(loadStatistics, 30000);

    console.log('✅ All features loaded successfully');
    console.log('📡 Backend API: http://localhost:8000/api');
});

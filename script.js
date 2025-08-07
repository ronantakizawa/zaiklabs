// Modal functionality
const modal = document.getElementById('email-modal');
const waitlistBtn = document.getElementById('waitlist-btn');
const closeBtn = document.querySelector('.close');
const emailForm = document.getElementById('email-form');

// Open modal when waitlist button is clicked
waitlistBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close modal when X is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission
emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email-input').value;
    
    if (!email) {
        alert('Please enter a valid email address');
        return;
    }
    
    try {
        // Use a simple form submission approach via hidden iframe
        const timestamp = new Date().toISOString();
        
        // Create a hidden form to submit to Google Apps Script
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://script.google.com/macros/s/AKfycbxWP3u1QpBKEsxGu8WXHY_j1SVpO8K7ZmxxBG928x0s_PUKkCQB_abUqFC8z-Bl3Ec/exec';
        form.target = 'hidden_iframe';
        form.style.display = 'none';
        
        // Add email field
        const emailField = document.createElement('input');
        emailField.type = 'hidden';
        emailField.name = 'email';
        emailField.value = email;
        form.appendChild(emailField);
        
        // Add timestamp field
        const timestampField = document.createElement('input');
        timestampField.type = 'hidden';
        timestampField.name = 'timestamp';
        timestampField.value = timestamp;
        form.appendChild(timestampField);
        
        // Create hidden iframe for form submission
        let iframe = document.getElementById('hidden_iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.name = 'hidden_iframe';
            iframe.id = 'hidden_iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }
        
        // Add form to page and submit
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        
        // Show success message
        alert('Thank you for joining our waitlist! We\'ll be in touch soon.');
        document.getElementById('email-input').value = '';
        modal.style.display = 'none';
        
    } catch (error) {
        console.error('Error submitting email:', error);
        alert('Sorry, there was an error submitting your email. Please try again later.');
    }
});

// Smooth scrolling for any internal links (if added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Fade in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all main sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
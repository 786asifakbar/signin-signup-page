document.addEventListener('DOMContentLoaded', () => {
    // Form toggle functionality
    const container = document.querySelector('.container');
    const toggleForms = document.querySelectorAll('.toggle-form');
    
    toggleForms.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetForm = button.getAttribute('data-form');
            if (targetForm === 'signup') {
                container.classList.add('signup-mode');
            } else {
                container.classList.remove('signup-mode');
            }
        });
    });

    // Password visibility toggle
    const togglePassword = document.querySelectorAll('.toggle-password');
    togglePassword.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                toggle.classList.remove('fa-eye');
                toggle.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                toggle.classList.remove('fa-eye-slash');
                toggle.classList.add('fa-eye');
            }
        });
    });

    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Validate password
            if (data.password.length < 6) {
                showMessage('Password must be at least 6 characters long', 'error');
                return;
            }

            // Simulate API call
            showMessage('Processing...', 'success');
            
            // Check if it's signup form
            const isSignUp = container.classList.contains('signup-mode');
            
            // Simulate successful submission after 1.5 seconds
            setTimeout(() => {
                if (isSignUp) {
                    // Show success message for signup
                    showMessage('Account created successfully! Redirecting to signin...', 'success');
                    
                    // Wait for 1 second before redirecting to signin
                    setTimeout(() => {
                        container.classList.remove('signup-mode');
                        form.reset();
                        
                        // Show welcome message after redirect
                        setTimeout(() => {
                            showMessage('Please sign in with your new account', 'success');
                        }, 500);
                    }, 1000);
                } else {
                    // Show success message for signin
                    showMessage('Welcome back!', 'success');
                    form.reset();
                }
                
                // Here you would typically handle the response from your backend
                console.log('Form submitted:', data);
            }, 1500);
        });
    });

    // Social media authentication
    const socialButtons = document.querySelectorAll('.social');
    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = button.querySelector('i').classList[1].split('-')[1];
            showMessage(`${platform.charAt(0).toUpperCase() + platform.slice(1)} authentication coming soon!`, 'success');
        });
    });
});

// Message display function
function showMessage(text, type) {
    const messageContainer = document.getElementById('message-container');
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Remove existing messages
    while (messageContainer.firstChild) {
        messageContainer.firstChild.remove();
    }
    
    // Add new message
    messageContainer.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.classList.add('fade-out');
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 3000);
}

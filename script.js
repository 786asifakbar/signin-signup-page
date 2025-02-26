// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input');
    
    // Add validation styles to inputs
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (input.value.length > 0) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        let errorMessage = '';

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        // Password validation (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (data.password && !passwordRegex.test(data.password)) {
            isValid = false;
            errorMessage = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
        }

        if (isValid) {
            // Show success message
            showMessage('Success! Processing your request...', 'success');
            
            // Simulate API call
            setTimeout(() => {
                // In a real application, you would make an API call here
                console.log('Form submitted:', data);
                
                // Redirect to appropriate page
                const isSignUp = window.location.pathname.includes('signup');
                if (isSignUp) {
                    window.location.href = 'signin.html';
                } else {
                    // Redirect to dashboard or home page
                    showMessage('Login successful!', 'success');
                }
            }, 1500);
        } else {
            showMessage(errorMessage, 'error');
        }
    });
});

// Social media buttons handlers
document.querySelectorAll('.social-icons .icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('i').className.split('-')[2];
        showMessage(`${platform} authentication coming soon!`, 'info');
    });
});

// Message display function
function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.textContent = message;

    // Add message to DOM
    document.querySelector('.form-container').appendChild(messageElement);

    // Remove message after 3 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

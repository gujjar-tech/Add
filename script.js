// Function to display messages in the custom message box
function showMessage(message, type = 'info') {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800', 'bg-blue-100', 'text-blue-800', 'animate-pulse');

    if (type === 'success') {
        messageBox.classList.add('bg-green-100'); // Green background style for success
    } else if (type === 'error') {
        messageBox.classList.add('bg-red-100'); // Red background style for error
    } else { // info
        messageBox.classList.add('bg-blue-100'); // Blue background style for info
    }
    messageBox.classList.remove('hidden');
    messageBox.classList.add('animate-pulse'); // Add pulse animation to messages

    // Hide message after 3 seconds
    setTimeout(() => {
        messageBox.classList.add('hidden');
        messageBox.classList.remove('animate-pulse');
    }, 3000);
}

// Function to handle form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // --- Specific Login Credentials ---
    const correctUsername = "gautamgujjar565657@gmail.com";
    const correctPassword = "Gautam5757";
    // --- End Specific Login Credentials ---

    if (username === correctUsername && password === correctPassword) {
        showMessage('Login successful! Redirecting to gallery...', 'success');
        console.log('Login successful for:', username);
        // Redirect to page2.html after a short delay
        setTimeout(() => {
            // Create a temporary anchor element and click it for more robust navigation
            const link = document.createElement('a');
            link.href = 'page2.html'; // Relative path
            link.style.display = 'none'; // Hide the link
            document.body.appendChild(link); // Append to body
            link.click(); // Simulate a click
            document.body.removeChild(link); // Clean up
        }, 1500); // Redirect after 1.5 seconds to show the message
    } else {
        showMessage('Invalid username or password. Please try again.', 'error');
        console.log('Login failed for:', username);
    }
}

// --- Pop-up Modal Functions ---
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');

// Function to open the modal
function openModal(event) {
    event.preventDefault(); // Prevent default link behavior (e.g., scrolling to top)
    forgotPasswordModal.classList.add('show');
}

// Function to close the modal
function closeModal() {
    forgotPasswordModal.classList.remove('show');
}

// Attach event listener to the "Forgot Password?" link
forgotPasswordLink.addEventListener('click', openModal);

// Close modal if user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === forgotPasswordModal) {
        closeModal();
    }
});
// --- End Pop-up Modal Functions ---

// Ensure the login card fades in and bounces when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const loginCard = document.querySelector('.login-card');
    // The animation properties are set via CSS keyframes (fadeInBounce)
    // No need to manually set style.opacity or transform here as animation handles it
});

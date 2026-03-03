const notificationContainer = document.getElementById('notification-container');

function showNotification(message) {
    // Clear previous notifications
    notificationContainer.innerHTML = '';
    
    const card = document.createElement('div');
    card.className = 'notification';
    card.style.display = 'block';
    card.innerHTML = message;
    
    notificationContainer.appendChild(card);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        card.style.animation = 'slideDown 0.5s ease reverse forwards';
        setTimeout(() => card.remove(), 500);
    }, 5000);
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const emailInput = document.getElementById('email').value;
    const passInput = document.getElementById('password').value;
    const loginBtn = document.querySelector('.login-btn');

    loginBtn.innerText = "Verifying...";
    loginBtn.disabled = true;

    fetch('clients.json')
        .then(response => {
            if (!response.ok) throw new Error("SERVER_DOWN");
            return response.json();
        })
        .then(clients => {
            const userExists = clients.find(u => u.email === emailInput);
            
            if (!userExists) {
                showNotification(`<span class="error-title">Account Not Found</span>Dear user, please note that the specific details you have entered do not exist in our system. Please check for typos on the email then try again.`);
            } else if (userExists.password !== passInput) {
                showNotification(`<span class="error-title">Invalid Password</span>Dear user, the particular password you have entered for the account is invalid. Please check and try again.`);
            } else {
                // Success Scenario
                showNotification(`<span class="success-title">Login Successful</span>Welcome back! Redirecting you to your dashboard...`);
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                return;
            }

            loginBtn.innerText = "Login";
            loginBtn.disabled = false;
        })
        .catch(error => {
            console.error(error);
            showNotification(`<span class="error-title">Server Down</span>Please recheck in a bit while our technical team fixes issues.`);
            loginBtn.innerText = "Login";
            loginBtn.disabled = false;
        });
});

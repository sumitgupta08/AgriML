// Authentication UI — Login & Sign Up with localStorage persistence

const AUTH_KEY = 'agriml_auth';
const USERS_KEY = 'agriml_users';

export function isLoggedIn() {
    try {
        const session = JSON.parse(localStorage.getItem(AUTH_KEY));
        return session && session.loggedIn;
    } catch { return false; }
}

export function getCurrentUser() {
    try {
        const session = JSON.parse(localStorage.getItem(AUTH_KEY));
        return session?.user || null;
    } catch { return null; }
}

export function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.reload();
}

function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch { return {}; }
}

function saveUser(email, name, password) {
    const users = getUsers();
    users[email.toLowerCase()] = { name, email: email.toLowerCase(), password, createdAt: Date.now() };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loginUser(email, name) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ loggedIn: true, user: { email, name }, loginAt: Date.now() }));
}

export function renderAuthPage(container, onSuccess, onBackHome) {
    container.innerHTML = `
    <div class="auth-page">
      <!-- Animated Background -->
      <div class="auth-bg">
        <div class="auth-particle p1">🌾</div>
        <div class="auth-particle p2">🌱</div>
        <div class="auth-particle p3">🌿</div>
        <div class="auth-particle p4">🍃</div>
        <div class="auth-particle p5">🌾</div>
        <div class="auth-particle p6">☘️</div>
        <div class="auth-particle p7">🌿</div>
        <div class="auth-particle p8">🍀</div>
      </div>

      <div class="auth-card">
        <div class="auth-logo">
          <span class="auth-logo-icon">🌾</span>
          <div class="auth-logo-text">AgriML</div>
          <div class="auth-logo-sub">Intelligent Agricultural Decision Support</div>
        </div>
        <a href="#" class="auth-back-link" id="auth-back-home">← Back to Home</a>

        <!-- Tab Toggle -->
        <div class="auth-tabs">
          <button class="auth-tab active" id="tab-login" data-tab="login">Login</button>
          <button class="auth-tab" id="tab-signup" data-tab="signup">Sign Up</button>
        </div>

        <!-- Login Form -->
        <form class="auth-form active" id="form-login" autocomplete="off">
          <div class="auth-field">
            <label class="auth-label" for="login-email">Email Address</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">📧</span>
              <input type="email" class="auth-input" id="login-email" placeholder="you@farm.com" required>
            </div>
          </div>
          <div class="auth-field">
            <label class="auth-label" for="login-password">Password</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">🔒</span>
              <input type="password" class="auth-input" id="login-password" placeholder="Enter password" required>
              <button type="button" class="auth-eye" id="toggle-login-pw">👁️</button>
            </div>
          </div>
          <div id="login-error" class="auth-error"></div>
          <button type="submit" class="auth-submit">Login to Dashboard</button>
          <p class="auth-switch">Don't have an account? <a href="#" id="switch-to-signup">Sign up</a></p>
        </form>

        <!-- Signup Form -->
        <form class="auth-form" id="form-signup" autocomplete="off">
          <div class="auth-field">
            <label class="auth-label" for="signup-name">Full Name</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">👤</span>
              <input type="text" class="auth-input" id="signup-name" placeholder="Your name" required>
            </div>
          </div>
          <div class="auth-field">
            <label class="auth-label" for="signup-email">Email Address</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">📧</span>
              <input type="email" class="auth-input" id="signup-email" placeholder="you@farm.com" required>
            </div>
          </div>
          <div class="auth-field">
            <label class="auth-label" for="signup-password">Password</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">🔒</span>
              <input type="password" class="auth-input" id="signup-password" placeholder="Min 6 characters" required minlength="6">
              <button type="button" class="auth-eye" id="toggle-signup-pw">👁️</button>
            </div>
          </div>
          <div class="auth-field">
            <label class="auth-label" for="signup-confirm">Confirm Password</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">🔒</span>
              <input type="password" class="auth-input" id="signup-confirm" placeholder="Re-enter password" required minlength="6">
            </div>
          </div>
          <div id="signup-error" class="auth-error"></div>
          <button type="submit" class="auth-submit">Create Account</button>
          <p class="auth-switch">Already have an account? <a href="#" id="switch-to-login">Login</a></p>
        </form>
      </div>

      <div class="auth-footer">
        <span>Powered by Machine Learning</span> · <span>Built for Farmers</span>
      </div>
    </div>
  `;

    wireAuth(container, onSuccess, onBackHome);
}

function wireAuth(container, onSuccess, onBackHome) {
    const loginTab = container.querySelector('#tab-login');
    const signupTab = container.querySelector('#tab-signup');
    const loginForm = container.querySelector('#form-login');
    const signupForm = container.querySelector('#form-signup');

    function showLogin() {
        loginTab.classList.add('active'); signupTab.classList.remove('active');
        loginForm.classList.add('active'); signupForm.classList.remove('active');
    }

    function showSignup() {
        signupTab.classList.add('active'); loginTab.classList.remove('active');
        signupForm.classList.add('active'); loginForm.classList.remove('active');
    }

    loginTab.addEventListener('click', showLogin);
    signupTab.addEventListener('click', showSignup);
    container.querySelector('#switch-to-signup')?.addEventListener('click', (e) => { e.preventDefault(); showSignup(); });
    container.querySelector('#switch-to-login')?.addEventListener('click', (e) => { e.preventDefault(); showLogin(); });

    // Back to home
    const backBtn = container.querySelector('#auth-back-home');
    if (backBtn && onBackHome) {
      backBtn.addEventListener('click', (e) => { e.preventDefault(); onBackHome(); });
    }

    // Password toggles
    container.querySelector('#toggle-login-pw')?.addEventListener('click', () => {
        const inp = container.querySelector('#login-password');
        inp.type = inp.type === 'password' ? 'text' : 'password';
    });
    container.querySelector('#toggle-signup-pw')?.addEventListener('click', () => {
        const inp = container.querySelector('#signup-password');
        inp.type = inp.type === 'password' ? 'text' : 'password';
    });

    // Login submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = container.querySelector('#login-email').value.trim();
        const password = container.querySelector('#login-password').value;
        const errEl = container.querySelector('#login-error');

        const users = getUsers();
        const user = users[email.toLowerCase()];

        if (!user) {
            errEl.textContent = 'No account found with this email. Please sign up.';
            errEl.classList.add('show');
            return;
        }
        if (user.password !== password) {
            errEl.textContent = 'Incorrect password. Please try again.';
            errEl.classList.add('show');
            return;
        }

        errEl.classList.remove('show');
        loginUser(user.email, user.name);

        // Success animation
        const card = container.querySelector('.auth-card');
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0';
        setTimeout(() => onSuccess(), 400);
    });

    // Signup submit
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = container.querySelector('#signup-name').value.trim();
        const email = container.querySelector('#signup-email').value.trim();
        const password = container.querySelector('#signup-password').value;
        const confirm = container.querySelector('#signup-confirm').value;
        const errEl = container.querySelector('#signup-error');

        if (password !== confirm) {
            errEl.textContent = 'Passwords do not match.';
            errEl.classList.add('show');
            return;
        }
        if (password.length < 6) {
            errEl.textContent = 'Password must be at least 6 characters.';
            errEl.classList.add('show');
            return;
        }

        const users = getUsers();
        if (users[email.toLowerCase()]) {
            errEl.textContent = 'An account with this email already exists.';
            errEl.classList.add('show');
            return;
        }

        errEl.classList.remove('show');
        saveUser(email, name, password);
        loginUser(email.toLowerCase(), name);

        // Success animation
        const card = container.querySelector('.auth-card');
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0';
        setTimeout(() => onSuccess(), 400);
    });
}

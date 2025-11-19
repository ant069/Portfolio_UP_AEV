# Express Authentication Setup - Instructions

## ✅ Completed Implementation

This project now includes all the required features from the README:

### Features Implemented:
1. ✅ **User Registration** - Form with username, email, and password
2. ✅ **Passport-Local-Mongoose** - User authentication and session management
3. ✅ **Login System** - Users can login with username and password
4. ✅ **Logout Method** - Users can logout and end their session
5. ✅ **Protected Routes** - Cannot access `/secrets` without authentication
6. ✅ **Environment Variables** - Session secret stored in `.env` file
7. ✅ **Google OAuth 2.0** - Social login with Google
8. ✅ **Cookie Parser** - Session cookies are set and validated
9. ✅ **Secret Submission** (Extra) - Users can submit and view secrets

---

## 🚀 Setup Instructions

### 1. Install Dependencies
All packages have already been installed:
- express
- mongoose
- passport
- passport-local
- passport-local-mongoose
- passport-google-oauth20
- express-session
- cookie-parser
- dotenv
- ejs
- mongoose-findorcreate

### 2. Configure Environment Variables

Open the `.env` file and update the following:

```env
# Change this to a random, secure string
SESSION_SECRET=your_super_secret_session_key_here_change_this

# Get these from Google Cloud Console
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 3. Setup Google OAuth 2.0

To enable Google authentication:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to: **APIs & Services > Credentials**
4. Configure **OAuth Consent Screen**:
   - User Type: External (or Internal for workspace)
   - App name: Your app name
   - User support email: Your email
   - Developer contact: Your email
   - Scopes: `email`, `profile`, `openid`

5. Create **OAuth 2.0 Client ID**:
   - Application type: Web application
   - Name: LOTR Authentication
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/auth/google/secrets`

6. Copy the **Client ID** and **Client Secret** to your `.env` file

### 4. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# Windows - If MongoDB is installed as a service, it should already be running
# Or start it manually with:
mongod
```

### 5. Run the Application

```bash
npm start
```

Or for development with auto-restart:
```bash
npm install -g nodemon
nodemon server.js
```

The server will start on: **http://localhost:3000**

---

## 🧪 Testing the Application

### Test Local Authentication:
1. Go to `http://localhost:3000`
2. Click **Register**
3. Create an account with username, email, and password
4. You'll be automatically logged in and redirected to `/secrets`
5. Try logging out and logging back in
6. Try accessing `/secrets` directly (should redirect to login)

### Test Google OAuth:
1. Click **Sign in with Google** on login or register page
2. Authorize with your Google account
3. You'll be redirected to the secrets page

### Test Secret Submission:
1. After logging in, click **Submit a Secret**
2. Enter your secret and submit
3. View all secrets on the secrets page

### Test Cookie Functionality:
1. Open Chrome DevTools (F12)
2. Go to **Application > Cookies > http://localhost:3000**
3. Look for `connect.sid` cookie - this is your session
4. When you logout, the session is destroyed

### Test Protected Routes:
1. Open a new incognito/private window
2. Try to access `http://localhost:3000/secrets` directly
3. You should be redirected to `/login`

---

## 📁 Project Structure

```
13-ExpressAuthentication/
├── server.js              # Main application file with all routes
├── .env                   # Environment variables (SECRET KEYS)
├── .gitignore            # Git ignore file
├── package.json          # Dependencies
├── README.md             # Original requirements
├── SETUP.md              # This file
├── RESUMEN.md            # Spanish summary
├── public/
│   ├── css/
│   │   └── style.css
│   ├── html/
│   │   ├── index.html    # Updated home page
│   │   └── secret.html
│   └── images/
└── views/                # EJS templates
    ├── register.ejs      # Registration form
    ├── login.ejs         # Login form
    ├── secrets.ejs       # Protected secrets page
    └── submit.ejs        # Secret submission form
```

---

## 🔒 Security Features

1. **Password Hashing** - Passwords are hashed using passport-local-mongoose
2. **Session Management** - Express sessions with secure cookies
3. **Environment Variables** - Sensitive data stored in .env
4. **Authentication Middleware** - Routes protected with `isAuthenticated()`
5. **OAuth 2.0** - Secure third-party authentication with Google

---

## 📝 Routes

### Public Routes:
- `GET /` - Home page
- `GET /register` - Registration form
- `GET /login` - Login form
- `POST /register` - Handle registration
- `POST /login` - Handle login

### Protected Routes (require authentication):
- `GET /secrets` - View all secrets
- `GET /submit` - Secret submission form
- `POST /submit` - Handle secret submission
- `GET /logout` - Logout user

### OAuth Routes:
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/secrets` - Google OAuth callback

---

## 🐛 Troubleshooting

**Issue**: Cannot connect to MongoDB
- **Solution**: Make sure MongoDB is running on `mongodb://127.0.0.1:27017/`

**Issue**: Google OAuth not working
- **Solution**: Check that redirect URI in Google Console matches exactly: `http://localhost:3000/auth/google/secrets`

**Issue**: Session not persisting
- **Solution**: Check that `SESSION_SECRET` is set in `.env` file

**Issue**: "User already exists" error
- **Solution**: Use a different username or clear the database

---

## 🎉 All Requirements Completed!

✅ Registration form with username, email, password
✅ Passport-local-mongoose for authentication
✅ Session management with automatic access to secrets
✅ Login form for existing users
✅ Logout functionality
✅ Protected routes (cannot access directly)
✅ Environment variables for secrets
✅ Google OAuth 2.0 implementation
✅ Cookie parser with session cookies
✅ Extra feature: Secret submission and viewing

The application is ready to use!

# Local Mate - Pickup & Drop Service

A production-ready mobile ride-sharing application built with React Native (Expo) and Node.js.

## Tech Stack

### Frontend
- React Native with Expo
- TypeScript
- React Navigation
- Redux Toolkit (State Management)
- React Query (Data Fetching)
- React Native Maps (Google Maps)
- Stripe (Payments)

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL with Prisma ORM
- Socket.io (Real-time updates)
- JWT Authentication
- Stripe Integration

## Features

### User Roles
- **Passenger**: Book rides, track drivers, view history
- **Driver**: Accept rides, navigate, manage earnings

### Core Features
- Email + Phone authentication with OTP
- Real-time ride booking and matching
- Live driver tracking on map
- Dynamic fare calculation with surge pricing
- Stripe payment integration
- Push notifications (FCM ready)
- Trip history and ratings
- Admin dashboard

## Quick Start

### Prerequisites
- Node.js 18+
- Yarn or npm
- Docker & Docker Compose
- Expo CLI (`npm install -g expo-cli`)
- PostgreSQL (or use Docker)

### Environment Setup

1. **Clone and install dependencies**
```bash
# Install root dependencies
yarn install

# Install backend dependencies
cd backend
yarn install

# Install mobile dependencies
cd ../mobile
yarn install
```

2. **Setup environment variables**

Copy `.env.example` files:
```bash
# Root
cp .env.example .env

# Backend
cp backend/.env.example backend/.env

# Mobile
cp mobile/.env.example mobile/.env
```

Edit the `.env` files with your configuration (see Environment Variables section below).

3. **Start PostgreSQL with Docker**
```bash
docker-compose up -d
```

4. **Run database migrations and seed**
```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

This creates:
- Passenger account: `passenger@test.com` / `password123`
- Driver account: `driver@test.com` / `password123`

5. **Start the backend**
```bash
cd backend
yarn dev
```

Backend runs on `http://localhost:4000`

6. **Start the mobile app**
```bash
cd mobile
yarn start
```

Press `i` for iOS simulator or `a` for Android emulator.

### Running Tests
```bash
# Backend tests
cd backend
yarn test

# Mobile tests
cd mobile
yarn test
```

### Build for Production
```bash
# Backend
cd backend
yarn build

# Mobile (EAS Build recommended for production)
cd mobile
eas build --platform ios
eas build --platform android
```

## Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/localmate

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Server
PORT=4000
NODE_ENV=development

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Google Maps
GOOGLE_MAPS_API_KEY=AIzaSyYourGoogleMapsAPIKey

# Firebase (for push notifications)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Surge Pricing
SURGE_MULTIPLIER_MAX=3.0
BASE_FARE=3.00
PER_KM_RATE=1.50
PER_MINUTE_RATE=0.30
```

### Mobile (.env)
```env
API_BASE_URL=http://localhost:4000
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
GOOGLE_MAPS_API_KEY=AIzaSyYourGoogleMapsAPIKey
```

## Project Structure
```
/local-mate
├── backend/          # Node.js backend API
├── mobile/          # React Native mobile app
├── .github/         # GitHub Actions CI/CD
└── docker-compose.yml
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-phone` - Verify phone with OTP
- `POST /api/auth/refresh` - Refresh access token

### Trip Endpoints

- `POST /api/trips` - Create new trip
- `GET /api/trips/:id` - Get trip details
- `PATCH /api/trips/:id/status` - Update trip status
- `POST /api/trips/:id/cancel` - Cancel trip
- `POST /api/trips/:id/rate` - Rate completed trip

### Driver Endpoints

- `PATCH /api/driver/status` - Toggle online/offline
- `POST /api/driver/accept/:tripId` - Accept trip
- `GET /api/driver/earnings` - View earnings

### Admin Endpoints

- `GET /api/admin/trips` - List all trips
- `GET /api/admin/users` - List all users
- `GET /api/admin/drivers` - List all drivers

## WebSocket Events

### Client -> Server
- `driver:location` - Driver sends location update
- `trip:status` - Status update

### Server -> Client
- `trip:matched` - Trip matched with driver
- `trip:updated` - Trip status changed
- `driver:location` - Driver location update

## Testing Accounts

After running seed:

**Passenger**
- Email: `passenger@test.com`
- Password: `password123`

**Driver**
- Email: `driver@test.com`
- Password: `password123`

## Development Tips

1. **Local Development**: Use ngrok or similar to expose localhost for mobile device testing
2. **Google Maps**: Enable Maps SDK for Android/iOS in Google Cloud Console
3. **Stripe Testing**: Use test cards from Stripe documentation
4. **Push Notifications**: Configure FCM in Firebase Console

## Troubleshooting

### Database Connection Issues
```bash
docker-compose down
docker-compose up -d
```

### Prisma Issues
```bash
cd backend
npx prisma generate
npx prisma migrate reset
```

### Metro Bundler Cache Issues
```bash
cd mobile
yarn start --clear
```

## License

MIT

## Support

For issues and questions, please open a GitHub issue.
import { PrismaClient, UserRole, DriverStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Passenger User
  const passengerUser = await prisma.user.upsert({
    where: { email: 'passenger@test.com' },
    update: {},
    create: {
      email: 'passenger@test.com',
      password: hashedPassword,
      phoneNumber: '+1234567890',
      phoneVerified: true,
      role: UserRole.PASSENGER,
      firstName: 'John',
      lastName: 'Doe',
    },
  });

  // Create Passenger Profile
  await prisma.passenger.upsert({
    where: { userId: passengerUser.id },
    update: {},
    create: {
      userId: passengerUser.id,
      rating: 4.8,
      totalTrips: 0,
    },
  });

  console.log('✅ Created passenger: passenger@test.com / password123');

  // Create Driver User
  const driverUser = await prisma.user.upsert({
    where: { email: 'driver@test.com' },
    update: {},
    create: {
      email: 'driver@test.com',
      password: hashedPassword,
      phoneNumber: '+1234567891',
      phoneVerified: true,
      role: UserRole.DRIVER,
      firstName: 'Jane',
      lastName: 'Smith',
    },
  });

  // Create Driver Profile
  await prisma.driver.upsert({
    where: { userId: driverUser.id },
    update: {},
    create: {
      userId: driverUser.id,
      status: DriverStatus.OFFLINE,
      vehicleModel: 'Toyota Camry',
      vehicleColor: 'Black',
      vehiclePlate: 'ABC123',
      licenseNumber: 'DL123456',
      rating: 4.9,
      totalTrips: 0,
      currentLatitude: 28.7041,
      currentLongitude: 77.1025,
      isApproved: true,
    },
  });

  console
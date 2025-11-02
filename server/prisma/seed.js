const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@wilopocargo.com' },
    update: {},
    create: {
      email: 'admin@wilopocargo.com',
      passwordHash: adminPassword,
      fullName: 'Admin User',
      companyName: 'Wilopo Cargo',
      phone: '+62 811 1111 1111',
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@wilopocargo.com' },
    update: {},
    create: {
      email: 'demo@wilopocargo.com',
      passwordHash: hashedPassword,
      fullName: 'Demo User',
      companyName: 'Demo Trading Company',
      phone: '+62 812 3456 7890',
      role: 'USER',
    },
  });

  console.log('✅ Created demo user:', user.email);

  // Create sample shipments
  const shipment1 = await prisma.shipment.create({
    data: {
      userId: user.id,
      trackingNumber: 'WC-20251030-12345',
      origin: 'Shanghai, China',
      destination: 'Jakarta, Indonesia',
      status: 'IN_TRANSIT',
      weight: 150.5,
      volume: 2.3,
      estimatedCost: 2850.75,
      estimatedArrival: new Date('2025-11-15'),
      senderName: 'Shanghai Supplier Co.',
      senderAddress: '123 Huangpu Road, Shanghai',
      receiverName: 'PT Demo Indonesia',
      receiverAddress: 'Jl. Sudirman No. 123, Jakarta',
      receiverPhone: '+62 21 1234 5678',
      statusHistory: {
        create: [
          {
            status: 'PICKED_UP',
            description: 'Package picked up from warehouse',
            location: 'Shanghai, China',
            timestamp: new Date('2025-10-25'),
          },
          {
            status: 'IN_WAREHOUSE',
            description: 'Arrived at Shanghai port warehouse',
            location: 'Shanghai Port',
            timestamp: new Date('2025-10-26'),
          },
          {
            status: 'IN_TRANSIT',
            description: 'Shipped via ocean freight',
            location: 'Pacific Ocean',
            timestamp: new Date('2025-10-28'),
          },
        ],
      },
    },
  });

  const shipment2 = await prisma.shipment.create({
    data: {
      userId: user.id,
      trackingNumber: 'WC-20251015-54321',
      origin: 'Guangzhou, China',
      destination: 'Surabaya, Indonesia',
      status: 'DELIVERED',
      weight: 85.0,
      volume: 1.5,
      estimatedCost: 1750.50,
      senderName: 'Guangzhou Electronics Ltd.',
      senderAddress: '456 Tianhe District, Guangzhou',
      receiverName: 'CV. Maju Jaya',
      receiverAddress: 'Jl. Pahlawan No. 45, Surabaya',
      receiverPhone: '+62 31 9876 5432',
      statusHistory: {
        create: [
          {
            status: 'PICKED_UP',
            description: 'Package picked up',
            location: 'Guangzhou, China',
            timestamp: new Date('2025-10-01'),
          },
          {
            status: 'IN_WAREHOUSE',
            description: 'Processing at warehouse',
            location: 'Guangzhou Port',
            timestamp: new Date('2025-10-02'),
          },
          {
            status: 'IN_TRANSIT',
            description: 'Shipped via ocean freight',
            location: 'South China Sea',
            timestamp: new Date('2025-10-04'),
          },
          {
            status: 'AT_PORT',
            description: 'Arrived at destination port',
            location: 'Tanjung Perak Port',
            timestamp: new Date('2025-10-12'),
          },
          {
            status: 'CUSTOMS_CLEARANCE',
            description: 'Undergoing customs clearance',
            location: 'Surabaya Customs',
            timestamp: new Date('2025-10-13'),
          },
          {
            status: 'OUT_FOR_DELIVERY',
            description: 'Out for final delivery',
            location: 'Surabaya',
            timestamp: new Date('2025-10-14'),
          },
          {
            status: 'DELIVERED',
            description: 'Successfully delivered to recipient',
            location: 'Surabaya',
            timestamp: new Date('2025-10-15'),
          },
        ],
      },
    },
  });

  const shipment3 = await prisma.shipment.create({
    data: {
      userId: user.id,
      trackingNumber: 'WC-20251020-67890',
      origin: 'Shenzhen, China',
      destination: 'Bandung, Indonesia',
      status: 'AT_PORT',
      weight: 200.0,
      volume: 3.5,
      estimatedCost: 3250.00,
      estimatedArrival: new Date('2025-11-05'),
      senderName: 'Shenzhen Tech Manufacturing',
      senderAddress: '789 Nanshan District, Shenzhen',
      receiverName: 'PT. Teknologi Bandung',
      receiverAddress: 'Jl. Asia Afrika No. 89, Bandung',
      receiverPhone: '+62 22 5555 6666',
      statusHistory: {
        create: [
          {
            status: 'PICKED_UP',
            description: 'Package collected from factory',
            location: 'Shenzhen, China',
            timestamp: new Date('2025-10-18'),
          },
          {
            status: 'IN_WAREHOUSE',
            description: 'Quality check completed',
            location: 'Shenzhen Logistics Center',
            timestamp: new Date('2025-10-19'),
          },
          {
            status: 'IN_TRANSIT',
            description: 'Ocean freight to Indonesia',
            location: 'South China Sea',
            timestamp: new Date('2025-10-21'),
          },
          {
            status: 'AT_PORT',
            description: 'Arrived at Jakarta port',
            location: 'Tanjung Priok Port',
            timestamp: new Date('2025-10-29'),
          },
        ],
      },
    },
  });

  console.log('✅ Created sample shipments:', [
    shipment1.trackingNumber,
    shipment2.trackingNumber,
    shipment3.trackingNumber,
  ]);

  console.log('\n📦 Seed completed successfully!');
  console.log('\n🔐 Login Credentials:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👑 Admin User:');
  console.log('   Email: admin@wilopocargo.com');
  console.log('   Password: admin123');
  console.log('\n👤 Demo User:');
  console.log('   Email: demo@wilopocargo.com');
  console.log('   Password: password123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

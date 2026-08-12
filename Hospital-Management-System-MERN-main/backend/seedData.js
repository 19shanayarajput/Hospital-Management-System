const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');

const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Admin = require('./models/Admin');
const Appointment = require('./models/Appointment');
const Prescription = require('./models/Prescription');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://shanaya:gungun%401911@token-generate.zahrl4l.mongodb.net/hospital?retryWrites=true&w=majority&appName=token-generate';

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB successfully.');

    // Clear existing collections
    console.log('Clearing existing test data...');
    await Promise.all([
      User.deleteMany({}),
      Doctor.deleteMany({}),
      Admin.deleteMany({}),
      Appointment.deleteMany({}),
      Prescription.deleteMany({})
    ]);

    // 1. Create Admins
    console.log('Creating Admin users...');
    const admin = new Admin({
      firstName: 'Vikram',
      lastName: 'Malhotra',
      email: 'admin@hospital.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();

    // 2. Create Doctors
    console.log('Creating Doctor profiles...');
    const doctors = [
      new Doctor({
        firstName: 'Rajesh',
        lastName: 'Sharma',
        email: 'doctor.sharma@hospital.com',
        password: 'doctor123',
        specialty: 'Cardiology',
        licenseNumber: 'LIC-CARD-101',
        phoneNumber: '9876543210',
        role: 'doctor'
      }),
      new Doctor({
        firstName: 'Ananya',
        lastName: 'Patel',
        email: 'doctor.patel@hospital.com',
        password: 'doctor123',
        specialty: 'Neurology',
        licenseNumber: 'LIC-NEUR-202',
        phoneNumber: '9876543211',
        role: 'doctor'
      }),
      new Doctor({
        firstName: 'Suresh',
        lastName: 'Verma',
        email: 'doctor.verma@hospital.com',
        password: 'doctor123',
        specialty: 'Orthopedics',
        licenseNumber: 'LIC-ORTH-303',
        phoneNumber: '9876543212',
        role: 'doctor'
      }),
      new Doctor({
        firstName: 'Priya',
        lastName: 'Gupta',
        email: 'doctor.gupta@hospital.com',
        password: 'doctor123',
        specialty: 'Pediatrics',
        licenseNumber: 'LIC-PEDI-404',
        phoneNumber: '9876543213',
        role: 'doctor'
      })
    ];
    for (const doc of doctors) {
      await doc.save();
    }

    // 3. Create Patients
    console.log('Creating Patient accounts...');
    const patients = [
      new User({
        firstName: 'Rahul',
        lastName: 'Verma',
        email: 'patient.rahul@gmail.com',
        password: 'patient123',
        role: 'patient'
      }),
      new User({
        firstName: 'Sneha',
        lastName: 'Kapoor',
        email: 'patient.sneha@gmail.com',
        password: 'patient123',
        role: 'patient'
      }),
      new User({
        firstName: 'Amit',
        lastName: 'Patel',
        email: 'patient.amit@gmail.com',
        password: 'patient123',
        role: 'patient'
      })
    ];
    for (const p of patients) {
      await p.save();
    }

    // 4. Create Appointments
    console.log('Creating sample Appointments...');
    const appointments = [
      new Appointment({
        patientId: patients[0]._id, // Shanaya
        doctorId: doctors[0]._id,  // Dr. Rajesh Sharma
        date: new Date(Date.now() + 86400000), // Tomorrow
        time: '10:00 AM',
        reason: 'Routine Health Checkup & Blood Pressure Consultation',
        status: 'scheduled'
      }),
      new Appointment({
        patientId: patients[1]._id, // Rahul
        doctorId: doctors[1]._id,  // Dr. Ananya Patel
        date: new Date(Date.now() + 172800000), // In 2 days
        time: '02:30 PM',
        reason: 'Migraine & Chronic Headache assessment',
        status: 'scheduled'
      }),
      new Appointment({
        patientId: patients[2]._id, // Sneha
        doctorId: doctors[2]._id,  // Dr. Suresh Verma
        date: new Date(Date.now() - 86400000), // Yesterday
        time: '11:15 AM',
        reason: 'Knee Joint Pain follow-up',
        status: 'completed'
      })
    ];
    for (const apt of appointments) {
      await apt.save();
    }

    // 5. Create Prescriptions
    console.log('Creating sample Prescriptions...');
    const prescriptions = [
      new Prescription({
        patientId: patients[2]._id, // Sneha
        doctorId: doctors[2]._id,  // Dr. Suresh Verma
        medication: 'Glucosamine & Chondroitin 500mg',
        dosage: '1 tablet twice daily',
        frequency: 'After meals for 30 days'
      }),
      new Prescription({
        patientId: patients[0]._id, // Shanaya
        doctorId: doctors[0]._id,  // Dr. Rajesh Sharma
        medication: 'Vitamin D3 60,000 IU',
        dosage: '1 capsule weekly',
        frequency: 'Every Sunday with milk for 8 weeks'
      })
    ];
    for (const pr of prescriptions) {
      await pr.save();
    }

    console.log('\n=============================================');
    console.log('🎉 DUMMY DATASET SEEDED SUCCESSFULLY! 🎉');
    console.log('=============================================');
    console.log('📋 CREATED ACCOUNTS FOR TESTING:\n');
    console.log('🔑 ADMIN:');
    console.log('   Email:    admin@hospital.com');
    console.log('   Password: admin123');
    console.log('   Role:     Admin\n');

    console.log('🩺 DOCTORS:');
    console.log('   1. Dr. Rajesh Sharma  (Cardiology) -> doctor.sharma@hospital.com / doctor123');
    console.log('   2. Dr. Ananya Patel   (Neurology)  -> doctor.patel@hospital.com / doctor123');
    console.log('   3. Dr. Suresh Verma   (Orthopedics)-> doctor.verma@hospital.com / doctor123');
    console.log('   4. Dr. Priya Gupta    (Pediatrics) -> doctor.gupta@hospital.com / doctor123\n');

    console.log('👤 PATIENTS:');
    console.log('   1. Rahul Verma    -> patient.rahul@gmail.com / patient123');
    console.log('   2. Sneha Kapoor   -> patient.sneha@gmail.com / patient123');
    console.log('   3. Amit Patel     -> patient.amit@gmail.com / patient123\n');

    console.log(`📅 Appointments created: ${appointments.length}`);
    console.log(`💊 Prescriptions created: ${prescriptions.length}`);
    console.log('=============================================\n');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

seed();

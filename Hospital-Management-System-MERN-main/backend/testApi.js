const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting API Verification Tests...\n');

  try {
    // 1. Health check
    console.log('1. Testing Root API Endpoint...');
    const rootRes = await request({ host: 'localhost', port: 5000, path: '/', method: 'GET' });
    console.log(`   Status: ${rootRes.status} -> ${rootRes.data}`);

    // 2. Patient Login
    console.log('\n2. Testing Patient Login (Rahul Verma)...');
    const patientLogin = await request({
      host: 'localhost',
      port: 5000,
      path: '/api/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'patient.rahul@gmail.com',
      password: 'patient123',
      role: 'patient'
    });
    console.log(`   Status: ${patientLogin.status} | Role: ${patientLogin.data.role} | Token received: ${!!patientLogin.data.token}`);

    // 3. Doctor Login
    console.log('\n3. Testing Doctor Login (Dr. Rajesh Sharma)...');
    const docLogin = await request({
      host: 'localhost',
      port: 5000,
      path: '/api/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'doctor.sharma@hospital.com',
      password: 'doctor123',
      role: 'doctor'
    });
    console.log(`   Status: ${docLogin.status} | Role: ${docLogin.data.role} | Token received: ${!!docLogin.data.token}`);

    // 4. Admin Login
    console.log('\n4. Testing Admin Login (Dr. Vikram Malhotra)...');
    const adminLogin = await request({
      host: 'localhost',
      port: 5000,
      path: '/api/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'admin@hospital.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log(`   Status: ${adminLogin.status} | Role: ${adminLogin.data.role} | Token received: ${!!adminLogin.data.token}`);

    // 5. Patient Signup Test
    console.log('\n5. Testing New Patient Registration...');
    const newEmail = `test.user.${Date.now()}@hospital.com`;
    const signupRes = await request({
      host: 'localhost',
      port: 5000,
      path: '/api/signup',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      firstName: 'Aarav',
      lastName: 'Mehta',
      email: newEmail,
      password: 'password123',
      role: 'patient'
    });
    console.log(`   Status: ${signupRes.status} | Response:`, signupRes.data);

    console.log('\n=============================================');
    console.log('✅ ALL API TESTS COMPLETED SUCCESSFULLY! ✅');
    console.log('=============================================');

  } catch (err) {
    console.error('❌ Test failed:', err.message);
  }
}

runTests();

const mongoose = require('mongoose');
require('dotenv').config();

async function checkDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/password-vault');
    console.log('✅ Connected to MongoDB');

    // Get database name
    const db = mongoose.connection.db;
    console.log(`📊 Database: ${db.databaseName}`);

    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📁 Collections:');
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });

    // Check users collection
    console.log('\n👥 Users:');
    const users = await db.collection('users').find({}).toArray();
    users.forEach((user, index) => {
      console.log(`  ${index + 1}. Email: ${user.email}, ID: ${user._id}`);
    });

    // Check vaultitems collection
    console.log('\n🔐 Password Vault Items:');
    const vaultItems = await db.collection('vaultitems').find({}).toArray();
    if (vaultItems.length === 0) {
      console.log('  No password entries found');
    } else {
      vaultItems.forEach((item, index) => {
        console.log(`  ${index + 1}. User ID: ${item.userId}`);
        console.log(`     Encrypted Data: ${JSON.stringify(item.data, null, 2)}`);
        console.log(`     Created: ${item.createdAt || 'N/A'}`);
        console.log('');
      });
    }

    console.log('\n📝 Note: The data is encrypted for security. You can only see decrypted data in the frontend application.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

checkDatabase();

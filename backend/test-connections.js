const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');
const Queue = require('bull');
require('dotenv').config({ path: '.env.example' });

async function testS3() {
  console.log('Testing S3 Connection...');
  const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'me-south-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy',
    },
  });

  try {
    await s3Client.send(new ListBucketsCommand({}));
    console.log('S3 Connection Successful');
  } catch (error) {
    console.error('S3 Connection Failed:', error.message);
  }
}

async function testRedis() {
  console.log('Testing Redis Connection...');
  return new Promise((resolve) => {
    const q = new Queue('test-queue', process.env.REDIS_URL || 'redis://localhost:6379');
    q.on('ready', () => {
      console.log('Redis Connection Successful');
      q.close();
      resolve(true);
    });
    q.on('error', (err) => {
      console.error('Redis Connection Failed:', err.message);
      q.close();
      resolve(false);
    });
  });
}

async function main() {
  await testRedis();
  await testS3();
  process.exit(0);
}

main();
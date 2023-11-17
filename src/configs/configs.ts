import dotenv from 'dotenv';

dotenv.config();

export default {
  esmsConfig: {
    ApiKey: process.env.ESMS_API_KEY,
    SecretKey: process.env.ESMS_SECRET_KEY,
    Brandname: 'FNOTIFY',
    SmsType: '2',
    campaignid: 'giapha',
  },
  mailerTransporter: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  },
  redis: {
    host: process.env.REDIS_HOST_NAME || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
  },
  s3: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    params: {
      ACL: 'public-read',
      Bucket: process.env.S3_BUCKET_NAME,
    },
    s3ForcePathStyle: true,
  },
  google: {
    firebase: {
      type: 'service_account',
      projectId: process.env.FIREBASE_NOTIFY_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_NOTIFY_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_NOTIFY_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
      clientEmail: process.env.FIREBASE_NOTIFY_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_NOTIFY_CLIENT_ID,
      authUri: 'https://accounts.google.com/o/oauth2/auth',
      tokenUri: 'https://oauth2.googleapis.com/token',
      authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
      clientC509CertUrl: process.env.FIREBASE_NOTIFY_CLIENT_C509_CERT_URL,
    },
  },
};

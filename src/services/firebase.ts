import firebaseAdmin from 'firebase-admin';

import { envUtil } from '@/utils';

const {
  firebase: { storageBucket },
} = envUtil.getEnv();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert('firebase.json'),
  storageBucket,
});

export default firebaseAdmin;

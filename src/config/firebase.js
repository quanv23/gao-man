import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyC_-EyQGVDu674hyPWbCLPzfftgKWS_9cE',
	authDomain: 'gao-man.firebaseapp.com',
	projectId: 'gao-man',
	storageBucket: 'gao-man.appspot.com',
	messagingSenderId: '591840887180',
	appId: '1:591840887180:web:4eef427f1dd324454996a9',
	measurementId: 'G-J9LKYVTJ8M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

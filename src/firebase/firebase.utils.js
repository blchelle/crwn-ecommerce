import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyAbVoej0xfiKfU8q-Xl0BZWKVZhYHe-L6w',
	authDomain: 'crwn-ecommerce-ba12d.firebaseapp.com',
	databaseURL: 'https://crwn-ecommerce-ba12d.firebaseio.com',
	projectId: 'crwn-ecommerce-ba12d',
	storageBucket: 'crwn-ecommerce-ba12d.appspot.com',
	messagingSenderId: '119180276073',
	appId: '1:119180276073:web:f4961968c08d1928738df8',
	measurementId: 'G-JEZ6463ZR0',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;

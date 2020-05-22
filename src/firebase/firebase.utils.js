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

export const createUserProfileDocument = async (userAuth, additionalData) => {
	// Exit function if there is not a user
	if (!userAuth) return;

	// Destructure the uid from the userAuth
	const { uid } = userAuth;

	// Get a snapshot of the users data
	// const userRef = firestore.doc(`users/${uid}`);
	const userRef = firestore.doc(`users/${uid}`);
	const snapshot = await userRef.get();

	// If the user doesn't exist then create the user
	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

export const convertCollectionSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map((doc) => {
		const { title, items } = doc.data();
		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items,
		};
	});

	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;


// One time use function for automating low frequency writes to firestore
// export const addCollectionAndItems = async (collectionKey, objectsToAdd) => {
// 	const collectionRef = firestore.collection(collectionKey);
// 	const batch = firestore.batch();
// 	objectsToAdd.forEach((obj) => {
// 		const newDocRef = collectionRef.doc();
// 		batch.set(newDocRef, obj);
// 	});

// 	return batch.commit();
// };

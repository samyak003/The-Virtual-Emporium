import firebase from "firebase";
// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
// 	databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
// 	projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
// 	appId: process.env.REACT_APP_FIREBASE_APPID,
// };

const firebaseConfig = {
	apiKey: "AIzaSyAm1lc0OvebE2anA9yEdg1wR-BgoEH0rso",
	authDomain: "the-virtual-emporium.firebaseapp.com",
	projectId: "the-virtual-emporium",
	storageBucket: "the-virtual-emporium.appspot.com",
	messagingSenderId: "145839062518",
	appId: "1:145839062518:web:8331a89ebbdf2429391bd7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };

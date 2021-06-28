import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCT28ZoGrpsYlrqzT6lL138Uw6veneaU8M",
    authDomain: "restaurant-menu-creator.firebaseapp.com",
    projectId: "restaurant-menu-creator",
    storageBucket: "restaurant-menu-creator.appspot.com",
    messagingSenderId: "501286966576",
    appId: "1:501286966576:web:c08a624851a2e67f8fe4f5",
    measurementId: "G-76MB4Z12PB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase
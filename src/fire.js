import {getAuth} from 'firebase/auth'
import {initializeApp} from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDskTKHzZzjhlJcYtJ6jL5SC9HhEL7F1fY",
  authDomain: "myshop-789.firebaseapp.com",
  projectId: "myshop-789",
  storageBucket: "myshop-789.firebasestorage.app",
  messagingSenderId: "561281600516",
  appId: "1:561281600516:web:16303e15bcfd7776a7b951",
  measurementId: "G-118XX4HRY7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}
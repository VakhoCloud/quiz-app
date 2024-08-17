export const enviroment = {
    firebase: {  
        apiKey: "AIzaSyBLi7OVkmjRZL0uNUYGLaRWiNg4XbgOGJk",
        authDomain: "quiz-maker-app-6092c.firebaseapp.com",
        databaseURL: "https://quiz-maker-app-6092c-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "quiz-maker-app-6092c",
        storageBucket: "quiz-maker-app-6092c.appspot.com",
        messagingSenderId: "689970430291",
        appId: "1:689970430291:web:e5615d4f6fa4fc4a0661a6",
        measurementId: "G-WHK2K06GYR"
    },
    production: false
}


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLi7OVkmjRZL0uNUYGLaRWiNg4XbgOGJk",
  authDomain: "quiz-maker-app-6092c.firebaseapp.com",
  databaseURL: "https://quiz-maker-app-6092c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quiz-maker-app-6092c",
  storageBucket: "quiz-maker-app-6092c.appspot.com",
  messagingSenderId: "689970430291",
  appId: "1:689970430291:web:e5615d4f6fa4fc4a0661a6",
  measurementId: "G-WHK2K06GYR"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
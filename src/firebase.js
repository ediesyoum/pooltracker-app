import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDUvA8y5jYv8smURTQPD-P7NBbRV8Q52P0",
  authDomain: "pooltracker-5983e.firebaseapp.com",
  databaseURL: "https://pooltracker-5983e.firebaseio.com",
  projectId: "pooltracker-5983e",
  storageBucket: "pooltracker-5983e.appspot.com",
  messagingSenderId: "110679236788"
};
firebase.initializeApp(config);

export default firebase;

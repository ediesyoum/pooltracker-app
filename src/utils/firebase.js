import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDIO9c4jVa0xsqucs98OQZ-l_QVCIwwysM",
  authDomain: "pooltracker-es.firebaseapp.com",
  databaseURL: "https://pooltracker-es.firebaseio.com",
  projectId: "pooltracker-es",
  storageBucket: "pooltracker-es.appspot.com",
  messagingSenderId: "4459715853"
};
firebase.initializeApp(config);

export default firebase;

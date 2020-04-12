import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCw4I48EPgkmYtPiKRNMgX2qxJUBef3C3E",
  authDomain: "smart-board-test.firebaseapp.com",
  databaseURL: "https://smart-board-test.firebaseio.com",
  projectId: "smart-board-test",
  storageBucket: "smart-board-test.appspot.com",
  messagingSenderId: "420453257809",
  appId: "1:420453257809:web:28ee5e685c5ae98dce9e70",
  measurementId: "G-2S9XQEXHDZ"
};

export default {
  firebaseApp : firebase.initializeApp(firebaseConfig),
};
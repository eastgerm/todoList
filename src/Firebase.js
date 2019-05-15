import firebase from 'firebase'

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: "AIzaSyC3jO0-A6mfJdcABa2wfD8Qerl8H-Yoqqo",
  authDomain: "todo-list-463c2.firebaseapp.com",
  databaseURL: "https://todo-list-463c2.firebaseio.com",
  storageBucket: "todo-list-463c2.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

export const getFireDB = () => {
  return database.ref('/').once('value',)
};
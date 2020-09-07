import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAVQqdgp2aVH1wmMXohr7JQiILklS2S7Fc',
  authDomain: 'felizcumpleapp.firebaseapp.com',
  databaseURL: 'https://felizcumpleapp.firebaseio.com',
  projectId: 'felizcumpleapp',
  storageBucket: 'felizcumpleapp.appspot.com',
  messagingSenderId: '882095638071',
  appId: '1:882095638071:web:72b4ce377f2a4da8a1a1b2',
};

export default firebase.initializeApp(firebaseConfig);

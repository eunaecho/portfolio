import firebase from "firebase/compat/app";

// 사용할 파이어베이스 서비스 주석을 해제합니다
//import "firebase/compat/auth";
import "firebase/compat/database";
//import "firebase/compat/firestore";
//import "firebase/compat/functions";
import "firebase/compat/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
    apiKey: "AIzaSyAXvrs9tHqNKmnqIHk1-PP9Yosk-j8mhS0",
    authDomain: "sparta-mytip-38fbb.firebaseapp.com",
    projectId: "sparta-mytip-38fbb",
    databaseURL: "https://sparta-mytip-38fbb-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "sparta-mytip-38fbb.appspot.com",
    messagingSenderId: "615864600516",
    appId: "1:615864600516:web:1cf97aa5675443c6b10691",
    measurementId: "G-CF6ECRY6ZX"
  };

//사용 방법입니다. 
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database();
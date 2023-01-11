import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, addDoc,setDoc,deleteDoc ,doc , collection, Timestamp } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCOq5fJgCdE-S_H1q0qHkrBM9dBurc4CM8",
    authDomain: "form-challenge-c6160.firebaseapp.com",
    projectId: "form-challenge-c6160",
    storageBucket: "form-challenge-c6160.appspot.com",
    messagingSenderId: "60241785610",
    appId: "1:60241785610:web:68a9fc5b90c348d029c0f3",
    measurementId: "G-GR1ECZN6SP"
  };

  initializeApp(firebaseConfig)

  const db = getFirestore();

  export const sendResponse = async (input)=>{
    await setDoc(doc(db,'Responses','NePy9EkWPOwTk3cn7bD9'),input)
  }

  export const getResponse = async ()=>{
    let data=await getDocs(collection(db,'Responses'));
    let response=data.docs.map(doc=>{
      return doc.data()
    })
    return response
  }
  export default function(){

  }
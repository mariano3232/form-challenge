import { useState } from 'react'
import data from './assets/db.json'
import CreateField from './CreateField';
import './App.css'
import { useEffect } from 'react';
import Modal from './Modal';

function App() {

  let [items,setItems]=useState([])
  let [input,setInput]=useState({})
  let [errors,setErrors]=useState({})
  let [showModal,setShowModal]=useState(false)

  useEffect(()=>{
    setItems(data.items)
  },[])

  let setErrs=setErrors
  
  return (
    <div className='container'>
        {
          showModal&&<Modal setShowModal={setShowModal}/>
        }
        <div className='fieldsContainer'>
        {
          items.map(e=>{           
            return <CreateField item={e} input={input} setInput={setInput} errors={errors} setErrors={setErrs} setShowModal={setShowModal}/>
          })
        }
        </div>
    </div>
  )
}
export default App

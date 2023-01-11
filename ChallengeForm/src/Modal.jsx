import React from 'react'
import styles from './modal.module.css'
import {Link} from 'react-router-dom'

export default function Modal({setShowModal}) {
    console.log(setShowModal)
  return (
    <div className={styles.background}>
        <div className={styles.container}>
            <button onClick={()=>setShowModal(false)} className={styles.closeBtn}>X</button>
            <h3>Formulario enviado</h3>
            <p>Gracias por contestar, el formulario se ha enviado con exito</p>
            <Link to='/responses'>
                <button className={styles.answersBtn}>ver respuestas</button>
            </Link>
        </div>
    </div>
  )
}

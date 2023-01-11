import React from 'react'
import { useEffect,useState} from 'react';
import { getResponse } from './firebase'
import styles from './response.module.css'
import json from './assets/db.json'
import { Link } from 'react-router-dom';

export default function Responses() {

    let [items,setItems]=useState(json.items);
    let [data,setData]=useState();
    console.log(data)
    async function response(){
        let res=await getResponse();
        setData(res[0])
    }
    useEffect(()=>{
        response()
    },[])
    console.log(items)

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h2 className={styles.title}>Tus respuestas</h2>
                {
                    data && Object.entries(data).map(e=>{
                        let label='';
                        items?.map(i=>{
                            if (i.name===e[0]){
                                label=i.label
                            }
                        })
                        return(
                            <div className={styles.fieldContainer}>
                                <p>{label}: </p>
                                {
                                    e[1]===true?<p>Si</p>:<p>{e[1]}</p>
                                }
                            </div>
                            
                        )
                    })
                }
                <Link to='/'><button className={styles.button}>Volver al formulario</button></Link>
            </div>
        </div>
    )
}

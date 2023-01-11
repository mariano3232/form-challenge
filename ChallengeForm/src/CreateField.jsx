
import {React, useState,useEffect } from 'react';
import styles from './createField.module.css'
import {sendResponse}  from './firebase.js';

export default function CreateField({item,input,setInput,errors,setErrors,setShowModal}) { 

    let [render, setRender]=useState(0)
    let [loading,setLoading]=useState(false)
    let [showError,setShowError]=useState(false)

    function handleErrors(err){
        let errors=err;
        if (item.required && (!input[item.name] || input[item.name].length===0) ){
            errors[item.name]='esta respuesta es obligatoria'
        }
        else if (item.type==='email'&&!input.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
            errors.email='Ingresa un email valido'
        }
        else if (item.type==='date'&&!input.birth_date.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)){
            errors.birth_date='Ingresa una fecha valida'
        }
        else delete errors[item.name]
        return errors
    }

    const handleChange=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value,
        })
    }
    const handleCheckbox=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.checked,
        })
    }

    const handleSubmit= ()=>{
        setLoading(true)
        if (Object.keys(input).length>0){
            sendResponse(input).then(()=>{
                Array.from(document.querySelectorAll("input")).forEach(
                    input => {
                        (input.value = '')
                        if (input.type==='checkbox'){
                            input.checked=false;
                        }
                    }
                );
                document.querySelector('select').value='';
                setShowModal(true)
                setShowError(false)
                setInput({})
                setLoading(false)
            }).catch((res)=>{
                alert('ERROR')
                console.log('error :',res)
                setLoading(false)
            })
        }
    }

    useEffect(()=>{
        let err=handleErrors(errors)
        setErrors(err)
        setRender(Math.random())
    },[input])


    switch(item.type){
        case 'text':
            return (
                <div className={styles.container}>
                    <label>{item.label} {item.required?"*":''} :</label>
                    <input type="text" name={item.name} onChange={(e)=>handleChange(e)} onBlur={()=>setShowError(true)}/>
                    {errors[item.name]&&showError&&<p style={{'color':'red'}}>{errors[item.name]}</p>}
                </div>
            );
        case 'email':
            return(
                <div className={styles.container}>
                    <label>{item.label} {item.required?"*":''} :</label>
                    <input type="text" name={item.name} onChange={(e)=>handleChange(e)} onBlur={()=>setShowError(true)}/>
                    {errors[item.name]&&showError&&<p style={{'color':'red'}}>{errors[item.name]}</p>}
                </div>
            );
        case 'date':
            return (
                <div className={styles.container}>
                    <label>{item.label} {item.required?"*":''} :</label>
                    <input type="date" name={item.name} onChange={(e)=>handleChange(e)} onBlur={()=>setShowError(true)}/>
                    {errors[item.name]&&showError&&<p style={{'color':'red'}}>{errors[item.name]}</p>}
                </div>
            );
        case 'select':
            return (
                <div className={styles.container}>
                    <label>{item.label} {item.required?"*":''}</label>
                    <select name={item.name} onChange={(e)=>handleChange(e)} onBlur={()=>setShowError(true)}>
                        <option value='' key={'select'}>Seleccionar</option>
                        {
                            item.options.map(e=>{
                                return <option value={e.value} key={e.value}>{e.label}</option>
                            })
                        }
                    </select>
                    {errors[item.name]&&showError&&<p style={{'color':'red'}}>{errors[item.name]}</p>}
                </div>
            );
        case 'checkbox':
            return (
                <div className={styles.container}>
                    <label>{item.label} {item.required?"*":''}</label>
                    <input type="checkbox" name={item.name} onChange={(e)=>handleCheckbox(e)} onBlur={()=>setShowError(true)}/>
                    {errors[item.name]&&showError&&<p style={{'color':'red'}}>{errors[item.name]}</p>}
                </div>
                
            )
        case 'submit':
            return(
                <div className={styles.container}>
                    {
                        Object.keys(errors).length===0&&!loading?<button type='submit' className={styles.button} onClick={()=>handleSubmit()}>{item.label}</button>:<button type='submit' disabled className={styles.button}>{item.label}</button>
                    }
                </div>
            )  
    }
}

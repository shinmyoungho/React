import axios from 'axios';
import React,{useEffect, useState,useContext} from 'react';
import styles from '../css/login.module.css';
import Home from '../routes/Home';
import {MyContext} from '../App';
import { useNavigate } from 'react-router-dom';





function Login(){
   const [loginstate,setloginState] = useState(false);
   const {value,setValue} = useContext(MyContext);
   const navigate = useNavigate();
   const [loginData,setLoginData]= useState({
      email:"",
      password:""
   })
   const onChange=(e)=>{
      const {name,value} = e.target;
      setLoginData({
         ...loginData,
         [name]:value,
      });
   };
   const handleSubmit=(e)=>{
      e.preventDefault();                                 // api요청
      axios.post('http://localhost:5000/login',{
         email:loginData.email,
         password:loginData.password
      },{
         headers: {
            'Content-Type': 'application/json'
          }
      })
      .then(response =>{
         if(response.data.login){
            console.log(response.data.message);
            setValue(response.data.username);
            navigate('/',{replace:true});
         }
         else{
            console.log(response.data.message);
         }
      })
      .catch(error => {
         console.error('에러 발생:', error);
         
       });
   }

   
   
   return(
      <>
      <div className={styles.container}>
         <form onSubmit={handleSubmit} className={styles.container2}>
            <div className={styles.div1}>
               <label>email:</label>
               <input
                name="email" 
                onChange={onChange} 
                type="email"
                required/>
               <span></span>
            </div>
            <div className={styles.div1}>
               <label>비밀번호:</label>
               <input 
               name="password" 
               onChange={onChange}
                type="password"
                required/>
               <span></span>
            </div>
            <button className={styles.btn}type="submit">로그인</button>
         </form>
      </div>
      </>
      
   );
}

export default Login;
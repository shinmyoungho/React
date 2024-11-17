import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {useContext} from 'react';
import {MyContext} from '../App';
import style from '../css/Nav.module.css';
import { useNavigate } from 'react-router-dom';

function Nav() {
   const navigate = useNavigate();
   
   const {value,setValue} = useContext(MyContext); //  로그인시에 유저 이름을 받아옴
   const logout=()=>{
      setValue('로그인');
      navigate('/',{replace:true});
   }
   return (  
      <>
      <nav className={style.container}>
         <div className={style.div1}><Link to='/' ><b><h3>상권 정보 홈페이지</h3></b></Link></div>
         <div className={style.div2}>
            
            <Link to='/'><b><h3>종합</h3></b></Link>
            <Link to='/total2'><b><h3>부동산</h3></b></Link>
         </div>
         <div className={style.div3}>
            {value==="로그인"?(
               <>
               <Link to='/login' ><b><h3>{value}</h3></b></Link>
               
               <Link to='/signup' ><b><h3>회원가입</h3></b></Link>
               </>
            ):(
               <>
               <b><h3>{value}</h3></b>
               <b><h3 onClick={logout}>로그아웃</h3></b>
            </>
            )}
            
            
         </div>
      </nav>
      
      </> 
        
   );
 }
 export default Nav;
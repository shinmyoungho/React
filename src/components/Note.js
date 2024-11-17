import React,{useState,useContext,useEffect} from 'react';
import {useDrag} from 'react-use-gesture';
import { useSpring,animated } from 'react-spring';
import styles from '../css/note.module.css'
import {MyContext} from '../App';
import axios from 'axios';




function Note(){
   const {value,setValue} = useContext(MyContext);
   const [note,setNote] = useState('');
   const [noteState,setNoteSate]=useState(true);
   
   const onChange=(e)=>{
      const value = e.target.value;
      console.log(e.target.value);
      setNote(value);      
   };
   const handleSubmit=(e)=>{
      e.preventDefault();
      axios.post('http://localhost:5000/noteSave',{
         username: value,    //유저 네임 가져와야함.
         noteText:note
      },{
         headers: {
            'Content-Type': 'application/json'
          }
      }).then(response =>{
         if(response.data.result){
            console.log(response.data.msg);
            
         }
         else{
            console.log(response.data.msg);
         }
      })
      .catch(error => {
         console.error('에러 발생:', error);    
       });  
   }
   const textResponse=(e)=>{
      e.preventDefault();
      axios.post('http://localhost:5000/noteApi',{
         username: value
      },{
         headers: {
            'Content-Type': 'application/json'
          }
      }).then(res=>{
         setNote(res.data.text);
         console.log(note);
      }).catch(error => {
         console.error('에러 발생:', error);    
       }); 
      
   }
   const noteOnOff=()=>{
      noteState? setNoteSate(false):setNoteSate(true);
      console.log(noteState);
   }
   const btnStyle = {
      color: "white",
      background: "teal",
      padding: ".375rem .75rem",
      border: "1px solid teal",
      borderRadius: ".25rem",
      fontSize: "1rem",
      lineHeight: 1.5,
      marginLeft: '5px',
    };
    
   
   return(
      <div style={{position:'absolute',zIndex:'500',top:200,right:30}}className={styles.container}>
          
          <button style={btnStyle}onClick={noteOnOff}>노트 접기</button>

         
         {noteState &&(
            <>
            <div className={styles.head}>
            Note
         </div>
            <form onSubmit={handleSubmit}>
            <textarea className={styles.note} onChange={onChange} name="text" value={note}>
               
            </textarea>
            <button className={styles.btn} type="submit">저장</button>
            </form>
            <form onSubmit={textResponse}>
               <button className={styles.btn} type='submit'>불러오기</button>
            </form>
            </>
         )}
         
      
          
      </div>
         
   );
}



export default Note;
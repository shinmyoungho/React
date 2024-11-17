import React, { useState } from 'react';
import styles from '../css/signup.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  // 입력 필드의 상태를 초기화합니다.
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // 입력 필드의 변경 핸들러를 만듭니다.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 폼 제출 핸들러를 만듭니다.
  const handleSubmit = (e) => {
    e.preventDefault();
    //여기서는 간단한 유효성 검사를 수행합니다.
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log(formData);
    axios.post('http://localhost:5000/signup',{
      username:formData.username,
      email:formData.email,
      password:formData.password
    },{
      headers: {
         'Content-Type': 'application/json'
       }
   })
   .then(response=>{
    if(!(response.data.permission)){
      alert("이미 존재하는 회원입니다.");      
    }
    else{
      alert("회원가입이 되었습니다.");
      navigate("/login");
    }
   })
   .catch(error=>{
    console.error('에러발생',error);
   })
    // 유효성 검사를 통과한 경우, 폼 데이터를 처리할 수 있습니다.
    // 여기서 API 호출 또는 다른 작업을 수행할 수 있습니다.
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.container2}>
        <div className={styles.div1}>
        <label>사용자 이름:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          
          <span></span>
        </div>
        <div className={styles.div1}>
        <label>email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <span></span>
        </div>
        <div className={styles.div1}>
        <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span></span>
        </div>
        <div className={styles.div1}>
        <label>비밀번호 확인:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          
          <span></span>
        </div>
        <button className={styles.btn} type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default Signup;
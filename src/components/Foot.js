import styles from '../css/Foot.module.css';
import logo from '../images/logo192.png';

function Foot(){
   return (
      <div className={styles.container}>
         <div>
            <p>
               대표자 - XXX<br/>
               tel- 010-XXXX- XXXX<br/>
               e-mail- XXXXXXXX@naver.com
            </p>
         </div>
         <div>
            <p>이용 약관<br/>
             ~~~~~~~~~<br/>
             ~~~~~~~~~<br/>
             ~~~~~~~~~
            </p>
         </div>
         <div className={styles.div1}>
            <img className={styles.image}src={logo} alt='뷁'/>
         </div>

      </div>
   );
}


export default Foot;
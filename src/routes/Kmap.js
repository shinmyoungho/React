import { object } from "prop-types";
import React,{useEffect,useState, useRef} from "react";
import { Map,MapMarker,MapInfoWindow,Roadview,MapTypeId } from "react-kakao-maps-sdk";
import styles  from '../css/total.module.css';
import Newstore from "./Newstore";
import NewStoreinfo from "./Newstoreinfo";
import Newlive from "./Newlive";
import Newwalk from "./Newwalk";



//import styles from '../css/map.module.css';

//const {kakao} = window;

function Kmap(){
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
   const { kakao } = window;
   const [map,setmap] = useState(true);
   const [markers, setMarkers] = useState([]);
   const [info, setInfo] = useState();
   const searchapi=()=>{
      if(!map) return;
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(searchkeyword,(data,status,_pagination)=>{
         if(status == kakao.maps.services.Status.OK){
            const bounds = new kakao.maps.LatLngBounds()
            let markers = [];
            for (var i = 0; i < data.length; i++) {
               // @ts-ignore
               markers.push({
                 position: {
                   lat: data[i].y,
                   lng: data[i].x,
                 },
                 content: data[i].place_name,
                 content2:data[i].address_name,
               })
               // @ts-ignore
               bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
             }
             setMarkers(markers)
     
             // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
             map.setBounds(bounds)

         }
      })
   }
   const [dongData, setdongData] = useState([]);
   const positions2=[];
   useEffect(() => {
      // JSON 파일 불러오기
      fetch(`${process.env.PUBLIC_URL}/live_data.json`)
        .then((response) => response.json())
        .then((data) => {
          setdongData(data);
        });
    }, []);
      const tmp=dongData.map(data=>({title:`${data.gu} ${data.dong}`,latLng:{lat:data.lat,lng:data.lng},code:data.code.toString().slice(0,8)}))
      positions2.push(...tmp);
      
      var positions=[
         {
            title:'송파구',
            latlng:{lat: 37.51175556, lng:127.1079306},
            name: 'Songpa-gu',
            code:'11710'
         },
         {
            title:'강남구',
            latlng:{lat: 37.514575,  lng:127.0495556},
            name: 'Gangnam-gu',
            code: '11680'
         },
         {
            title:'강동구',
            latlng:{lat: 37.52736667,  lng:127.1258639},
            name: 'Gangdong-gu',
            code:'11740'
         },
         {
            title:'강북구',
            latlng:{lat: 37.63695556,  lng:127.0277194},
            name: 'Gangbuk-gu',
            code:'11305'
         },
         {
            title:'강서구',
            latlng:{lat: 37.54815556,  lng:126.851675},
            name: 'Gangseo-gu',
            code:'11500'
         },
         {
            title:'관악구',
            latlng:{lat: 37.54815556,  lng:126.9538444},
            name: 'Gwanak-gu',
            code:'11620'
         },
         {
            title:'광진구',
            latlng:{lat: 37.53573889,  lng:127.0845333},
            name: 'Gwangjin-gu',
            code:'11215'
         },
         {
            title:'구로구',
            latlng:{lat: 37.49265,  lng:126.8895972},
            name: 'Guro-gu',
            code:'11530'
         },
         {
            title:'금천구',
            latlng:{lat: 37.44910833,  lng:126.9041972},
            name: 'Geumcheon-gu',
            code:'11545'
         },
         {
            title:'노원구',
            latlng:{lat: 37.65146111,  lng:127.0583889},
            name: 'Nowon-gu',
            code:'11350'
         },
         {
            title:'도봉구',
            latlng:{lat: 37.66583333,  lng:127.0495222},
            name: 'Dobong-gu',
            code:'11320'
         },
         // {
         //    title:'동대문구',
         //    latlng:{lat: 37.571625,  lng:127.0421417},  // 없음 데이터 xx
         //    name: 'Dongdaemun-gu'
         // },
         {
            title:'동작구',
            latlng:{lat: 37.50965556,  lng:126.941575},
            name: 'Dongjak-gu',
            code:'11590'
         },
         {
            title:'마포구',
            latlng:{lat: 37.56070556,  lng:126.9105306},
            name: 'Mapo-gu',
            code:'11440'
         },
         {
            title:'서대문구',
            latlng:{lat: 37.57636667,  lng:126.9388972},
            name: 'Seodaemun-gu',
            code:'11410'
         },
         {
            title:'서초구',
            latlng:{lat: 37.48078611,  lng:127.0348111},
            name: 'Seocho-gu',
            code:'11650'
         },
         {
            title:'성동구',
            latlng:{lat: 37.56061111,  lng:127.039},
            name: 'Seongdong-gu',
            code:'11200'
         },
         // {
         //    title:'성북구',
         //    latlng:{lat: 37.58638333,  lng:127.0203333},//안나옴 영등포구랑 같이 데이터 제공 x
         //    name: 'Seongbuk-gu'
         // },
         {
            title:'양천구',
            latlng:{lat: 37.51423056,  lng:126.8687083},
            name: 'Yangcheon-gu',
            code: '11470'
         },
         // {
         //    title:'영등포구',
         //    latlng:{lat: 37.5236111,  lng:126.8983417}, // 안나옴 확인결과 데이터 제공 x Tqkf
         //    name: 'Yeongdeungpo-gu'
         // },
         {
            title:'용산구',
            latlng:{lat: 37.53609444,  lng:126.9675222},
            name: 'Yongsan-gu',
            code:'11170'
         },
         {
            title:'은평구',
            latlng:{lat: 37.59996944,  lng:126.9312417},
            name: 'Eunpyeong-gu',
            code:'11380'
         },
         {
            title:'종로구',
            latlng:{lat: 37.57037778,  lng:126.9816417},
            name: 'Jongno-gu',
            code:'11110'
         },
         {
            title:'중구',
            latlng:{lat: 37.56100278,  lng:126.9996417},
            name: 'Jung-gu',
            code:'11140'
         },
         {
            title:'중랑구',
            latlng:{lat: 37.60380556,  lng:127.0947778},
            name: 'Jungnang-gu',
            code:'11260'
         },
      ];
      const [center, setCenter] = useState({
         lat: 37.51175556, lng: 126.9899999
       })
       
      const [searchkeyword,setsearchkeyword]=useState('');
      // const [walkData,setwalkData]=useState([]); //유동인구
      // const [liveData,setliveData]=useState([]); // 생활인구
      const [storename,setstorename] = useState("한식음식점");
      const [isOpen, setIsOpen] = useState({open:false,name:"",code:""}); // 자치구 마커
      const [isOpen2,setIsOpen2] = useState({name:"mok01-dong",code:"11710510"});            // 행정동 마커
      const [dong,setdong] = useState('');
      const [selectView,setselectView] = useState('유동인구');
      
      const [level,setLevel]= useState(8);
      const mapRef = useRef(null);          //map정보 참조 ex) map.currunt.getLevel();
      const handleMapCreate = (map) => {
         mapRef.current = map; // 지도 객체를 mapRef에 저장
         setmap(map);
         kakao.maps.event.addListener(map, "zoom_changed", () => {
            const currentLevel = map.getLevel();
            setLevel(currentLevel); // 레벨 상태 업데이트
          });
          
       }; 
      const onChange=(e)=>{
         setstorename(e.target.value);
      } 
      const onChange2=(e)=>{
         setdong(e.target.value);
      }
      const onChange3=(e)=>{
         setsearchkeyword(e.target.value);    // 카카오 api 검색
        
      }
      const onChange5=(e)=>{
         setselectView(e.target.value);

      }
      
      
   
   return(
      <>
      
     
      
      
      
      <div style={{position:'absolute',top:'100px',right:0,zIndex:80}} className={styles.InputContainer}>
         <input type="text" value={searchkeyword} onChange={onChange3} className={styles.input1}/>
         <button style={btnStyle}onClick={searchapi}>검색</button>
      </div>
      <Map
      center={{lat: 37.51175556, lng: 126.9899999}}
      style={{ width: "100%", height: "950px" }}
      level={8}
      onCreate={handleMapCreate}
      onClick={(_,mouseEvent)=>{
         setCenter({
            lat:mouseEvent.latLng.getLat(),
            lng:mouseEvent.latLng.getLng(),
         })
      }}
    >
      <select style={{position:'absolute', zIndex:900, top:80,left:90
         ,width: '200px',border: '1px solid #C4C4C4', boxSizing: 'border-box',borderRadius: '10px',padding: '12px 13px',
         fontFamily: 'Roboto',fontStyle: 'normal',fontWeight: 400,
         fontSize: '14px',lineHeight: '16px'
      }} onChange={onChange5}>
         <option value='유동인구'>유동인구</option>
         <option value='생활인구'>생활인구</option>
         <option value='점포종류'>서울시 업종 정보</option>
         <option value='매출'>서울시 매출</option>
      </select>
    {markers.map((marker) => (             
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
            size: {
              width: 64,
              height: 69,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 27,
                y: 69,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
          onClick={() => setInfo(marker)}
        >
          {info &&info.content === marker.content && (
            <>   
               <div style={{display:'flex'}}><div>상호명</div><div style={{marginLeft:'15px'}}>{marker.content}</div></div>
               <div style={{display:'flex', whiteSpace:'nowrap'}} ><div style={{marginLeft:'10px'}}>주소</div><div style={{marginLeft:'30px'}}>{marker.content2}</div></div>
  
            </>
          )}

        </MapMarker>
      ))}
      <MapTypeId type={kakao.maps.MapTypeId.ROADVIEW} />
      <MapMarker                 // 로드뷰 인형 
          position={center}
          draggable={true}
          onDragEnd={(marker) => {
            setCenter({
              // @ts-ignore
              lat: marker.getPosition().getLat(),
              // @ts-ignore
              lng: marker.getPosition().getLng(),
            })
            
          }}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png",
            size: { width: 35, height: 46 },
            options: {
              spriteSize: { width: 1666, height: 168 },
              spriteOrigin: { x: 705, y: 114 },
              offset: { x: 13, y: 46 },
            },
          }}
        />
   
      {  level >= 7  && (
         positions.map((value)=>(           //자치구 마커 
            <MapMarker
               position={value.latlng}
               onClick={()=>setIsOpen({...isOpen,open:true,name:value.name,code:value.code})} 
            >
               <div style={{ padding: "5px", color: "#000"}}>
                  {value.title}
               </div> 
            </MapMarker>

         )))
      }
      {  level <= 7 && level&&positions2.length>0&&(
         positions2.map((value)=>(           //행정동 마커 
            <MapMarker
               position={value.latLng}
               onClick={()=>setIsOpen2({...isOpen2,name:value.title,code:value.code})} 
            >
               <div style={{ padding: "5px", color: "#000" }}>
                  {value.title}
               </div> 
            </MapMarker>

         )))
      }  

      {selectView === '유동인구'? <Newwalk guname={isOpen.name}/> : null}
      { selectView ==='생활인구' ? <Newlive liveCode={isOpen2.code} Dname={isOpen2.name}/>: null}
      { selectView === '점포종류' ? <NewStoreinfo storename={storename}/>:null}
      { selectView ==='매출' ? <Newstore storename={storename}/>: null }
      { selectView ==='매출' || selectView ==='점포종류' ?(
         <select name="storename" id="stores" onChange={onChange} style={{position:'absolute', 
         zIndex:501,top:80,left:300
         ,width: '200px',border: '1px solid #C4C4C4', boxSizing: 'border-box',borderRadius: '10px',padding: '12px 13px',
         fontFamily: 'Roboto',fontStyle: 'normal',fontWeight: 400,
         fontSize: '14px',lineHeight: '16px'}}>
            <option value="한식음식점">한식음식점</option>
            <option value="PC방">PC방</option>
            <option value="가구">가구</option>
            <option value="가방">가방</option>
            <option value="가전제품">가전제품</option>
            <option value="가전제품수리">가전제품수리</option>
            <option value="고시원">고시원</option>
            <option value="골프연습장">골프연습장</option>
            <option value="네일숍">네일숍</option>
            <option value="노래방">노래방</option>
            <option value="당구장">당구장</option>
            <option value="문구">문구</option>
            <option value="미곡판매">미곡판매</option>
            <option value="미용실">미용실</option>
            <option value="반찬가게">반찬가게</option>
            <option value="부동산중개업">부동산중개업</option>
            <option value="분식전문점">분식전문점</option>
            <option value="서적">서적</option>
            <option value="섬유제품">섬유제품</option>
            <option value="세탁소">세탁소</option>
            <option value="수산물판매">수산물판매</option>
            <option value="슈퍼마켓">슈퍼마켓</option>
            <option value="스포츠강습">스포츠강습</option>
            <option value="스포츠클럽">스포츠클럽</option>
            <option value="시계및귀금속">시계및귀금속</option>
            <option value="신발">신발</option>
            <option value="안경">안경</option>
            <option value="애완동물">애완동물</option>
            <option value="여관">여관</option>
            <option value="예술학원">예술학원</option>
            <option value="완구">완구</option>
            <option value="외국어학원">외국어학원</option>
            <option value="운동/경기용품">운동/경기용품</option>
            <option value="육류판매">육류판매</option>
            <option value="의료기기">의료기기</option>
            <option value="의약품">의약품</option>
            <option value="인테리어">인테리어</option>
            <option value="일반교습학원">일반교습학원</option>
            <option value="일반의류">일반의류</option>
            <option value="일반의원">일반의원</option>
            <option value="일식음식점">일식음식점</option>
            <option value="자동차미용">자동차미용</option>
            <option value="자동차수리">자동차수리</option>
            <option value="전자상거래업">전자상거래업</option>
            <option value="제과점">제과점</option>
            <option value="조명용품">조명용품</option>
            <option value="중식음식점">중식음식점</option>
            <option value="철물점">철물점</option>
            <option value="청과상">청과상</option>
            <option value="치과의원">치과의원</option>
            <option value="치킨전문점">치킨전문점</option>
            <option value="커피-음료">커피-음료</option>
            <option value="패스트푸드점">패스트푸드점</option>
            <option value="편의점">편의점</option>
            <option value="피부관리실">피부관리실</option>
            <option value="한식음식점">한식음식점</option>
            <option value="한의원">한의원</option>
            <option value="핸드폰">핸드폰</option>
            <option value="호프-간이주점">호프-간이주점</option>
            <option value="화장품">화장품</option>
            <option value="화초">화초</option>
         </select>) :null
      }
      
         
      
    </Map>
   <Roadview // 로드뷰를 표시할 Container
      position={{
      // 지도의 중심좌표
      ...center,
      radius: 50,
      }}
      style={{
      // 지도의 크기
      width: "100%",
      height: "450px",
      }}
   />
    </>
   )
}

export default Kmap;
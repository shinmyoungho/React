import React,{ useState,useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";


function Newwalk(props){
   const [pdata,setPdata] = useState([]);
   const tmp = new Set(); // 행정동 중복 거름
   const arrtmp = []; // 행정동 이름
   const [today,setToday] = useState("");  // 금일 날짜
   const dongData=[]; // 중복 유동인구 제외 2중 배열
   const [grap,setGrap]=useState([]);
   
   useEffect(()=>{
      const fetchData=async()=>{
         try{
            const response1 = await fetch(`http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API}/json/IotVdata018/1/1000/${props.guname}`);
            if(!response1.ok){
               throw new Error(`Http err: ${response1.status}`);
            }
            const json1 = await response1.json();
            setPdata(json1.IotVdata018.row); 
            
         }
         catch (error){
            console.error("Error fetching or parsing JSON:", error);
         }
         //ADMINISTRATIVE_DISTRICT
      }
      fetchData();
   },[props.guname])
   useEffect(()=>{
      setGrap([]);
      pdata.map((data)=>{
         tmp.add(data.ADMINISTRATIVE_DISTRICT);
      })
      arrtmp.push(...tmp);
      setToday(pdata.length>0 ? pdata[0].SENSING_TIME.split("_")[0]:"none"); // 금일 날짜
      for(let i=0; i<arrtmp.length; i++){
         const sortData=[];
         sortData.push(...(pdata.length>0 ? pdata.filter((data)=> data.ADMINISTRATIVE_DISTRICT===arrtmp[i] && 
         data.SENSING_TIME.split("_")[0]===today).sort((a,b)=>a.VISITOR_COUNT-b.VISITOR_COUNT):[])); 

         dongData.push(sortData.length>0?sortData.filter((data,index,self)=>(
         index === self.findIndex(t=>data.VISITOR_COUNT===t.VISITOR_COUNT)      //유동인구 중복 제거 -> 이 부분이 좀 이상한거 같은데? 
         
      )):[]); console.log(dongData);     
      }
      for(let i=0; i<dongData.length; i++){
         if (dongData[i] && dongData[i].length > 0) {
            const first6 = dongData[i].find(k=>'06'===k.SENSING_TIME.split("_")[1].split(':')[0]);//아침
            const first7 = dongData[i].find(k=>'07'===k.SENSING_TIME.split("_")[1].split(':')[0]);
            const first8 = dongData[i].find(k=>'08'===k.SENSING_TIME.split("_")[1].split(':')[0]);

            const first11 = dongData[i].find(k=>'11'===k.SENSING_TIME.split("_")[1].split(':')[0]);//점심
            const first12 = dongData[i].find(k=>'12'===k.SENSING_TIME.split("_")[1].split(':')[0]);
            const first13 = dongData[i].find(k=>'13'===k.SENSING_TIME.split("_")[1].split(':')[0]);

            const first18 = dongData[i].find(k=>'18'===k.SENSING_TIME.split("_")[1].split(':')[0]);//저녁
            const first19 = dongData[i].find(k=>'19'===k.SENSING_TIME.split("_")[1].split(':')[0]);
            const first20 = dongData[i].find(k=>'20'===k.SENSING_TIME.split("_")[1].split(':')[0]);

            const data=[];
            if(first6) data.push({x:first6.SENSING_TIME.split("_")[1].split(':')[0],y:first6.VISITOR_COUNT});
            if(first7) data.push({x:first7.SENSING_TIME.split("_")[1].split(':')[0],y:first7.VISITOR_COUNT});
            if(first8) data.push({x:first8.SENSING_TIME.split("_")[1].split(':')[0],y:first8.VISITOR_COUNT});

            if(first11) data.push({x:first11.SENSING_TIME.split("_")[1].split(':')[0],y:first11.VISITOR_COUNT});
            if(first12) data.push({x:first12.SENSING_TIME.split("_")[1].split(':')[0],y:first12.VISITOR_COUNT});
            if(first13) data.push({x:first13.SENSING_TIME.split("_")[1].split(':')[0],y:first13.VISITOR_COUNT});

            if(first18) data.push({x:first18.SENSING_TIME.split("_")[1].split(':')[0],y:first18.VISITOR_COUNT});
            if(first19) data.push({x:first19.SENSING_TIME.split("_")[1].split(':')[0],y:first19.VISITOR_COUNT});
            if(first20) data.push({x:first20.SENSING_TIME.split("_")[1].split(':')[0],y:first20.VISITOR_COUNT});

            if(data.length>0){
               
               setGrap((prevGrap) => [
                  ...prevGrap,
                  {
                    id: dongData[i][0].ADMINISTRATIVE_DISTRICT,
                    data: data,
                  },
                ]);
            }
         
         }
      }
   },[pdata])    
   
   
   
   
   
   return(
      <div style={{position:'absolute',width:'1000px',top:125,left:20,
         height:'500px',backgroundColor:'white', zIndex:500, overflow:'scroll'}}>
            {grap.length > 0  ?(
               <ResponsiveLine             
               data={
                  grap
               }
               margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
               xScale={{ type: 'point' }}
               yScale={{
                   type: 'linear',
                   min: 'auto',
                   max: 'auto',
                   stacked: true,
                   reverse: false
               }}
               yFormat=" >-.2f"
               axisTop={null}
               axisRight={null}
               axisBottom={{
                   tickSize: 5,
                   tickPadding: 5,
                   tickRotation: 0,
                   legend: 'transportation',
                   legendOffset: 36,
                   legendPosition: 'middle',
                   truncateTickAt: 0
               }}
               axisLeft={{
                   tickSize: 5,
                   tickPadding: 5,
                   tickRotation: 0,
                   legend: 'count',
                   legendOffset: -40,
                   legendPosition: 'middle',
                   truncateTickAt: 0
               }}
               pointSize={10}
               pointColor={{ theme: 'background' }}
               pointBorderWidth={2}
               pointBorderColor={{ from: 'serieColor' }}
               pointLabel="data.yFormatted"
               pointLabelYOffset={-12}
               enableTouchCrosshair={true}
               useMesh={true}
               legends={[
                   {
                       anchor: 'bottom-right',
                       direction: 'column',
                       justify: false,
                       translateX: 100,
                       translateY: 0,
                       itemsSpacing: 0,
                       itemDirection: 'left-to-right',
                       itemWidth: 80,
                       itemHeight: 20,
                       itemOpacity: 0.75,
                       symbolSize: 12,
                       symbolShape: 'circle',
                       symbolBorderColor: 'rgba(0, 0, 0, .5)',
                       effects: [
                           {
                               on: 'hover',
                               style: {
                                   itemBackground: 'rgba(0, 0, 0, .03)',
                                   itemOpacity: 1
                               }
                           }
                       ]
                   }
               ]}
            />
            ):null}
            
      </div>
   )
}

export default Newwalk;
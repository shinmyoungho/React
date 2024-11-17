import React,{useEffect,useState} from "react";
import { ResponsiveLine } from "@nivo/line";

function Newstore(props){
   const [price,setprice] = useState([]);
   const [price2,setprice2] = useState([]);
   const [price3,setprice3] = useState([]);
   const [btnState,setBtnState] = useState('데이터');
   const [swap,setSwap] = useState(true);
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
   useEffect(()=>{
      fetch(`http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API}/json/VwsmMegaSelngW/1/500/`)//매출
         .then((response)=>response.json())
         .then((json)=>
         {
            setprice(json.VwsmMegaSelngW.row);
            
         });
      fetch(`http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API}/json/VwsmMegaSelngW/501/1000/`)//매출
         .then((response)=>response.json())
         .then((json)=>
         {
            setprice2(json.VwsmMegaSelngW.row);
         });
      fetch(`http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API}/json/VwsmMegaSelngW/1001/1500/`)//매출
         .then((response)=>response.json())
         .then((json)=>
         {
            setprice3(json.VwsmMegaSelngW.row);
         })
   },[]);
   const allPrice=[...price3,...price2,...price];
   
   const temp=[];  //그래프 배열
   const dataTemp=[];  // 데이터 배열
   allPrice.map((data)=>{  // 업종매출은 분기마다 하나씩 있음
      
      if(data.SVC_INDUTY_CD_NM===props.storename){
         let temp2 = Math.round(data.THSMON_SELNG_AMT/100000000);
         temp.push({"x":data.STDR_YYQU_CD,"y":temp2});
         dataTemp.push(data);
      }
   })
   
   const sellPrice=temp.sort((a,b)=>a.x - b.x)  //그래프 배열 
   const sellPricedata=dataTemp.sort((a,b)=>a.STDR_YYQU_CD - b.STDR_YYQU_CD); //그래프 배열
   const buttonChange=()=>{
      if(btnState=='데이터'){
         setBtnState('그래프');
         setSwap(false);
      }
      else{
         setBtnState('데이터');
         setSwap(true);
      }
   }
   
   return(
         <div style={{position:'absolute',width:'1000px',top:125,left:20,
            height:'500px',backgroundColor:'white', zIndex:500, overflow:'scroll'}}>
               <button onClick={buttonChange} style={btnStyle}>{btnState}</button>
               
            {sellPrice.length > 0 && swap &&(
               <ResponsiveLine
               data={
                  [ {'id':'당월 매출(억)',
                     'data':sellPrice
                  }
                  ]
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
                        anchor: 'right',
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
            />)}
            {
                !swap && (
                  <table >
                  <tr>
               
            <th>년/분기</th>
            <th>당월-매출-금액</th>
            <th>당월-매출-건수</th>
            <th>주중_매출_금액</th>
            <th>주말_매출_금액</th>
            <th>월요일_매출_금액</th>
            <th>화요일_매출_금액</th>
                  <th>수요일_매출_금액</th>
                  <th>목요일_매출_금액</th>
                  <th>금요일_매출_금액</th>
                  <th>토요일_매출_금액</th>
                  <th>일요일_매출_금액</th>
                 <th>시간대_00~06_매출_금액</th>
                 <th>시간대_06~11_매출_금액</th>
                 <th>시간대_11~14_매출_금액</th>
                 <th>시간대_14~17_매출_금액</th>
                 <th>시간대_17~21_매출_금액</th>
                 <th>시간대_21~24_매출_금액</th>
                 <th>남성_매출_금액</th>
                 <th>여성_매출_금액</th>
                 <th>연령대_10_매출_금액</th>
                 <th>연령대_20_매출_금액</th>
                 <th>연령대_30_매출_금액</th>
                 <th>연령대_40_매출_금액</th>
                 <th>연령대_50_매출_금액</th>
                 <th>연령대_60_이상_매출_금액</th>
                 <th>주중_매출_건수</th>
                 <th>주말_매출_건수</th>
                 <th>월요일_매출_건수</th>
                 <th>화요일_매출_건수</th>
                 <th>수요일_매출_건수</th>
                 <th>목요일_매출_건수</th>
                 <th>금요일_매출_건수</th>
                 <th>토요일_매출_건수</th>
                 <th>일요일_매출_건수</th>
                 <th>시간대_건수~06_매출_건수</th>
                 <th>시간대_건수~11_매출_건수</th>
                 <th>시간대_건수~14_매출_건수</th>
                 <th>시간대_건수~17_매출_건수</th>
                 <th>시간대_건수~21_매출_건수</th>
                 <th>시간대_건수~24_매출_건수</th>                     
                 <th>남성_매출_건수</th>
                 <th>여성_매출_건수</th>
                 <th>연령대_10_매출_건수</th>
                 <th>연령대_20_매출_건수</th>
                 <th>연령대_30_매출_건수</th>
                 <th>연령대_40_매출_건수</th>
                 <th>연령대_50_매출_건수</th>
                 <th>연령대_60_이상_매출_건수</th>
                  </tr>
                     {sellPrice.length&&sellPricedata.map((data)=>(   //조건부? 
                        <tr>{
                        Object.keys(data).map((k)=>
                        {
                           if(k=='MEGA_CD' || k=='MEGA_CD_NM' || k=='SVC_INDUTY_CD' || k=='SVC_INDUTY_CD_NM') return null;
                            
                           return <td>{data[k]}</td>
                        })}
                        </tr>
                     ))
                     }
                  </table>
                  )
               }
         </div>               
   )
}


export default Newstore;
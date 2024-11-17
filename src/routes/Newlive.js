import React from "react";
import { useEffect,useState } from "react";
import { ResponsiveLine } from "@nivo/line";

function Newlive(props){
   const [liveData,setliveData] = useState([]);
   const [serchDate,setserchDate] = useState('20240930');
   useEffect(()=>{
      const getfetchData=()=>{
         fetch(`http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API}/json/SPOP_LOCAL_RESD_DONG/1/25/${serchDate}/ /${props.liveCode}`)
         .then((response)=>response.json())
         .then((json)=>{
            if (json.SPOP_LOCAL_RESD_DONG && json.SPOP_LOCAL_RESD_DONG.row) {
               setliveData(json.SPOP_LOCAL_RESD_DONG.row);
            } else {
               alert("데이터를 불러올 수 없습니다.");
            }
            
         })
         .catch((error) => {
            console.error("데이터 요청 오류:", error);
            alert("데이터 요청 중 오류가 발생했습니다.");
         });
      }
      getfetchData();
      },[serchDate,props.liveCode])
   
   const today = new Date(); // 현재 날짜 받아옴
   const maxData=`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()-1}`;

   const chartData=[{id:props.Dname,
      data:liveData.map((k)=>({x:k.TMZON_PD_SE,y:k.TOT_LVPOP_CO}))
   }];

   const onChangeDate=(e)=>{
      const tmp=e.target.value.split('-');
      const tmp2 = `${tmp[0]}${tmp[1]}${tmp[2]}`;
      setserchDate(tmp2);
   }
   return(
      <div style={{position:'absolute',width:'1000px',top:125,left:20,
         height:'500px',backgroundColor:'white', zIndex:500, overflow:'scroll'}}>
            
            {maxData.length>0&&(<input type="date" min={'2018-01-01'} max={maxData} onChange={onChangeDate} style={{width:'150px'}}/>)}
            {serchDate.length>0&& chartData.length>0&&(<ResponsiveLine 
            data={
               chartData
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

      </div>
   )
}

export default Newlive;
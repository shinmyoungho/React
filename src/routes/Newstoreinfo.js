import React, { useEffect,useState } from "react";
import { ResponsiveLine } from "@nivo/line";



function NewStoreinfo(props){
   const [store,setstore] = useState([]);
   const [store2,setstore2] = useState([]);
   const [store3,setstore3] = useState([]);
   const [swap,setSwap]= useState('st1');
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
      fetch(`http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API}/json/VwsmMegaStorW/1/1000/`) // 업종 정보
            .then((response)=>response.json())
            .then((json)=>{
            setstore(json.VwsmMegaStorW.row);
         });
            
      fetch(`http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API}/json/VwsmMegaStorW/1001/2000/`)
            .then((response)=>response.json())
            .then((json)=>{
            setstore2(json.VwsmMegaStorW.row);
            
         });
      fetch(`http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API}/json/VwsmMegaStorW/2001/2500/`)
            .then((response)=>response.json())
            .then((json)=>{
            setstore3(json.VwsmMegaStorW.row);
         });
         
   },[])
   const allStore=[...store,...store2,...store3];
   const tmp=allStore.filter(data=>data.SVC_INDUTY_CD_NM ===props.storename).sort((a,b)=>a.STDR_YYQU_CD-b.STDR_YYQU_CD);

   const storeData1=tmp.length>0 ? [{id:'점포 수',data:tmp.map(ob=>({x:ob.STDR_YYQU_CD,y:ob.STOR_CO}))}]:[];
   const storeData2=tmp.length>0 ?[{id:'유사업종 점포 수',data:tmp.map(ob=>({x:ob.STDR_YYQU_CD,y:ob.SIMILR_INDUTY_STOR_CO}))}]:[];
   const storeData3=tmp.length>0 ?[{id:'개업률',data:tmp.map(ob=>({x:ob.STDR_YYQU_CD,y:ob.OPBIZ_RT}))}]:[];
   const storeData4=tmp.length>0 ?[{id:'개업 점포수',data:tmp.map(ob=>({x:ob.STDR_YYQU_CD,y:ob.OPBIZ_STOR_CO}))}]:[];
   const storeData5=tmp.length>0 ?[{id:'폐업률',data:tmp.map(ob=>({x:ob.STDR_YYQU_CD,y:ob.CLSBIZ_RT}))}]:[];
   const storeData6=tmp.length>0 ?[{id:'폐업 점포 수',data:tmp.map(ob=>({x:ob.STDR_YYQU_CD,y:ob.STOR_CO}))}]:[];
   const storeData7=tmp.length>0 ?[{id:'프렌차이즈 점포 수',data:tmp.map(ob=>({x:ob.STDR_YYQU_CD,y:ob.CLSBIZ_STOR_CO}))}]:[];
   const chartData=[...storeData1];
   const chartData2=[...storeData6,...storeData7];
   const chartData3=[...storeData3,...storeData5];
   const chartData4=[...storeData2];
   const chartData5=[...storeData4];
   
   const clickSwap=(e)=>{
      if(e.target.value==='st1'){
         setSwap('st1');
      }
      else if(e.target.value==='st2'){
         setSwap('st2');
      }
      else if(e.target.value==='st3'){
         setSwap('st3');
      }
      else if(e.target.value==='st4'){
         setSwap('st4');
      }
      else{
         setSwap('st5');
      }
   }
   
   
   
   
   
   

   return(
      <div style={{position:'absolute',width:'1000px',top:125,left:20,
         height:'500px',backgroundColor:'white', zIndex:500, overflow:'scroll'}}>
            <button onClick={clickSwap} value={'st1'} style={btnStyle}>점포 수</button>
            <button onClick={clickSwap} value={'st2'} style={btnStyle}>폐 점포수/프렌차이즈(점포수)</button>
            <button onClick={clickSwap} value={'st3'} style={btnStyle}>개/폐업률</button>
            <button onClick={clickSwap} value={'st4'} style={btnStyle}>유사업종 점포수</button>
            <button onClick={clickSwap} value={'st5'} style={btnStyle}>개업 점포수</button>
            {chartData.length>0 && swap==='st1' ?(
               <ResponsiveLine
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
            />
            ):null}
            {chartData2.length>0 && swap==='st2' ?(
            
            <ResponsiveLine
            data={
               chartData2
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
         />
         ):null}
         {chartData3.length>0 && swap==='st3' ?(
               <ResponsiveLine
               data={
                  chartData3
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
            />
            ):null}
            {chartData4.length>0 && swap==='st4' ?(
               <ResponsiveLine
               data={
                  chartData4
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
            />
            ):null}
            {chartData5.length>0 && swap==='st5' ?(
               <ResponsiveLine
               data={
                  chartData5
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
            />
            ):null}
      </div>
   )
}

export default NewStoreinfo;
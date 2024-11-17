import React, { useEffect, useState, useRef } from 'react';

const Total2 = () => {
  const [realEstateData, setRealEstateData] = useState([]);
  const markersAndOverlays = useRef([]);
  const infoWindowRef = useRef(null); 

  useEffect(() => {
    // JSON 파일 불러오기
    fetch(`${process.env.PUBLIC_URL}/real_estate_data.json`)
      .then((response) => response.json())
      .then((data) => {
        setRealEstateData(data);
      });
  }, []);

  const formatPrice = (price) => {
    const numPrice = parseInt(price.replace(/,/g, '')); // 쉼표 제거 
    if (numPrice >= 10000) {
      return `${(numPrice / 10000).toFixed(1)}억`; // 억 단위로 변환
    }
    return `${numPrice}만원`; // 만원 단위는 그대로 표시
  };

  const formatDate = (dateStr) => {
    const year = dateStr.substring(7, 11); 
    const month = dateStr.substring(11, 13); 
    const day = dateStr.substring(14, 16); 
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`; 
  };

  useEffect(() => {
    if (realEstateData.length > 0) {
      const { kakao } = window;

      // 지도 생성
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), 
        level: 5,
      };
      const map = new kakao.maps.Map(container, options);

      //인포윈도우 생성
      infoWindowRef.current = new kakao.maps.InfoWindow({
        zIndex: 1, // 인포윈도우의 z-index 설정
      });

      //커스텀 오버레이 생성
      markersAndOverlays.current = realEstateData.map((item) => {
        const position = new kakao.maps.LatLng(item.latitude, item.longitude);

        // 커스텀 오버레이 내용 생성
        const content = document.createElement('div');
        content.style.position = 'relative';
        content.style.background = '#ebaa52';
        content.style.border = '1px solid #ccc';
        content.style.padding = '8px';
        content.style.borderRadius = '10px';
        content.style.color = '#333';
        content.style.whiteSpace = 'nowrap';
        content.style.textAlign = 'center';

        content.innerHTML = `
          <strong style="font-size: 13px;">${formatPrice(item.price)}</strong><br />
          <span style="font-size: 10px; color: #333;">${item.address}</span>
          <div style="
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 8px;
            border-style: solid;
            border-color: #ebaa52 transparent transparent transparent;
          "></div>
        `;

        const customOverlay = new kakao.maps.CustomOverlay({
          position: position,
          content: content,
          xAnchor: 0.5,
          yAnchor: 0,
          map: null, // 초기 상태에서 숨김
        });

        content.addEventListener('click', () => {
          const infoMessage = `
            <div style="font-size: 13px;">
              주소: ${item.address}<br />
              거래금액: ${formatPrice(item.price)}<br />
              면적: ${item.area}㎡<br />
              날짜: ${formatDate(item.contract_date)}<br />
              용도지역: ${item.land_use}<br />
              건축물용도: ${item.building_use}
            </div>
          `;
          infoWindowRef.current.setContent(infoMessage);
          infoWindowRef.current.setPosition(position); 
          infoWindowRef.current.setMap(map); 
        });

        return { customOverlay };
      });

      kakao.maps.event.addListener(map, 'click', () => {
        infoWindowRef.current.setMap(null);  //지도클릭하면 인포윈도우 사라짐
      });

      // 지도 줌 변경 이벤트에 따른 마커 및 오버레이 표시/숨김
      kakao.maps.event.addListener(map, 'zoom_changed', () => {
        const level = map.getLevel(); // 현재 줌 레벨 가져오기
        markersAndOverlays.current.forEach(({ customOverlay }) => {
          if (level < 6) {
            customOverlay.setMap(map); // 커스텀 오버레이 표시
          } else {
            customOverlay.setMap(null); // 커스텀 오버레이 숨기기
          }
        });
      });

      // 초기 상태에서 오버레이 표시,숨김
      if (map.getLevel() < 4) {
        markersAndOverlays.current.forEach(({ customOverlay }) => {
          customOverlay.setMap(map);
        });
      }
    }
  }, [realEstateData]);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '1000px',
      }}
    ></div>
  );
};

export default Total2;
import React from 'react'

export const fetchStationData = async (stationId: number) => {
  const response = await fetch(
    `https://driver.e-mobipower.co.jp/stationFacade/findStationById?stationId=${stationId}`,
    {
      method: 'GET',
      cache: "no-store", //SSR
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ja-JP',
        'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'X-Csrf-Token': '30ff31b7-f83c-4962-8db0-c8f943c6d414',
        'X-Json-Types': 'None',
        'X-Requested-With': 'XMLHttpRequest'
      },
    }
  );
  try {
    const data = await response.json();
    return data.data;
  } catch(error) {
    console.error('There was a problem with your fetch operation:', error);
  }
};
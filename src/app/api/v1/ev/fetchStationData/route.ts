import React from 'react'
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const stationId = searchParams.get('stationId')
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
        'X-Json-Types': 'None',
        'X-Requested-With': 'XMLHttpRequest'
      },
    }
  );
  const data = await response.json()
  try {
    return NextResponse.json(data.data);
  } catch (error) {
    console.error('There was a problem with parsing JSON response:', error);
    throw error;
  }
};
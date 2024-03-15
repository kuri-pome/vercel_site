
import { NextRequest, NextResponse } from "next/server"


// JSESSIONID, X-Csrf-Token, Accept-Encoding
export async function POST(request: NextRequest) {
  const body = await request.json()
  const response = await fetch(
    'https://driver.e-mobipower.co.jp/stationFacade/findPlacesByQuery',
    {
      method: 'POST',
      cache: "no-store", //SSR
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'ja-JP',
        'Content-Type': 'application/json',
        'Cookie': 'JSESSIONID=1799618368E7AD305B4A990D7148973E',
        'Origin': 'https://driver.e-mobipower.co.jp',
        'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'X-Csrf-Token': '2b9750da-531b-4ceb-828c-ee13e4a206f3',
        'X-Json-Types': 'None',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ "filterByFreeText": body.stationName })
    }
  );
  const data = await response.json()
  try {
    return NextResponse.json(data.data);
  } catch (error) {
    console.error('There was a problem with parsing JSON response:', error);
    throw error;
  }
}


// curl -X POST   https://driver.e-mobipower.co.jp/stationFacade/findPlacesByQuery   -H 'Accept: application/json, text/javascript, */*; q=0.01'   -H 'Accept-Encoding: gzip, deflate, br'   -H 'Accept-Language: ja-JP'   -H 'Content-Type: application/json'   -H 'Origin: https://driver.e-mobipower.co.jp'   -H 'Sec-Ch-Ua: "Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"'   -H 'Sec-Ch-Ua-Mobile: ?0'   -H 'Sec-Ch-Ua-Platform: "Windows"'   -H 'Sec-Fetch-Dest: empty'   -H 'Sec-Fetch-Mode: cors'   -H 'Sec-Fetch-Site: same-origin'   -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'   -H 'X-Json-Types: None'   -H 'X-Requested-With: XMLHttpRequest'   -d '{
//   "filterByFreeText": "イオンスタイル東淀川　急速１"
// }' --compressed
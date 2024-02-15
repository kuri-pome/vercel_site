
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const response = await fetch(
    'https://driver.e-mobipower.co.jp/stationFacade/findPlacesByQuery',
    {
      method: 'POST',
      cache: "no-store", //SSR
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ja-JP',
        'Content-Type': 'application/json',
        'Cookie': 'JSESSIONID=D1E6158E39E8ECB18BFB1B5329E3ACD4',
        'Origin': 'https://driver.e-mobipower.co.jp',
        'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'X-Csrf-Token': 'df52db27-29d3-45a7-835f-36d9454e054b',
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
"use client";
import { useState } from "react"
import Link from "next/link"


const fetchFlyerRandomCustomers = async (customerTable, setCustomerCode, setCustomerCodes) => {
    const response = await fetch(`http://localhost:3000/api/v1/fetchFlyerRandomCustomers`, {
        method: "POST"
        , headers: {"Content-Type": "application/json"}
        , body: JSON.stringify({project: "monotaro-flyer-creation-dev", table_id: customerTable})
    })
    const data = await response.json()
    setCustomerCode(data["customer_codes"][0])
    setCustomerCodes(data["customer_codes"])
}

const fetchFlyerCustomerData = async (customerTable: string, customerCode: string, setCustomerData: React.Dispatch<React.SetStateAction<never[]>>) => {
    const response = await fetch(`http://localhost:3000/api/v1/fetchFlyerCustomerData`, {
        method: "POST"
        , headers: {"Content-Type": "application/json"}
        , body: JSON.stringify({project: "monotaro-flyer-creation-dev", table_id: customerTable, customer_code: customerCode})
    })
    const data = await response.json()
    setCustomerData(data)
    console.log(data)
}

export const WorkflowTest2Setting = (props) => {
    const [customerTable, setTable] = useState("monotaro-flyer-creation.flyer_personalized.recommend_data_check_random_20240502");
    const [customerCode, setCustomerCode] = useState("");
    const [customerCodes, setCustomerCodes] = useState([]);
    var style = {
        title: {
            fontSize: "1.5rem",
            fontWeight: "bold",
            borderBottom: "2px solid",
            paddingBottom: "5px",
            marginBottom: "10px",
        },
    }
    return (
        <div className="h-full bg-gray-100">
            <div style={style.title}>絞り込み</div>
            <div className="flex flex-col">
                <div className="">・テーブル名</div>
                <input
                    className="mb-4 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white"
                    id="name"
                    type="text"
                    value="monotaro-flyer-creation.flyer_personalized.recommend_data_check_random_20240502"
                    onChange={(e) => setTable(e.target.value)}
                ></input>
            </div>
            <button
                className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
                onClick={() => fetchFlyerRandomCustomers(customerTable, setCustomerCode, setCustomerCodes)}
            >
                    顧客一覧取得
            </button>
            <div className="py-4"></div>
            <div className="flex flex-col">
                <div className="">・顧客一覧</div>
                <select
                    className="bg-gray-200 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white"
                    onChange={(e) => setCustomerCode(e.target.value)}
                >
                    {customerCodes.map((customerCode) => (
                        <option key={customerCode}>{customerCode}</option>
                    ))}
                </select>
            </div>
                <div className="">・チラシサイズ width*height(px)</div>
                <div>
                    <input
                        className="mb-4 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white"
                        id="flyer_width"
                        type="text"
                        value={props.flyerPageWidth}
                        onChange={(e) => props.setFlyerPageWidth(e.target.value)}
                    ></input>
                    <input
                        className="mb-4 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white"
                        id="flyer_height"
                        type="text"
                        value={props.flyerPageHeight}
                        onChange={(e) => props.setFlyerPageHeight(e.target.value)}
                    ></input>
                </div>
            <button
                className="py-2 px-4 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
                onClick={() => fetchFlyerCustomerData(customerTable, customerCode, props.setCustomerData)}
            >
                顧客のチラシデータ生成
            </button>
        </div>
    )
}

export default WorkflowTest2Setting;
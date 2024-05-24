import React from 'react'
import Link from "next/link"

const page = () => {

  const apps: Array<string> = [
    "ev",
    "workflow"
  ];
  return (
    <>
      <div className='justify-center items-center'>
        <div className='text-3xl'>
          <h1>app一覧</h1>
        </div>
        <div className="bg-green-400">
          <ul>
            {
              apps.map((apps, index) => (
                <li key={index}><Link href={`/apps/${apps}`}>・{apps}</Link></li>
              ))
            }
          </ul>
        </div>
      </div >
    </>
  )
};

export default page;
import React from 'react'
import Link from "next/link"

export const page = () => {

  const apps: Array<string> = [
    "ev",
  ];
  return (
    <>
      <h1>app一覧</h1>
      <ul>
        {
          apps.map((apps, index) => (
            <li key={index}><Link href={`/apps/${apps}`}>{apps}</Link></li>
          ))
        }
      </ul>
    </>
  )
};

export default page;
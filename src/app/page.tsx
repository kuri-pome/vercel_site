import Link from "next/link"
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div>
        <Image
          src="/top_text.jpg"
          alt="Description of image"
          width={1280}
          height={655}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className="container mx-auto ">
        <div>
          <h1 className="italic text-5xl font-bold py-5">About this site.</h1>
          <p className="pb-8 border-b border-slate-400">
            このサイトはWebエンジニアのポートフォリオサイトです。
            プロフィール、作成したアプリ、ブログ等を紹介しています。
          </p>
        </div>
        <div>
          <h1 className="italic text-5xl font-bold py-5">Profile.</h1>
          <p className="pb-8 border-b border-slate-400">
            自己紹介
          </p>
        </div>
        <div>
          <h1 className="italic text-5xl font-bold py-5">Work.</h1>
          <p className="pb-8 border-b border-slate-400">
            経歴
          </p>
        </div>
        <div>
          <h1 className="italic text-5xl font-bold py-5">Blog.</h1>
          <p className="pb-8 border-b border-slate-400">
            ブログ
          </p>
        </div>
        <div>
          <h1 className="italic text-5xl font-bold py-5">apps.</h1>
          <p className="pb-8 border-b border-slate-400">
            アプリ一覧
          </p>
        </div>
      </div>
    </>
  )
}

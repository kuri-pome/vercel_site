import Link from "next/link"
import styles from "./Header.module.css"


export const Header = () => {
  const headers: Array<string> = [
    "profile",
    "work",
    "blog",
    "apps",
  ]

  return (
    // <header className={styles.root_title}>
    <header>
      <nav className={styles.nav}>
        <h1>Kuripome Site</h1>
        <ul className={styles.ul}>
          {
            headers.map((header, index) => (
              <li key={index} className={styles.li}><Link href={`/${header}`}>{header}</Link></li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}

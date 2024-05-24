import Link from "next/link"
import styles from "./Header.module.css"


export const Header = () => {
  const menuItems: Array<string> = [
    { name: "profile", link: "/profile" },
    { name: "work", link: "/work" },
    { name: "blog", link: "/blog" },
    { name: "apps", link: "/apps" },
  ]

  return (
    <>
      <header className={styles.container}>

        <div className={styles.site_name}>
              <Link href="/">Kuripome Site</Link>
        </div>
        <nav>
            <ul className={styles.menu_list}>
                {menuItems.map((menuItem) => (
                    <li className={styles.menu_item} key={menuItem.name}>
                        <Link href={menuItem.link} className={styles.menu_link}>{menuItem.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>

        {/* <nav className={styles.nav}>
          <h1><Link href="/">Kuripome Site</Link></h1>
          <ul className={styles.ul}>
            {
              headers.map((header, index) => (
                <li key={index} className={styles.li}><Link href={`/${header}`}>{header}</Link></li>
              ))
            }
          </ul>
        </nav> */}
      </header>
    </>
  )
}

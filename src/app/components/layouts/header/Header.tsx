import Link from "next/link"
import styles from "./Header.module.css"


export const Header = () => {
  const menuItems: Array<{name: string, link: string}> = [
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
      </header>
    </>
  )
}

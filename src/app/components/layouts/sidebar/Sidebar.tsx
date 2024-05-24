import Link from 'next/link'
import styles from './Sidebar.module.css'
import { menuItemsType } from './SidebarType';


interface SidebarProps {
  menuItems: menuItemsType[];
  title: string
  link_base: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ menuItems, title, link_base }) => {
    return (
        <aside>
            <div className={styles.section}>
                <div className={styles.heading}>{title}</div>
            </div>
            {menuItems.map((menuItem) => (
                <div className={styles.section} key={menuItem.title}>
                    <div className={styles.heading}>{menuItem.title}</div>
                    {menuItem.subItems.map(item => (
                        <Link
                            href={`/${link_base}/${item.link}`}
                            key={item.subTitle}
                        >
                            <p className={styles.link}>
                                {item.link}
                            </p>
                        </Link>
                    ))}
                </div>
            ))}
        </aside>
    )
}

export default Sidebar;
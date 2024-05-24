import type { Metadata } from "next";
import React from 'react'
import styles from './page.module.css';
import Sidebar from "@/app/components/layouts/sidebar/Sidebar";
import { menuItemsType } from '@/app/components/layouts/sidebar/SidebarType';

export const metadata: Metadata = {
  title: "ワークフロー",
  description: "ワークフロー",
};

export default function WorkflowLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const title: string = "workflow"
  const link_base: string = "apps/workflow"
  const menuItems: Array<menuItemsType> = [
    {title: "check", subItems: [{subTitle: "test1", link: "test1"}, {subTitle: "test2", link: "test2"}]},
    {title: "dummy_title", subItems: [{subTitle: "dummy", link: "dummy"}]}
  ];
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Sidebar menuItems={menuItems} title={title} link_base={link_base}/>
      </div>
      <div className={styles.main}>
        {children}
      </div>
    </div>
  )
}

"use client";
import React from 'react';
import dynamic from "next/dynamic";
import MapLayout from './MapLayout';
// import styles from "./FarmMap.module.css"


export const FarmMap = () => {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("./MapLayout"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <Map/>
  )
};
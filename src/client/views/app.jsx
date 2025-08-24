import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { TopBar } from "@oliasoft-open-source/react-ui-library";
import Logo from "client/views/images/logo.svg";
import { Main } from "client/views/main/main";
import { SiteDetails } from "./site-details/site-details";
import { OilRigs } from "../components/oil-rigs/oil-rigs";
import { OilRigsView } from "./oil-rigs/oil-rigs-view";

export const App = () => {
  return (
    <>
      <TopBar
        title={{
          logo: <img src={Logo} alt="logo" style={{ height: 28 }} />,
        }}
      />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sites/:id" element={<SiteDetails />} />
        <Route path="/oil-rigs" element={<OilRigsView />} />
      </Routes>
    </>
  );
};

import React from "react";
import { Menubar } from "primereact/menubar";

import "./TopMenubar.scss";

const items = [
  {label: "About", icon: "pi pi-fw pi-heart"},
  {label: "Full Stack", icon: "pi pi-fw pi-th-large"},
  {label: "Big Data", icon: "pi pi-fw pi-cloud"},
  {label: "Journal", icon: "pi pi-fw pi-calendar"}
];

const start = () => <img alt="logo" src="favicon.ico" height="30" className="p-pl-5 p-pr-5"></img>;

const TopMenubar = () => <Menubar className="p-shadow-1 g-top-menubar" model={items} start={start}  />;

export default TopMenubar;

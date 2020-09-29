import React from "react";
import { Menu } from "primereact/menu";

const items = [
  { label: "Cross-site Scripting (XSS)" },
  { label: "Cross-site Request Forgery (CSRF)" },
];

const SideMenubar = () => <Menu className="p-pt-2 " style={{ width: "15rem" }} model={items} />;

export default SideMenubar;

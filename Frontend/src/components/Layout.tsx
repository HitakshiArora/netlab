
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Layout.css";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="app-layout">
      <Sidebar collapsed={collapsed} />

      <div className="app-main">
        <Header
          search={search}
          onSearchChange={setSearch}
          onMenuClick={() => setCollapsed((value) => !value)}
        />

        <main className="page-content">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}

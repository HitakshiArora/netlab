
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Monitor,
  Cpu,
  MapPin,
  Network,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";
import "./Sidebar.css";

interface SidebarProps {
  collapsed: boolean;
}

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Desktop", path: "/desktops", icon: Monitor },
  { label: "Devices", path: "/devices", icon: Cpu },
  { label: "Locations", path: "/locations", icon: MapPin },
  { label: "HYNEX", path: "/hynex", icon: Network },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Users", path: "/users", icon: Users },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <nav className="sidebar-nav">
        {!collapsed && <span className="nav-heading">WORKSPACE</span>}

        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={19} strokeWidth={1.8} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <div className="footer-dot" />
          <div>
            <strong>NetLAB Workspace</strong>
            <span>Inventory management</span>
          </div>
        </div>
      )}
    </aside>
  );
}

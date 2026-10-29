
import {
  Menu,
  Search,
  Bell,
  CircleHelp,
  ChevronDown,
} from "lucide-react";
import "./Header.css";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  onMenuClick: () => void;
}

export default function Header({
  search,
  onSearchChange,
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="top-header">
      <div className="header-left">
        <button
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <Menu size={23} strokeWidth={1.8} />
        </button>

        <div className="header-brand">
          <span className="brand-name">
            HiTech <strong>NetLAB</strong>
          </span>
          <span className="brand-subtitle">LAB INVENTORY MANAGEMENT</span>
        </div>
      </div>

      <div className="header-search">
        <Search size={18} />
        <input
          type="search"
          placeholder="Search inventory..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Search inventory"
        />
        <kbd>Ctrl K</kbd>
      </div>

      <div className="header-actions">
        <button className="header-icon" aria-label="Help">
          <CircleHelp size={19} />
        </button>

        <button
          className="header-icon notification-button"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <div className="header-divider" />

        <button className="profile-button">
          <span className="avatar">NL</span>
          <span className="profile-text">
            <strong>NetLAB</strong>
            <small>Administrator</small>
          </span>
          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}

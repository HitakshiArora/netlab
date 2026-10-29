
import { useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Plus,
  Search,
  Upload,
  Download,
  RefreshCw,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Monitor,
  Filter,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import { desktopApi } from "../api/desktopApi";
import type { Desktop, DesktopPayload } from "../types/desktop";
import "./Desktops.css";

type OutletContext = { search: string };

const emptyForm: DesktopPayload = {
  serviceTag: "",
  description: "",
  hardwareConf: "",
  location: "",
  ipAddress: "",
  os: "",
  team: "",
  status: "",
  purchaseBy: "",
};

const fields: { key: keyof DesktopPayload; label: string; required?: boolean }[] = [
  { key: "serviceTag", label: "Service Tag", required: true },
  { key: "description", label: "Description", required: true },
  { key: "hardwareConf", label: "Hardware Configuration" },
  { key: "location", label: "Location" },
  { key: "ipAddress", label: "IP Address" },
  { key: "os", label: "Operating System" },
  { key: "team", label: "Team" },
  { key: "status", label: "Status" },
  { key: "purchaseBy", label: "Purchased By" },
];

export default function Desktops() {
  const { search: globalSearch } = useOutletContext<OutletContext>();
  const fileInput = useRef<HTMLInputElement>(null);

  const [desktops, setDesktops] = useState<Desktop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<Desktop | null>(null);
  const [form, setForm] = useState<DesktopPayload>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function loadDesktops() {
    setLoading(true);
    setError("");

    try {
      const data = await desktopApi.getAll();
      if (!Array.isArray(data)) {
        throw new Error("The desktop API did not return a list.");
      }
      setDesktops(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load inventory.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadDesktops();
  }, []);

  const locations = useMemo(
    () => [...new Set(desktops.map((d) => d.location).filter(Boolean))].sort(),
    [desktops]
  );

  const statuses = useMemo(
    () => [...new Set(desktops.map((d) => d.status).filter(Boolean))].sort(),
    [desktops]
  );

  const filtered = useMemo(() => {
    const term = `${globalSearch} ${search}`.trim().toLowerCase();

    return desktops.filter((d) => {
      const matchesSearch =
        !term ||
        [
          d.serviceTag,
          d.description,
          d.hardwareConf,
          d.location,
          d.ipAddress,
          d.os,
          d.team,
          d.status,
          d.purchaseBy,
        ].some((value) => String(value ?? "").toLowerCase().includes(term));

      return (
        matchesSearch &&
        (!locationFilter || d.location === locationFilter) &&
        (!statusFilter || d.status === statusFilter)
      );
    });
  }, [desktops, globalSearch, search, locationFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visible = filtered.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    setPage(1);
  }, [search, globalSearch, locationFilter, statusFilter, pageSize]);

  function openAdd() {
    setSelected(null);
    setForm({ ...emptyForm });
    setModal("add");
    setNotice("");
  }

  function openEdit(desktop: Desktop) {
    setSelected(desktop);
    const { id: _id, ...payload } = desktop;
    setForm(payload);
    setModal("edit");
    setNotice("");
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      if (modal === "edit" && selected) {
        await desktopApi.update(selected.id, form);
        setNotice("Desktop updated successfully.");
      } else {
        await desktopApi.create(form);
        setNotice("Desktop added successfully.");
      }

      setModal(null);
      await loadDesktops();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save desktop.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(desktop: Desktop) {
    const confirmed = window.confirm(
      `Delete desktop "${desktop.serviceTag}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      await desktopApi.delete(desktop.id);
      setNotice("Desktop deleted successfully.");
      if (selected?.id === desktop.id) setModal(null);
      await loadDesktops();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete desktop.");
    }
  }

  async function handleUpload(file?: File) {
    if (!file) return;

    setUploading(true);
    setError("");
    setNotice("");

    try {
      await desktopApi.uploadExcel(file);
      await loadDesktops();
      setNotice("Excel upload request completed. Inventory has been refreshed.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Excel upload failed.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  async function handleDownload() {
    setError("");

    try {
      const blob = await desktopApi.downloadExcel();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "desktop-inventory.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Excel download failed.");
    }
  }

  return (
    <div className="desktops-page">
      <div className="desktop-breadcrumb">
        <span>Workspace</span>
        <span>/</span>
        <strong>Desktop Inventory</strong>
      </div>

      <section className="desktop-page-heading">
        <div>
          <div className="desktop-title-row">
            <span className="desktop-title-icon"><Monitor size={23} /></span>
            <h1>Desktop Inventory</h1>
          </div>
          <p>Manage and monitor your lab desktop assets in one place.</p>
        </div>

        <button className="desktop-primary-btn" onClick={openAdd}>
          <Plus size={17} />
          Add Desktop
        </button>
      </section>

      <section className="desktop-summary">
        <div className="desktop-summary-icon"><Monitor size={21} /></div>
        <div>
          <span>Total desktops</span>
          <strong>{loading ? "—" : desktops.length.toLocaleString()}</strong>
          <small>Records returned by the backend</small>
        </div>
        <div className="desktop-summary-divider" />
        <div className="desktop-summary-secondary">
          <span>Filtered results</span>
          <strong>{loading ? "—" : filtered.length.toLocaleString()}</strong>
        </div>
      </section>

      <section className="desktop-table-card">
        <div className="desktop-card-heading">
          <div>
            <h2>All Desktops</h2>
            <p>Inventory records retrieved from the database</p>
          </div>

          <div className="desktop-toolbar-actions">
            <button
              className="desktop-outline-btn"
              onClick={() => fileInput.current?.click()}
              disabled={uploading}
            >
              {uploading ? <LoaderCircle size={16} className="desktop-spin" /> : <Upload size={16} />}
              {uploading ? "Uploading..." : "Import Excel"}
            </button>
            <input
              ref={fileInput}
              type="file"
              accept=".xlsx,.xls"
              hidden
              onChange={(event) => void handleUpload(event.target.files?.[0])}
            />
            <button className="desktop-outline-btn" onClick={() => void handleDownload()}>
              <Download size={16} />
              Export
            </button>
            <button
              className="desktop-refresh-btn"
              onClick={() => void loadDesktops()}
              title="Refresh inventory"
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? "desktop-spin" : ""} />
            </button>
          </div>
        </div>

        <div className="desktop-filters">
          <div className="desktop-table-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by tag, name, IP address..."
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X size={15} />
              </button>
            )}
          </div>

          <div className="desktop-filter-label">
            <Filter size={15} />
            Filters
          </div>

          <select
            value={locationFilter}
            onChange={(event) => setLocationFilter(event.target.value)}
            aria-label="Filter by location"
          >
            <option value="">All locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {(search || locationFilter || statusFilter) && (
            <button
              className="desktop-clear-filters"
              onClick={() => {
                setSearch("");
                setLocationFilter("");
                setStatusFilter("");
              }}
            >
              Clear
            </button>
          )}
        </div>

        {error && (
          <div className="desktop-message desktop-error">
            <AlertCircle size={17} />
            <span>{error}</span>
            <button onClick={() => setError("")} aria-label="Dismiss error"><X size={16} /></button>
          </div>
        )}

        {notice && (
          <div className="desktop-message desktop-success">
            <span>{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={16} /></button>
          </div>
        )}

        <div className="desktop-table-scroll">
          <table className="desktop-table">
            <thead>
              <tr>
                <th>SERVICE TAG</th>
                <th>DESCRIPTION</th>
                <th>LOCATION</th>
                <th>OPERATING SYSTEM</th>
                <th>STATUS</th>
                <th className="desktop-actions-column">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="desktop-table-state">
                    <LoaderCircle className="desktop-spin" size={22} />
                    <span>Loading inventory from backend...</span>
                  </td>
                </tr>
              ) : visible.length === 0 ? (
                <tr>
                  <td colSpan={6} className="desktop-table-state">
                    <Monitor size={25} />
                    <strong>No desktops found</strong>
                    <span>Try changing your search or filters.</span>
                  </td>
                </tr>
              ) : (
                visible.map((desktop) => (
                  <tr key={desktop.id}>
                    <td>
                      <button
                        className="desktop-tag-link"
                        onClick={() => {
                          setSelected(desktop);
                          setModal("view");
                        }}
                      >
                        {desktop.serviceTag || "—"}
                      </button>
                    </td>
                    <td>
                      <div className="desktop-description-cell">
                        <span className="desktop-row-icon"><Monitor size={17} /></span>
                        <span title={desktop.description}>{desktop.description || "—"}</span>
                      </div>
                    </td>
                    <td>{desktop.location || "—"}</td>
                    <td>{desktop.os || "—"}</td>
                    <td>
                      <span className={`desktop-status ${desktop.status?.toLowerCase() === "active" ? "is-active" : "is-other"}`}>
                        <span />
                        {desktop.status || "Unknown"}
                      </span>
                    </td>
                    <td>
                      <div className="desktop-row-actions">
                        <button title="View details" onClick={() => { setSelected(desktop); setModal("view"); }}>
                          <Eye size={16} />
                        </button>
                        <button title="Edit desktop" onClick={() => openEdit(desktop)}>
                          <Pencil size={16} />
                        </button>
                        <button className="desktop-delete-action" title="Delete desktop" onClick={() => void handleDelete(desktop)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="desktop-pagination">
          <span>
            {filtered.length === 0
              ? "Showing 0 records"
              : `Showing ${startIndex + 1}–${Math.min(startIndex + pageSize, filtered.length)} of ${filtered.length} records`}
          </span>

          <div className="desktop-pagination-controls">
            <label>
              Rows
              <select
                value={pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
              >
                {[10, 20, 50].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </label>

            <button
              disabled={currentPage <= 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
            </button>
            <span className="desktop-page-number">{currentPage} / {totalPages}</span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              aria-label="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {modal && (
        <div className="desktop-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !saving) setModal(null);
        }}>
          <section className="desktop-modal" role="dialog" aria-modal="true">
            <div className="desktop-modal-header">
              <div>
                <h2>
                  {modal === "add" ? "Add Desktop" : modal === "edit" ? "Edit Desktop" : "Desktop Details"}
                </h2>
                <p>
                  {modal === "view"
                    ? `Record ID: ${selected?.id ?? "—"}`
                    : "Enter the desktop information below."}
                </p>
              </div>
              <button className="desktop-modal-close" onClick={() => setModal(null)} disabled={saving}>
                <X size={19} />
              </button>
            </div>

            {modal === "view" && selected ? (
              <div className="desktop-details-grid">
                {fields.map(({ key, label }) => (
                  <div className="desktop-detail-item" key={key}>
                    <span>{label}</span>
                    <strong>{selected[key] || "—"}</strong>
                  </div>
                ))}
                <div className="desktop-detail-item">
                  <span>Database ID</span>
                  <strong>{selected.id}</strong>
                </div>
              </div>
            ) : (
              <form onSubmit={(event) => void handleSave(event)}>
                <div className="desktop-form-grid">
                  {fields.map(({ key, label, required }) => (
                    <label key={key} className={key === "description" || key === "hardwareConf" ? "desktop-form-wide" : ""}>
                      <span>{label}{required && <b> *</b>}</span>
                      <input
                        value={form[key]}
                        onChange={(event) => setForm((current) => ({
                          ...current,
                          [key]: event.target.value,
                        }))}
                        required={required}
                        placeholder={`Enter ${label.toLowerCase()}`}
                      />
                    </label>
                  ))}
                </div>

                <div className="desktop-modal-footer">
                  <button type="button" className="desktop-outline-btn" onClick={() => setModal(null)} disabled={saving}>
                    Cancel
                  </button>
                  <button type="submit" className="desktop-primary-btn" disabled={saving}>
                    {saving && <LoaderCircle size={16} className="desktop-spin" />}
                    {saving ? "Saving..." : modal === "edit" ? "Save Changes" : "Create Desktop"}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

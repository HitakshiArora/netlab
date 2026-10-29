import { useLocation } from "react-router-dom";

export default function Placeholder() {
  const location = useLocation();
  const page = location.pathname.split("/").filter(Boolean).pop() ?? "Dashboard";

  return (
    <section>
      <h1>{page.charAt(0).toUpperCase() + page.slice(1)}</h1>
      <p>This page will be implemented next.</p>
    </section>
  );
}
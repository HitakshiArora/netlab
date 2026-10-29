
import type { Desktop, DesktopPayload } from "../types/desktop";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, options);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return response.text() as Promise<T>;
}

export const desktopApi = {
  getAll: () => request<Desktop[]>("/desktops"),

  getById: (id: number) =>
    request<Desktop>(`/desktops/${id}`),

  create: (desktop: DesktopPayload) =>
    request<Desktop>("/desktops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(desktop),
    }),

  update: (id: number, desktop: DesktopPayload) =>
    request<Desktop>(`/desktops/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(desktop),
    }),

  delete: (id: number) =>
    request<void>(`/desktops/${id}`, {
      method: "DELETE",
    }),

  uploadExcel: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return request<unknown>("/desktops/upload", {
      method: "POST",
      body: formData,
    });
  },

  downloadExcel: async (): Promise<Blob> => {
    const response = await fetch(`${BASE_URL}/desktops/download`);

    if (!response.ok) {
      throw new Error("Failed to download Excel");
    }

    return response.blob();
  },
};

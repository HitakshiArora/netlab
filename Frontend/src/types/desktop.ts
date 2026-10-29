export interface Desktop {
  id: number;
  serviceTag: string;
  description: string;
  hardwareConf: string;
  location: string;
  ipAddress: string;
  os: string;
  team: string;
  status: string;
  purchaseBy: string;
}

export type DesktopPayload = Omit<Desktop, "id">;
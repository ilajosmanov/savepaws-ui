export type OrderPayload = {
  location: number[];
  locationName: string;
  name: string;
  phone: string;
  injury: string;
  documents?: string[];
  quantity: number;
  canWait: boolean;
}

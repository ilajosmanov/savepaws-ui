export type OrderPayload = {
  location: number[];
  name: string;
  phone: string;
  injury: string;
  documents?: string[];
  quantity: number;
  canWait: boolean;
}

export type OrderPayload = {
  location: (string | number)[];
  name: string;
  phone: string;
  injury: string;
  documents?: string[];
  quantity: number;
  canWait: boolean;
}

export type ItemStatus = 'idle' | 'weighing' | 'completed';

export interface BackendOption {
  Text: string;
  Number: number;
  ImgUrl: string;
}

export interface ItemData {
  id: number;
  text: string;
  weight: number;
  imgUrl: string;
  status: ItemStatus;
  answer: string;
  width: number;
  height: number;
}
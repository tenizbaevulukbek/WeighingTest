import { BackendOption, ItemData } from '../types';

const backendResponse = {
  questionId: 748,
  questionText: "Взвесь предметы и животных",
  options: [
    { Text: "Сколько весит тыква", Number: 7, ImgUrl: "/pumpkin.png" },
    { Text: "Сколько весит рыба", Number: 9, ImgUrl: "/fish.png" },
    { Text: "Сколько весит чайник", Number: 8, ImgUrl: "/teapot.png" }
  ] as BackendOption[]
};

const dimensions = [
  { width: 148, height: 135 },
  { width: 132, height: 114 },
  { width: 172, height: 187 }
];

export const initialItems: ItemData[] = backendResponse.options.map((opt, index) => ({
  id: index + 1,
  text: opt.Text.replace('***', ''),
  weight: opt.Number,
  imgUrl: opt.ImgUrl,
  status: 'idle',
  answer: '',
  width: dimensions[index].width,
  height: dimensions[index].height
}));
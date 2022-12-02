import { IColumn } from '../types';

export const reorder = (list: IColumn[], startIndex: number, endIndex: number): IColumn[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

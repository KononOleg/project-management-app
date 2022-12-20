import { IColumn, ITask } from '../types';

export const reorder = (
  list: IColumn[] | ITask[],
  startIndex: number,
  endIndex: number
): IColumn[] | ITask[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

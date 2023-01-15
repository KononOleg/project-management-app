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

const stringToColor = (string: string) => {
  const stringUniqueHash = string.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
};

export const stringAvatar = (name: string, size: number) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size,
      height: size,
      fontSize: size / 2,
    },
    children: `${name.split(' ')[0][0]}`,
  };
};

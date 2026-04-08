export interface PagingResponse<T> {
  totalCount: number;
  value: T[];
}
export const createCartItemId = (
  id: number,
  sugar: string,
  ice: string,
  coffeeLevel: string,
  note?: string,
) => {
  return `${id}-s${sugar}-i${ice}-c${coffeeLevel}-n${note ?? ''}`;
};

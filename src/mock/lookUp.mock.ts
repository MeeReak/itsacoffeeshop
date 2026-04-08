import { LookupItem, LookupReadDto } from '@/hooks/useLookUp';

export const mockLookUps: LookupReadDto = {
  ices: [
    { id: 1, name: 'No Ice' },
    { id: 2, name: 'Less Ice' },
    { id: 3, name: 'Normal Ice' },
    { id: 4, name: 'More Ice' },
    { id: 5, name: 'Ice Separate' },
  ] as LookupItem[],
  sizes: [
    { id: 1, name: 'Small' },
    { id: 2, name: 'Medium' },
  ] as LookupItem[],
  sugars: [
    { id: 1, name: 'No Sweet' },
    { id: 2, name: 'Less Sweet' },
    { id: 3, name: 'Normal Sweet' },
    { id: 4, name: 'More Sweet' },
  ] as LookupItem[],
  coffeeLevels: [
    {
      id: 1,
      name: 'Less Coffee',
    },
    {
      id: 2,
      name: 'Normal Coffee',
    },
    {
      id: 3,
      name: 'Extra Shot',
    },
  ] as LookupItem[],
  variations: [
    { id: 1, name: '1 Set' },
    { id: 2, name: '2 Sets' },
  ] as LookupItem[],
};

export const getLookUpsMock = async (): Promise<{
  ices: LookupItem[];
  sizes: LookupItem[];
  sugars: LookupItem[];
  coffeeLevels: LookupItem[];
  variations: LookupItem[];
}> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockLookUps;
};

import { LookupReadDto } from '@/hooks/useLookUp';
import { getAxios } from '@/lib/axios';

const axios = getAxios();

export const getLookUps = async (): Promise<LookupReadDto[]> => {
  const { data } = await axios.get('/lookups?api-version=2026-01-01');
  return data;
};

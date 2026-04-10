import { getAxios } from '@/lib/axios';
import { LookUpListResponse } from '@/types/api/lookUp';

const axios = getAxios();

export const getLookups = async (): Promise<LookUpListResponse> => {
  const { data } = await axios.get('/lookups');
  return data;
};

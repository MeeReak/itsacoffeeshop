import { lookUpService } from '@/service/lookUp.service';
import { useQuery } from '@tanstack/react-query';

export interface LookupReadDto {
  ices: LookupItem[];
  sizes: LookupItem[];
  sugars: LookupItem[];
  coffeeLevels: LookupItem[];
  variations: LookupItem[];
}

export interface LookupItem {
  id: number;
  name: string;
  createdAt: string;
  price?: number;
}

export const useLookups = () => {
  return useQuery<LookupReadDto>({
    queryKey: ['lookups'],
    queryFn: async () => {
      const response = await lookUpService.getLookups();
      if ('data' in response) {
        return response as LookupReadDto;
      }
      return response as LookupReadDto;
    },
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

import { LookupReadDto } from '@/hooks/useLookUp';
import { PaginatedResponse } from './pagination';

export type LookUpListResponse = PaginatedResponse<LookupReadDto>;

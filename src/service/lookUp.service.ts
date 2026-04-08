import * as mock from '../mock/lookUp.mock';
import * as api from '../api/lookUp.api';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const lookUpService = useMock ? mock : api;

import * as mock from '../mock/category.mock';
import * as api from '../api/category.api';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const categoryService = useMock ? mock : api;

import * as mock from '../mock/product.mock';
import * as api from '../api/product.api';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const productService = useMock ? mock : api;

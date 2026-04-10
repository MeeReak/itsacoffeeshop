import * as mock from '../mock/order.mock';
import * as api from '../api/order.api';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// Note: If you have specialized order mocks, create and import them here.
export const orderService = useMock ? mock : api;

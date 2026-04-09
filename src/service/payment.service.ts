import * as mock from '../mock/payment.mock';
import * as api from '../api/payment.api';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const paymentService = useMock ? mock : api;

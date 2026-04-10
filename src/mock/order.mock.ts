import { Order, OrderPayload, OrderResponse } from '@/types/api/order';

const mockOrders: Order[] = [
  {
    id: 126,
    number: 'ORD-123456',
    type: 1,
    status: 1,
    subTotal: 10.5,
    tax: 1.05,
    total: 11.55,
    orderItems: [
      {
        id: 101,
        productId: 10,
        productName: 'Iced Thnol Coffee',
        price: 2.5,
        quantity: 2,
        sizeId: 2,
        note: 'Extra cold',
        iceId: 3,
        sugarId: 2,
        coffeeLevelId: 2,
        number: '10-s2-i3-c2-nExtra cold',
        productDetails: {
          id: 10,
          productName: 'Iced Thnol Coffee',
          price: 2.5,
          imageUrl: '/coffee/thnol-coffee.jpg',
        },
      },
      {
        id: 102,
        productId: 11,
        productName: 'Iced Latte',
        price: 2.75,
        quantity: 2,
        sizeId: 1,
        note: '',
        iceId: 2,
        sugarId: 2,
        coffeeLevelId: 1,
        number: '11-s2-i2-c1-n',
        productDetails: {
          id: 11,
          productName: 'Iced Latte',
          price: 2.75,
          imageUrl: '/coffee/ice-latte.jpg',
        },
      },
    ],
  },
];

export const getOrderById = async (id: number): Promise<Order> => {
  const order = mockOrders.find((o) => o.id === id);
  if (!order) {
    throw new Error('Order not found');
  }
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return Promise.resolve(order);
};

export const createOrder = async (
  payload: OrderPayload,
): Promise<OrderResponse> => {
  const newId = mockOrders.length + 1;
  const newNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;

  // Calculate totals from payload for a more realistic mock
  const subTotal = payload.orderItems.reduce(
    (acc, item) => acc + 2.5 * item.quantity,
    0,
  );
  const tax = subTotal * 0.1;
  const total = subTotal + tax;

  const newOrder: Order = {
    id: newId,
    number: newNumber,
    type: payload.type,
    status: 1,
    subTotal,
    tax,
    total,
    orderItems: payload.orderItems.map((item, index) => ({
      id: 200 + index,
      productId: item.productId,
      productName: `Product ${item.productId}`, // In a real mock we'd look this up
      price: 2.5,
      quantity: item.quantity,
      sizeId: item.sizeId,
      note: item.note || '',
      iceId: item.iceLevelId,
      sugarId: item.sugarLevelId,
      coffeeLevelId: item.coffeeLevelId,
      number: item.number,
      productDetails: {
        id: item.productId,
        productName: `Product ${item.productId}`,
        price: 2.5,
        imageUrl: '/coffee/thnol-coffee.jpg',
      },
    })),
  };

  mockOrders.push(newOrder);
  return Promise.resolve({
    id: newId,
    number: newNumber,
    total: total,
  });
};

export const updateOrder = async (
  id: string,
  payload: OrderPayload,
): Promise<OrderResponse> => {
  const orderId = Number(id);
  const existingIndex = mockOrders.findIndex((o) => o.id === orderId);

  if (existingIndex === -1) {
    throw new Error('Order not found');
  }

  const subTotal = payload.orderItems.reduce(
    (acc, item) => acc + 2.5 * item.quantity,
    0,
  );
  const tax = subTotal * 0.1;
  const total = subTotal + tax;

  const updatedOrder: Order = {
    ...mockOrders[existingIndex],
    type: payload.type,
    subTotal,
    tax,
    total,
    orderItems: payload.orderItems.map((item, index) => ({
      id: 300 + index,
      productId: item.productId,
      productName: `Product ${item.productId}`,
      price: 2.5,
      quantity: item.quantity,
      sizeId: item.sizeId,
      note: item.note || '',
      iceId: item.iceLevelId,
      sugarId: item.sugarLevelId,
      coffeeLevelId: item.coffeeLevelId,
      number: item.number,
      productDetails: {
        id: item.productId,
        productName: `Product ${item.productId}`,
        price: 2.5,
        imageUrl: '/coffee/thnol-coffee.jpg',
      },
    })),
  };

  mockOrders[existingIndex] = updatedOrder;
  return Promise.resolve({
    id: orderId,
    number: updatedOrder.number,
    total: total,
  });
};

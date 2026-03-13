import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { cart, removeItem, clearCart } = useCart();

  const total = cart.reduce(
    (acc, item) =>
      acc + parseFloat(item.price.toString().replace('$', '')) * item.qty,
    0,
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Your Cart</h2>
      {cart.length === 0 && <p>Cart is empty</p>}
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between py-2">
          <span>
            {item.name} x {item.qty}
          </span>
          <span>{item.price}</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      {cart.length > 0 && (
        <>
          <p className="font-bold mt-2">Total: ${total.toFixed(2)}</p>
          <button
            onClick={clearCart}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

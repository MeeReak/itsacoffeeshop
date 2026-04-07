import { Checkout } from '@/components/pages/Checkout';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <Checkout id={id} />;
}

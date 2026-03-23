import { QRCodeCanvas } from 'qrcode.react';

interface KHQRCardProps {
  qrUrl: string;
  amount?: number;
  currency?: string;
  username?: string;
}

export const KHQRCard: React.FC<KHQRCardProps> = ({
  qrUrl,
  amount = 1200,
  currency = 'KHR',
  username = 'Mee Reak',
}) => {
  const formatAmount = (amount: number, currency: string) => {
    const locale = currency === 'KHR' ? 'km-KH' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatCurrency = currency === 'KHR' ? 'KHR' : 'USD';

  const formatIcon = currency === 'KHR' ? '/meeqr/khr.png' : '/meeqr/usd.png';

  return (
    <article className="border rounded-2xl shadow-lg overflow-hidden px-4">
      {/* Header with Shop Name */}
      <header className="text-center bg-[#f1dd68] -mx-4 py-2">
        <h2 className="text-base font-bold">Itscoffeeshop</h2>
      </header>

      {/* User / Amount Info */}
      <section className="px-4 py-3">
        <p className="text-xs text-gray-600">{username}</p>
        <div className="flex items-baseline gap-1 mt-1">
          <p className="text-lg font-bold">
            {formatAmount(amount, formatCurrency)}
          </p>
          <span className="text-xs">{formatCurrency}</span>
        </div>
      </section>

      <hr className="border-t-2 border-dashed -mx-4" />

      {/* QR Code */}
      <section className="flex justify-center py-3">
        <figure className="relative">
          <QRCodeCanvas
            value={
              qrUrl ||
              'https://www.youtube.com/watch?v=m_XUClQCOUc&list=RDm_XUClQCOUc&start_radio=1'
            }
            size={200}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: `${formatIcon}`,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
          <figcaption className="sr-only">Scan this QR code to pay</figcaption>
        </figure>
      </section>
    </article>
  );
};

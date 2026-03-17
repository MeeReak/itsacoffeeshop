'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { LevelSelect } from './LevelSelect';

interface CustomizeDialogProps {
  coffee: {
    id: number;
    img: string;
    name: string;
    desc: string;
    price: number;
  };
}

export const CustomizeDialog = ({ coffee }: CustomizeDialogProps) => {
  const { addItem } = useCart();

  const [scrolled, setScrolled] = useState(false);

  const [sugar, setSugar] = useState<
    'no' | 'less' | 'normal' | 'more' | undefined
  >();
  const [ice, setIce] = useState<
    'no' | 'less' | 'normal' | 'more' | 'separate' | undefined
  >();
  const [coffeeLevel, setCoffeeLevel] = useState<
    'less' | 'normal' | 'extra' | undefined
  >();
  const [note, setNote] = useState('');
  const [qty, setQty] = useState(1);

  const coffeePrice = {
    less: 0,
    normal: 0,
    extra: 0.36,
  };

  const selectedCoffeeLevel = coffeeLevel ?? 'normal';

  const finalPrice = coffee.price + coffeePrice[selectedCoffeeLevel];

  const handleAdd = () => {
    if (!sugar || !ice) {
      alert('Please select required options');
      return;
    }

    addItem({
      id: coffee.id,
      name: coffee.name,
      price: finalPrice,
      src: coffee.img,
      alt: coffee.name,
      sugar,
      ice,
      coffeeLevel: selectedCoffeeLevel,
      note,
      qty,
    });
  };
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Dialog>
      {/* Add Button */}
      <DialogTrigger className="text-sm bg-[#060709] text-white px-3 py-1 rounded">
        Add
      </DialogTrigger>

      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogClose className="absolute top-3 right-4 z-101 bg-white/80 backdrop-blur border rounded-full px-2 py-1 shadow cursor-pointer duration-300 ease-in-out transform hover:scale-125">
          ✕
        </DialogClose>
        {/* Scrollable Content */}
        <div
          onScroll={handleScroll}
          className="max-h-[90vh] overflow-y-auto px-5 pb-6"
        >
          {/* Sticky Header */}
          <DialogHeader
            className={`sticky top-0 z-100 transition-all -mx-5 px-5 bg-white border border-bottom-1 ${
              scrolled ? 'py-3 shadow-md' : 'hidden'
            }`}
          >
            {scrolled && (
              <DialogTitle className="text-lg font-bold">
                {coffee.name}
              </DialogTitle>
            )}
          </DialogHeader>

          {/* Image */}
          <div className="relative h-72 w-full rounded-lg overflow-hidden mt-4">
            <Image
              src={coffee.img}
              alt={coffee.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Title */}
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-6">{coffee.name}</h2>
            <p className="text-lg font-bold mb-5">${coffee.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-4">{coffee.desc}</p>
          </div>
          <hr />
          {/* SIZE */}

          {/* ICE */}
          <div className="mt-5">
            <LevelSelect
              title="Sugar Level"
              subTitle="Select 1"
              value={sugar}
              onChange={setSugar} // sets sugar state directly
              required
              options={[
                { label: 'No Sweet', value: 'no' },
                { label: 'Less Sweet', value: 'less' },
                { label: 'Normal Sweet', value: 'normal' },
                { label: 'More Sweet', value: 'more' },
              ]}
            />
          </div>

          {/* SUGAR */}
          <div className="mt-5">
            <LevelSelect
              title="Ice Level"
              subTitle="Select 1"
              value={ice}
              onChange={setIce}
              required
              options={[
                { label: 'No Ice', value: 'no' },
                { label: 'Less Ice', value: 'less' },
                { label: 'Normal Ice', value: 'normal' },
                { label: 'More Ice', value: 'more' },
                { label: 'Ice Separate', value: 'separate' },
              ]}
            />
          </div>

          <div>
            <LevelSelect
              title="Coffee Level"
              subTitle="Select 1"
              value={coffeeLevel}
              onChange={(val) =>
                setCoffeeLevel(val as 'less' | 'normal' | 'extra')
              }
              options={[
                { label: 'Less Coffee', value: 'less' },
                { label: 'Extra Shot', priceLabel: 0.36, value: 'extra' },
              ]}
            />
          </div>

          {/* NOTE */}
          <div className="mt-6">
            <p className="font-bold text-lg mb-1">Special Instructions</p>

            <p className="text-sm text-gray-500 mb-2">
              Special requests are subject to the restaurant&apose;s approval.
            </p>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tell us here!"
              className="w-full border rounded-lg p-2 min-h-24 scrollbar-hide"
            />
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between mt-6">
            {/* Quantity */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="border px-3 py-1 rounded"
              >
                -
              </button>

              <span className="font-semibold">{qty}</span>

              <button
                onClick={() => setQty((q) => q + 1)}
                className="border px-3 py-1 rounded"
              >
                +
              </button>
            </div>

            {/* Add To Cart */}
            <DialogClose
              onClick={handleAdd}
              className="bg-[#f5dc50] px-6 py-2 rounded font-semibold"
            >
              Add
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

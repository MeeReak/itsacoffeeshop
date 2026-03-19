'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
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
import { Controller, FieldErrors, useForm } from 'react-hook-form';

interface CustomizeDialogProps {
  coffee: {
    id: number;
    img: string;
    name: string;
    desc: string;
    price: number;
  };
}

type CustomizeForm = {
  sugar: 'no' | 'less' | 'normal' | 'more';
  ice: 'no' | 'less' | 'normal' | 'more' | 'separate';
  coffeeLevel: 'less' | 'normal' | 'extra';
  note: string;
  qty: number;
};

export const CustomizeDialog = ({ coffee }: CustomizeDialogProps) => {
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<CustomizeForm>({
    defaultValues: {
      coffeeLevel: 'normal',
      qty: 1,
    },
  });
  const [open, setOpen] = useState(false);
  // const sugar = watch('sugar');
  // const ice = watch('ice');
  const coffeeLevel = watch('coffeeLevel');
  const qty = watch('qty');

  const { addItem } = useCart();
  const sugarRef = useRef<HTMLDivElement>(null);
  const iceRef = useRef<HTMLDivElement>(null);
  const coffeeRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const coffeePrice = {
    less: 0,
    normal: 0,
    extra: 0.36,
  };

  const selectedCoffeeLevel = coffeeLevel ?? 'normal';

  const finalPrice = coffee.price + coffeePrice[selectedCoffeeLevel];

  const onSubmit = (data: CustomizeForm) => {
    const customKey = `${coffee.id}-${data.sugar}-${data.ice}-${data.coffeeLevel}${-data.note || ''}`;

    addItem({
      id: coffee.id,
      name: coffee.name,
      price: Number(finalPrice.toFixed(2)),
      src: coffee.img,
      alt: coffee.name,
      ...data,
      customKey,
    });

    reset();
    setOpen(false);
  };

  const onError = (errors: FieldErrors<CustomizeForm>) => {
    if (errors.sugar) {
      scrollTo(sugarRef);
    } else if (errors.ice) {
      scrollTo(iceRef);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-6">{coffee.name}</h2>
            <p className="text-lg font-bold mb-5">${coffee.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-4">{coffee.desc}</p>
          </div>
          <hr />

          <div ref={sugarRef} className="mt-5 scroll-mt-20">
            <Controller
              name="sugar"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <LevelSelect
                  title="Sugar Level"
                  subTitle="Select 1"
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    scrollTo(iceRef);
                  }}
                  required
                  error={!!errors.sugar}
                  options={[
                    { label: 'No Sweet', value: 'no' },
                    { label: 'Less Sweet', value: 'less' },
                    { label: 'Normal Sweet', value: 'normal' },
                    { label: 'More Sweet', value: 'more' },
                  ]}
                />
              )}
            />
          </div>

          <div ref={iceRef} className="mt-5 scroll-mt-20">
            <Controller
              name="ice"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <LevelSelect
                  title="Ice Level"
                  subTitle="Select 1"
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    scrollTo(footerRef);
                  }}
                  required
                  error={!!errors.ice}
                  options={[
                    { label: 'No Ice', value: 'no' },
                    { label: 'Less Ice', value: 'less' },
                    { label: 'Normal Ice', value: 'normal' },
                    { label: 'More Ice', value: 'more' },
                    { label: 'Ice Separate', value: 'separate' },
                  ]}
                />
              )}
            />
          </div>

          <div ref={coffeeRef} className="scroll-mt-20">
            <LevelSelect
              title="Coffee Level"
              subTitle="Select 1"
              value={coffeeLevel}
              onChange={(val) =>
                setValue('coffeeLevel', val as 'less' | 'normal' | 'extra')
              }
              options={[
                { label: 'Less Coffee', value: 'less' },
                { label: 'Extra Shot', priceLabel: 0.36, value: 'extra' },
              ]}
            />
          </div>
          {/* NOTE */}
          <div>
            <p className="font-bold text-lg mb-1">Special Instructions</p>

            <p className="text-sm text-gray-500 mb-2">
              Special requests are subject to the restaurant&apose;s approval.
            </p>

            <textarea
              {...register('note')}
              placeholder="Tell us here!"
              className="w-full border rounded-lg p-2 min-h-24"
            />
          </div>

          {/* FOOTER */}
          <div
            ref={footerRef}
            className="flex items-center justify-between mt-6"
          >
            {/* Quantity */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setValue('qty', Math.max(1, qty - 1))}
                className="border px-3 py-1 rounded"
              >
                -
              </button>

              <span className="font-semibold">{qty}</span>

              <button
                onClick={() => setValue('qty', qty + 1)}
                className="border px-3 py-1 rounded"
              >
                +
              </button>
            </div>

            {/* Add To Cart */}
            {/* <DialogClose
              onClick={handleSubmit(onSubmit)}
              className="bg-[#f5dc50] px-6 py-2 rounded font-semibold"
            >
              Add
            </DialogClose> */}
            <button
              className="bg-[#f5dc50] px-6 py-2 rounded font-semibold"
              onClick={handleSubmit(onSubmit, onError)}
            >
              Add
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

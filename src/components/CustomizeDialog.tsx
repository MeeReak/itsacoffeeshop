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
import { Controller, FieldErrors, useForm, useWatch } from 'react-hook-form';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Product } from '@/type/product';

interface CustomizeDialogProps {
  coffee: Product;
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
    register,
    formState: { errors },
  } = useForm<CustomizeForm>({
    defaultValues: {
      coffeeLevel: 'normal',
      qty: 1,
    },
  });
  const [open, setOpen] = useState(false);
  const [scaleQty, setScaleQty] = useState(false);
  const sugar = useWatch({ control, name: 'sugar' });
  const ice = useWatch({ control, name: 'ice' });
  const coffeeLevel = useWatch({ control, name: 'coffeeLevel' });
  const qty = useWatch({ control, name: 'qty' });
  const isFormValid = sugar && ice && coffeeLevel;
  const hasErrors = Object.keys(errors).length > 0;
  const canAddToCart = isFormValid && !hasErrors;
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

  const changeQty = (newQty: number) => {
    setValue('qty', newQty);
    setScaleQty(true);
    setTimeout(() => setScaleQty(false), 100); // animation duration
  };

  const selectedCoffeeLevel = coffeeLevel ?? 'normal';

  const finalPrice = coffee.price + coffeePrice[selectedCoffeeLevel];

  const onSubmit = (data: CustomizeForm) => {
    const customKey = `${coffee.id}-${data.sugar}-${data.ice}-${data.coffeeLevel}${-data.note || ''}`;

    addItem({
      id: coffee.id,
      name: coffee.name,
      price: Number(finalPrice.toFixed(2)),
      src: coffee.imageUrl,
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
    if (e.currentTarget.scrollTop > 300) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Add Button */}
      <DialogTrigger className="text-sm bg-[#f5dc50] text-while font-semibold px-3 py-1 rounded cursor-pointer">
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
            className={`sticky -top-1 z-100 transition-all -mx-5 px-5 bg-white border border-bottom-1 ${
              scrolled ? 'py-5 shadow-md' : 'hidden'
            }`}
          >
            {scrolled && (
              <DialogTitle className="text-2xl font-bold">
                {coffee.name}
              </DialogTitle>
            )}
          </DialogHeader>

          {/* Image */}
          <div className="relative h-72 w-full rounded-lg overflow-hidden mt-4">
            <Image
              src={coffee.imageUrl}
              alt={coffee.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="mt-4">
            <h2 className="text-3xl font-bold mb-6">{coffee.name}</h2>
            <p className="text-xl font-bold mb-5">${coffee.price.toFixed(2)}</p>
            <p className="text-base text-gray-500 mb-4">{coffee.description}</p>
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
              Special requests are subject to the restaurant&apos;s approval.
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
            className="flex items-center justify-between mt-6 gap-5"
          >
            {/* Quantity */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => changeQty(Math.max(1, qty - 1))}
                className={`border rounded-full p-1 ${qty <= 1 ? 'cursor-not-allowed bg-[#f7f8f8] border-[#e6e7e8]' : 'cursor-pointer border-[#e8e9ea]'}`}
                disabled={qty <= 1}
              >
                <MinusIcon className={`${qty <= 1 && 'stroke-[#b8babc]'}`} />
              </button>

              <span
                className={`font-semibold transition-transform duration-150 min-w-5 text-center ${
                  scaleQty ? 'scale-150' : 'scale-100'
                }`}
              >
                {qty}
              </span>

              <button
                onClick={() => changeQty(qty + 1)}
                className="border cursor-pointer border-[#e8e9ea] rounded-full p-1"
              >
                <PlusIcon />
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
              className={`py-2 w-full rounded-lg font-bold
              ${!canAddToCart ? 'opacity-50 bg-[#b8babc] text-white' : 'bg-[#f5dc50] cursor-pointer '}`}
              onClick={() => handleSubmit(onSubmit, onError)()}
            >
              {!canAddToCart ? 'Select Options' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

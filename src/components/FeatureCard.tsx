import Image from 'next/image';

interface FeatureCardProp {
  coffee: {
    img: string;
    name: string;
    desc: string;
    price: string;
  };
}

export const FeatureCard = ({ coffee }: FeatureCardProp) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative h-56">
        <Image
          src={coffee.img}
          alt={coffee.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg">{coffee.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{coffee.desc}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-[#f5dc50]">{coffee.price}</span>
          <button className="text-sm bg-[#060709] text-white px-3 py-1 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

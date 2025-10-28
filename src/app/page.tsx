// hero.tsx
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const Hero = ({ title, subtitle, imageUrl }: HeroProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-center px-8 py-16 mx-auto">
      <div className="flex flex-col justify-center lg:w-1/2 w-full lg:pr-24">
        <h1 className="my-4 text-5xl font-bold leading-tight text-center lg:text-left">
          {title}
        </h1>
        <p className="my-4 text-3xl leading-relaxed text-center lg:text-left">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <Image
          width={500}
          height={500}
          src={imageUrl}
          alt="Hero Image"
          className="object-cover object-center rounded-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
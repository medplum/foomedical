import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import { CarouselConfig } from '../constants/carouselConfig';
import { MouseEvent, ReactNode } from 'react';
import generateId from '../helpers/generate-id';

const carouselIdGenerator = generateId();

interface CarouselItem {
  img: ReactNode;
  title: string;
  description: string;
  url: string;
  label: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

interface ArrowProps {
  onClick?: (e: MouseEvent) => void;
}

const PrevArrow = ({ onClick }: ArrowProps): JSX.Element => (
  <ArrowCircleLeftIcon
    className="absolute top-1/2 -left-7 hidden h-auto w-6 -translate-y-1/2 cursor-pointer stroke-1 text-gray-400 md:block lg:-left-14 lg:w-12"
    onClick={onClick}
  />
);

const NextArrow = ({ onClick }: ArrowProps): JSX.Element => (
  <ArrowCircleRightIcon
    className="absolute top-1/2 -right-7 hidden h-auto w-6 -translate-y-1/2 cursor-pointer stroke-1 text-gray-400 md:block lg:-right-14 lg:w-12"
    onClick={onClick}
  />
);

const Carousel = ({ items }: CarouselProps): JSX.Element => {
  const settings = {
    ...CarouselConfig,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="mb-16 w-full md:mb-10">
      <Slider {...settings}>
        {items.map(({ img, title, description, url, label }) => (
          <div key={carouselIdGenerator.next().value} className="h-full border border-gray-400 bg-white p-4">
            {img}
            <h2 className="mt-4 text-sm font-bold">{title}</h2>
            <p className="my-2 text-sm">{description}</p>
            <a href={url} className="text-sm text-blue-700">
              {label}
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

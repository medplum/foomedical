import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { CarouselConfig } from '../constants/carouselConfig';
import { MouseEvent, ReactNode } from 'react';

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
  <ChevronLeftIcon
    className="absolute left-[85%] right-[85%] bottom-1 z-10 hidden h-auto w-11 cursor-pointer stroke-1 text-gray-500 duration-300 hover:scale-110 hover:text-gray-600 sm:block xl:right-[unset] xl:-left-10 xl:top-1/2 xl:-translate-y-1/2"
    onClick={onClick}
  />
);

const NextArrow = ({ onClick }: ArrowProps): JSX.Element => (
  <ChevronRightIcon
    className="absolute left-[95%] right-[95%] bottom-1 z-10 hidden h-auto w-11 cursor-pointer stroke-1 text-gray-500 duration-300 hover:scale-110 hover:text-gray-600 sm:block xl:left-[unset] xl:-right-10 xl:top-1/2 xl:-translate-y-1/2"
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
    <div className="mb-6 w-full">
      <Slider {...settings}>
        {items.map(({ img, title, description, url, label }) => (
          <div key={title} className="flex h-full flex-col justify-between rounded-md bg-white p-4 shadow">
            {img}
            <h2 className="mt-4 text-lg font-medium text-gray-900">{title}</h2>
            <p className="my-4 text-base font-medium text-gray-500">{description}</p>
            <a href={url} className="text-base font-medium text-teal-600">
              {label}
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

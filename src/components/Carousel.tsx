import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import { CarouselConfig } from '../constants/carouselConfig';
import { useId, MouseEvent, ReactNode } from 'react';

interface CarouselItem {
  img: ReactNode;
  title: string;
  description: string;
  link: string;
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
  const id = useId();
  return (
    <div className="mb-16 w-full md:mb-10">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={id} className="h-full border border-gray-400 bg-white p-4">
            {item.img}
            <h2 className="mt-2 text-sm font-bold">{item.title}</h2>
            <p className="my-2 text-sm">{item.description}</p>
            <a href="#" className="text-sm text-blue-700">
              {item.link}
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

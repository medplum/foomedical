import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline';
import LaboratoryImage from '../img/landingPage/laboratory.jpg';
import EngineeringImage from '../img/landingPage/engineering.jpg';

const features = [
  {
    name: 'Competitive exchange rates',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: GlobeAltIcon,
  },
  {
    name: 'No hidden fees',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: ScaleIcon,
  },
  {
    name: 'Transfers are instant',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Mobile notifications',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: AnnotationIcon,
  },
];

export function FeatureSection(): JSX.Element {
  return (
    <div className="relative bg-white py-8 sm:py-12 md:py-40">
      <img
        className="lg:h-128 lg:w-128 xl:h-156 xl:w-156 -top-16 -right-24 z-10 hidden md:absolute md:top-16 md:inline md:h-96 md:w-96 md:rounded-full md:object-cover lg:-top-8 lg:-right-24 xl:-right-32 xl:-top-32"
        src={LaboratoryImage}
        alt="Laboratory"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:hidden lg:px-8">
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-xl text-teal-600">Healthcare</h2>
          <p className="mt-4 text-3xl font-semibold text-gray-900">A better way to get care</p>
          <p className="mt-4 w-full max-w-xs text-lg font-normal text-neutral-600 sm:max-w-none md:max-w-sm lg:max-w-lg lg:text-xl">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
            accusamus quisquam.
          </p>
        </div>
      </div>
      <img className="mt-8 block h-40 w-full object-cover md:hidden" src={LaboratoryImage} alt="Laboratory" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex hidden flex-col items-start md:inline">
          <h2 className="text-xl text-teal-600">Healthcare</h2>
          <p className="mt-6 text-4xl font-semibold text-gray-900">A better way to get care</p>
          <p className="mt-4 w-full max-w-xs text-lg font-normal text-neutral-600 sm:max-w-none md:max-w-sm lg:max-w-lg lg:text-xl">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
            accusamus quisquam.
          </p>
        </div>
        <div className="mt-8 md:mt-60">
          <div className="flex flex-col items-center space-y-6 sm:space-y-10 md:items-end">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="w-full max-w-lg rounded-2xl bg-gradient-to-r from-teal-50 to-green-50 p-4 md:max-w-md lg:max-w-lg lg:p-8"
              >
                <h5 className="text-lg font-medium text-gray-900 lg:text-2xl">{feature.name}</h5>
                <p className="mt-4 text-base font-normal text-neutral-600 lg:text-lg lg:text-xl">
                  {feature.description}
                </p>
              </div>
            ))}
            <img
              className="sm:h-156 sm:w-156 lg:h-216 lg:w-216 xl:h-264 xl:w-264 z-10 h-72 w-72 rounded-full object-cover md:absolute md:-left-[21rem] md:bottom-52 lg:bottom-56 lg:-left-[27rem] xl:bottom-20 xl:-left-[36rem]"
              src={EngineeringImage}
              alt="Engineering"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

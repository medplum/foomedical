import { MouseEventHandler } from 'react';

interface GeneralInfoProps {
  title?: string;
  subTitle?: string | JSX.Element;
  image?: 'avatar' | 'image';
  imageUrl?: string;
  onImageClick?: MouseEventHandler<HTMLElement>;
  imageAlt?: string;
}

const GeneralInfo = ({
  title,
  subTitle,
  image = 'image',
  imageUrl,
  onImageClick,
  imageAlt,
}: GeneralInfoProps): JSX.Element => {
  return (
    <div className="mx-auto mb-5 flex max-w-xl flex-col items-center last:mb-0">
      {imageUrl ? (
        <img
          className={`inline-block h-44 object-cover ${image === 'avatar' ? 'w-44 rounded-full' : 'w-auto'} ${
            onImageClick ? 'cursor-pointer' : null
          }`}
          onClick={(e) => (onImageClick ? onImageClick(e) : null)}
          src={imageUrl}
          alt={imageAlt}
        />
      ) : (
        <span
          className={`inline-block h-44 w-44 overflow-hidden rounded-full bg-gray-100 ${
            onImageClick ? 'cursor-pointer' : null
          }`}
          onClick={(e) => (onImageClick ? onImageClick(e) : null)}
        >
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      )}
      {title && <h2 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">{title}</h2>}
      {subTitle && <p className="mt-4 text-base leading-6 text-gray-600">{subTitle}</p>}
    </div>
  );
};

export default GeneralInfo;

import { MouseEventHandler } from 'react';
import { ReactComponent as Pills } from '../img/pills.svg';
import { ReactComponent as AvatarPlaceholder } from '../img/avatar-placeholder.svg';

interface GeneralInfoProps {
  title?: string;
  subTitle?: string | JSX.Element;
  image?: 'avatar' | 'image';
  imageUrl?: string;
  onImageClick?: MouseEventHandler<HTMLElement>;
  imageAlt?: string;
  isAvatarVisible?: boolean;
}

const GeneralInfo = ({
  title,
  subTitle,
  image = 'image',
  imageUrl,
  onImageClick,
  imageAlt,
  isAvatarVisible = true,
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
        <span onClick={(e) => (onImageClick ? onImageClick(e) : null)}>
          {isAvatarVisible ? (
            <AvatarPlaceholder
              className={`inline-block h-44 w-44 overflow-hidden rounded-full bg-gray-100 p-2 ${
                onImageClick ? 'cursor-pointer' : null
              }`}
            />
          ) : (
            <Pills className="h-44" />
          )}
        </span>
      )}
      {title && <h2 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">{title}</h2>}
      {subTitle && <p className="mt-4 text-base leading-6 text-gray-600">{subTitle}</p>}
    </div>
  );
};

export default GeneralInfo;

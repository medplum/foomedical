interface GeneralInfoProps {
  title?: string;
  subTitle?: string | JSX.Element;
  image?: 'avatar' | 'image';
  imageUrl?: string;
  imageAlt?: string;
}

const GeneralInfo = ({ title, subTitle, image = 'image', imageUrl, imageAlt }: GeneralInfoProps): JSX.Element => {
  return (
    <div className="mx-auto mb-5 flex max-w-xl flex-col items-center">
      <img
        className={`inline-block h-44 object-cover ${image === 'avatar' ? 'w-44 rounded-full' : 'w-auto'}`}
        src={imageUrl}
        alt={imageAlt}
      />
      {title && <h2 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">{title}</h2>}
      {subTitle && <p className="mt-4 text-base leading-6 text-gray-600">{subTitle}</p>}
    </div>
  );
};

export default GeneralInfo;

interface GeneralInfoProps {
  title: string;
  subTitle?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const GeneralInfo = ({ title, subTitle, imageUrl, imageAlt }: GeneralInfoProps): JSX.Element => {
  return (
    <div className="mx-auto mb-5 flex max-w-xl flex-col items-center">
      {imageUrl && <img src={imageUrl} alt={imageAlt} />}
      <h2 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">{title}</h2>
      {subTitle && <p className="mt-4 text-base leading-6 text-gray-600">{subTitle}</p>}
    </div>
  );
};

export default GeneralInfo;

interface InfoSectionProps {
  title: string;
  children: JSX.Element;
}

const InfoSection = ({ title, children }: InfoSectionProps): JSX.Element => {
  return (
    <div className="mb-10 overflow-hidden border bg-white sm:rounded-md">
      <div className="border-b border-gray-100 bg-gray-100 px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 text-gray-500">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default InfoSection;

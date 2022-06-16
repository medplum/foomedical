import InfoSection from './InfoSection';
import GeneralInfo from '../components/GeneralInfo';

interface NoDataProps {
  title: string;
}

const NoData = ({ title }: NoDataProps): JSX.Element => {
  const subTitle = (
    <>
      If you think you&apos;re missing {title} that should be here, please{' '}
      <a href="#" className="text-emerald-700">
        contact our medical team.
      </a>
    </>
  );
  return (
    <InfoSection title={`Active ${title}`}>
      <div className="mx-auto px-4 py-5 text-center sm:px-6">
        <GeneralInfo
          title={`No ${title} Available`}
          subTitle={subTitle}
          imageUrl="https://via.placeholder.com/125"
          imageAlt="No Data image"
        />
      </div>
    </InfoSection>
  );
};

export default NoData;

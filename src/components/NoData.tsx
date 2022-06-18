import InfoSection from './InfoSection';
import GeneralInfo from '../components/GeneralInfo';
import Pills from '../img/pills.svg';

interface NoDataProps {
  title: string;
}

const NoData = ({ title }: NoDataProps): JSX.Element => {
  const subTitle = (
    <>
      If you think you&apos;re missing {title} that should be here, please{' '}
      <a href="#" className="text-teal-600">
        contact our medical team.
      </a>
    </>
  );
  return (
    <InfoSection title={`Active ${title}`}>
      <div className="mx-auto px-4 py-5 text-center sm:px-6">
        <GeneralInfo title={`No ${title} available`} subTitle={subTitle} imageUrl={Pills} imageAlt="No Data image" />
      </div>
    </InfoSection>
  );
};

export default NoData;

import InfoSection from './InfoSection';
import GeneralInfo from '../components/GeneralInfo';

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
        <GeneralInfo
          title={`No ${title} available`}
          subTitle={subTitle}
          imageUrl="https://storage.medplum.com/binary/31200637-f95b-460c-84d8-f29cb97c8aa8/107ac1a2-a536-4d8a-99af-02318509ff61?Expires=1656952877&Key-Pair-Id=K1PPSRCGJGLWV7&Signature=XRSZY7tYw%7Evo3lr45USn3zMEjJQ1zF4rb-fCALip5tCkQ5o20KAVNK8TUV9L8%7E-e%7EwZhA5P8JxivlgAveN9svbp6X1YwBZkGEkDlXPPOzAKDXgVk7QoYBgqRnY1Jia3n-PzFJrtctnpNkS8DwGYYLFAA9rmznJ7pecoYkUPj5YsV%7E2RMyOqUHj5qFPDvwFj%7E2rBXobu4PFzEc5Eea070gRXko3ZLiCdT0AoP%7EU1LK7FQl4ryinrsYZ3QbQN3FBXnM2kRQ3XGzpoXzDi1FDJH8iBtozdnvZG%7EnH3pEREKZmKi-hpvLrZzFW%7ENAjXjJoisumWg6wvHnaCSK69JszbR2g__"
          imageAlt="No Data image"
        />
      </div>
    </InfoSection>
  );
};

export default NoData;

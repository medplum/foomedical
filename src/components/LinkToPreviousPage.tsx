import { ChevronLeftIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

interface LinkToPreviousPageProps {
  url?: string;
  label: string;
  onClick?: () => void;
  isIconProvided?: boolean;
}

const ChevronIcon = (): JSX.Element => {
  return <ChevronLeftIcon className="mr-1 h-5 w-5 flex-shrink-0" />;
};

const LinkToPreviousPage = ({ url, label, onClick, isIconProvided = true }: LinkToPreviousPageProps): JSX.Element => (
  <>
    {url ? (
      <Link to={url} className="flex items-center text-sky-700">
        {isIconProvided && <ChevronIcon />}
        {label}
      </Link>
    ) : (
      <button onClick={onClick} className="flex items-center text-sky-700">
        {isIconProvided && <ChevronIcon />}
        {label}
      </button>
    )}
  </>
);

export default LinkToPreviousPage;

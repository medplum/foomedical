import { ChevronLeftIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

interface LinkToPreviousPageProps {
  url: string;
  label: string;
}

const LinkToPreviousPage = ({ url, label }: LinkToPreviousPageProps): JSX.Element => (
  <Link to={url} className="flex items-center text-sky-700">
    <ChevronLeftIcon className="mr-1 h-5 w-5 flex-shrink-0" />
    {label}
  </Link>
);

export default LinkToPreviousPage;

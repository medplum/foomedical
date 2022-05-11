interface ButtonProps {
  label: string;
  url?: string;
  action?: () => void;
}

const Button = ({ label, url, action }: ButtonProps): JSX.Element => {
  const style =
    'ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700';

  return url ? (
    <a href={url} className={style}>
      {label}
    </a>
  ) : (
    <button onClick={action} className={style}>
      {label}
    </button>
  );
};

export default Button;

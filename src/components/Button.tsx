interface ButtonProps {
  label: string;
  url?: string;
  action?: () => void;
  marginsUtils?: string;
  widthUtils?: string;
  fontUtils?: string;
}

const Button = ({
  label,
  url,
  action,
  marginsUtils = 'ml-8',
  widthUtils = 'auto',
  fontUtils = 'normal',
}: ButtonProps): JSX.Element => {
  const style = `${marginsUtils} whitespace-nowrap inline-flex items-center justify-center
    px-4 py-2 w-${widthUtils} border border-transparent rounded-md shadow-sm
    text-base font-${fontUtils} text-white bg-teal-600 hover:bg-teal-700`;

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

interface ButtonProps {
  label: string;
  url?: string;
  action?: () => void;
  marginsUtils?: string;
  widthUtils?: string;
  fontUtils?: string;
  paddingUtils?: string;
  backgroundColorUtils?: string;
  textColorUtils?: string;
  borderColorUtils?: string;
  hoverUtils?: string;
}

const Button = ({
  label,
  url,
  action,
  marginsUtils = 'ml-8',
  widthUtils = 'auto',
  fontUtils = 'normal',
  paddingUtils = 'px-4 py-2',
  backgroundColorUtils = 'bg-teal-600',
  textColorUtils = 'text-white',
  borderColorUtils = 'border-transparent',
  hoverUtils = 'bg-teal-700',
}: ButtonProps): JSX.Element => {
  const style = `${marginsUtils} whitespace-nowrap inline-flex items-center justify-center
    ${paddingUtils} w-${widthUtils} border ${borderColorUtils} rounded-md shadow-sm
    text-base font-${fontUtils} ${textColorUtils} ${backgroundColorUtils} hover:${hoverUtils}`;

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

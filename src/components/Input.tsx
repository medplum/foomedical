interface InputProps {
  type?: string;
  value: string | number;
  handleChange: (key: string, value: string) => void;
  name: string;
  placeholder: string;
}

export default function Input({ type = 'text', value, handleChange, name, placeholder }: InputProps): JSX.Element {
  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        onChange={(e) => {
          handleChange(name, e.target.value);
        }}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-700 focus:ring-emerald-700 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}

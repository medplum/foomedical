export interface TwoColumnsListItemProps {
  label: string | JSX.Element;
  body: string | JSX.Element;
}

interface TwoColumnsListProps {
  items: TwoColumnsListItemProps[];
}

export default function TwoColumnsList({ items }: TwoColumnsListProps): JSX.Element {
  return (
    <div className="flex flex-col px-4 sm:px-6">
      {items.map(({ label, body }, index) => (
        <div className="flex flex-col space-y-4 py-2.5 sm:flex-row sm:space-y-0 sm:space-x-12" key={`${label}${index}`}>
          <h2 className="flex items-start text-lg font-bold text-gray-900 sm:w-1/3 sm:justify-end sm:text-right">
            {label}
          </h2>
          <div className="flex items-center sm:w-2/3 sm:text-left">{body}</div>
        </div>
      ))}
    </div>
  );
}

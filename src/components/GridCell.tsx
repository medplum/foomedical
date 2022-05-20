interface GridCellProps {
  item?: string | JSX.Element | null;
  color: string;
}

const GridCell = ({ item, color }: GridCellProps): JSX.Element => {
  return (
    <div className="flex items-center space-x-3 pl-4 sm:pl-6">
      <h3 className={`text-sm text-${color}-600`}>{item}</h3>
    </div>
  );
};

export default GridCell;

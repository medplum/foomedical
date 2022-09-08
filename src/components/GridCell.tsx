interface GridCellProps {
  item?: string | JSX.Element | null;
  color: string;
  className?: string;
}

const GridCell = ({ item, color, className }: GridCellProps): JSX.Element => {
  return (
    <div className={`${className} items-center space-x-3 pl-4 sm:flex sm:pl-6`}>
      <h3 className={`text-xs text-${color}-600 sm:text-sm`}>{item}</h3>
    </div>
  );
};

export default GridCell;

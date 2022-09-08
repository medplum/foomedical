interface GridSectionProps {
  array: string[];
  children: JSX.Element;
}

const GridSection = ({ array, children }: GridSectionProps): JSX.Element => {
  return (
    <div className="mb-10 overflow-hidden rounded-md border bg-white last:mb-0">
      <ul role="list" className="grid grid-cols-2 gap-x-0 sm:grid-cols-3">
        {array.map((item, index) => (
          <li className="col-span-1 bg-gray-100 last:hidden sm:last:grid" key={item}>
            <div className="flex w-full items-center justify-between space-x-6 p-4 md:p-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3
                    className={`text-md leading-6 text-gray-500 ${
                      index == 1 && "after:content-['_/_Last_updated']"
                    } sm:after:content-[''] md:text-lg`}
                  >
                    {item}
                  </h3>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default GridSection;

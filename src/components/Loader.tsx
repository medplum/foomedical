const Loader = (): JSX.Element => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        <div className="absolute h-10 w-10 rounded-full border-4 border-solid border-gray-100" />
        <div className="absolute h-10 w-10 animate-spin rounded-full border-t-4 border-solid border-teal-600" />
      </div>
    </div>
  );
};

export default Loader;

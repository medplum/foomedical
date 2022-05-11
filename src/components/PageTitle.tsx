interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps): JSX.Element => (
  <h1 className="px-4 py-5 text-4xl font-extrabold sm:px-0 sm:text-5xl">{title}</h1>
);

export default PageTitle;

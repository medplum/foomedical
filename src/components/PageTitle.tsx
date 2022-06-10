interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps): JSX.Element => (
  <h1 className="py-5 text-3xl font-extrabold first:pt-0">{title}</h1>
);

export default PageTitle;

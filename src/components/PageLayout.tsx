import { Header } from './Header';
import { SideMenu } from './SideMenu';
import { Footer } from './Footer';
import { SideMenuProps } from './SideMenu';

export interface PageLayoutProps {
  sideMenu: SideMenuProps;
  children: JSX.Element;
}

export default function PageLayout({ children, sideMenu }: PageLayoutProps): JSX.Element {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Header />
      <main className="mb-auto">
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-6xl lg:grid-flow-col-dense lg:grid-cols-4">
          <SideMenu {...sideMenu} />
          <div className="space-y-6 lg:col-span-3 lg:col-start-2">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

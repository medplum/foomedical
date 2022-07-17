import { Suspense } from 'react';
import { Header } from './Header';
import { SideMenu } from './SideMenu';
import { Footer } from './Footer';
import { SideMenuProps } from './SideMenu';
import Loader from './Loader';

export interface PageLayoutProps {
  sideMenu?: SideMenuProps;
  children: JSX.Element;
}

export default function PageLayout({ children, sideMenu }: PageLayoutProps): JSX.Element {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Header />
      <main className="mb-auto">
        <div className="mx-auto my-4 grid max-w-3xl grid-cols-1 gap-6 bg-white px-4 sm:my-8 sm:px-6 lg:max-w-6xl lg:grid-flow-col-dense lg:grid-cols-4">
          {sideMenu && <SideMenu {...sideMenu} />}
          <div className={`${sideMenu ? 'lg:col-start-2' : ''} lg:col-span-4`}>
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

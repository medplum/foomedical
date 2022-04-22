// This example requires Tailwind CSS v2.0+
// https://tailwindui.com/components/application-ui/page-examples/detail-screens
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SideMenu } from '../components/SideMenu';

const navigation = [
  { name: 'Action Items', href: '/care-plan/action-items' },
  { name: 'Visit Summaries', href: '/care-plan/visit-summaries' },
];

export function CarePlanPage() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <main className="mb-auto">
        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-6xl lg:grid-flow-col-dense lg:grid-cols-4">
          <SideMenu title="Health Record" navigation={navigation} />
          <div className="space-y-6 lg:col-start-2 lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

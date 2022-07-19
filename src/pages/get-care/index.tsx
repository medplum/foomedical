import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const GetCare = lazy(() => import('./GetCare'));

export default function Messages(): JSX.Element {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<GetCare />} />
      </Routes>
    </PageLayout>
  );
}

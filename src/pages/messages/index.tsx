import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const Chat = lazy(() => import('./Chat'));

export default function Messages(): JSX.Element {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </PageLayout>
  );
}

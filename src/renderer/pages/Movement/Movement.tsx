import { Outlet } from 'react-router-dom';

import PageLayout from '../../styles/layout/PageLayout';
import movementNavSections from './NavSections';

const Movement = () => {
  return (
    <PageLayout sections={movementNavSections} title="Movimento">
      <Outlet />
    </PageLayout>
  );
};

export default Movement;

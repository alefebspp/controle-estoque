import { Outlet } from 'react-router-dom';

import PageLayout from '../../styles/layout/PageLayout';
import productsNavSections from './NavSections';

const Products = () => {
  return (
    <PageLayout sections={productsNavSections} title="Produtos">
      <Outlet />
    </PageLayout>
  );
};

export default Products;

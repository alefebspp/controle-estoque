import PageLayout from '../../styles/layout/PageLayout';

import homeNavSections from './NavSections';
import Spinner from '../../components/Loaders/Spinner';
import ProductsTable from '../../components/Tables/ProductsTable';

import useAuthContext from '../../hooks/useAuth';
import { useGetProducts } from '../../hooks/useProducts';

const Home = () => {
  const { user } = useAuthContext();

  const { data, isLoading } = useGetProducts({
    userId: user?.id || '',
    fetchProductsTotal: true,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <PageLayout sections={homeNavSections} title="Início">
      <div className="w-full h-full flex flex-col">
        <h2 className="text-md lg:text-lg xl:text-xl font-semibold text-graphite-400">
          {`Olá, ${user?.name}. Seu relatório geral:`}
        </h2>
        <ProductsTable
          showTotal
          total={data?.total}
          products={data?.products || []}
        />
      </div>
    </PageLayout>
  );
};

export default Home;

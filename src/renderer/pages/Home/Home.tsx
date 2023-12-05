import PageLayout from '../../styles/layout/PageLayout';

import homeNavSections from './NavSections';
import StablishmentsList from '../../components/StablishmentsList/StablishmentsList';

const Home = () => {
  return (
    <PageLayout sections={homeNavSections} title="Início">
      <section className="w-full h-full flex flex-col">
        <div className="w-full h-full flex">
          <StablishmentsList />
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;

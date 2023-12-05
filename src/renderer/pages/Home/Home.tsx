import PageLayout from '../../styles/layout/PageLayout';

import homeNavSections from './NavSections';
import StablishmentsList from '../../components/StablishmentsList/StablishmentsList';

const Home = () => {
  return (
    <PageLayout sections={homeNavSections} title="Início">
      <StablishmentsList />
    </PageLayout>
  );
};

export default Home;

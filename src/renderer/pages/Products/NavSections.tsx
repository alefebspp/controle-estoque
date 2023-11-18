import { ListBulletIcon, PlusIcon } from '@radix-ui/react-icons';

import { PageLayoutSection } from '../../types/components';

const productsNavSections: PageLayoutSection[] = [
  {
    icon: <ListBulletIcon />,
    sectionPath: '',
    pagePath: 'products',
  },
  {
    icon: <PlusIcon />,
    sectionPath: 'create',
    pagePath: 'products',
  },
];
export default productsNavSections;

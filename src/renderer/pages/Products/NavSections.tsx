import { BarChartIcon, ListBulletIcon, PlusIcon } from '@radix-ui/react-icons';

import { PageLayoutSectionProps } from '../../styles/layout/interface';

const productsNavSections: PageLayoutSectionProps[] = [
  {
    icon: <ListBulletIcon />,
    sectionPath: '',
    pagePath: 'products',
  },
  {
    icon: <BarChartIcon />,
    sectionPath: 'report',
    pagePath: 'products',
  },
  {
    icon: <PlusIcon />,
    sectionPath: 'create',
    pagePath: 'products',
  },
];
export default productsNavSections;

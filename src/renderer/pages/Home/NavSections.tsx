import { ArchiveIcon, BarChartIcon } from '@radix-ui/react-icons';

import { PageLayoutSectionProps } from '../../styles/layout/interface';

const homeNavSections: PageLayoutSectionProps[] = [
  {
    icon: <ArchiveIcon />,
    sectionPath: '/products/create',
    pagePath: 'products',
    label: 'Novo produto',
  },
  {
    icon: <BarChartIcon />,
    sectionPath: '/movement/create',
    pagePath: 'movement',
    label: 'Novo movimento',
  },
];
export default homeNavSections;

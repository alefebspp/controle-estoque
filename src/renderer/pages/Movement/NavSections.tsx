import { ListBulletIcon, PlusIcon } from '@radix-ui/react-icons';

import { PageLayoutSectionProps } from '../../styles/layout/interface';

const movementNavSections: PageLayoutSectionProps[] = [
  {
    icon: <ListBulletIcon />,
    sectionPath: '',
    pagePath: 'movement',
  },
  {
    icon: <PlusIcon />,
    sectionPath: 'create',
    pagePath: 'movement',
  },
];
export default movementNavSections;

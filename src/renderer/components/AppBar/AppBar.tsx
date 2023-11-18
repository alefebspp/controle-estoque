import { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExitIcon } from '@radix-ui/react-icons';

import Button from '../Button/Button';

import { AppBarItemProps } from './interface';
import useAuthContext from '../../hooks/useAuth';
import { cn } from '../../lib/util';

const AppBarRoot = ({ children }: PropsWithChildren) => {
  const { logout } = useAuthContext();

  return (
    <nav className="w-[100px] h-full bg-graphite-500 flex flex-col">
      <ul className="w-full h-full flex flex-col">{children}</ul>
      <div className="w-full h-[50px] flex justify-center">
        <Button
          onClick={logout}
          size="icon"
          variant="ghost"
          className="text-white hover:text-primary-light"
        >
          <ExitIcon className="w-6 h-6" />
        </Button>
      </div>
    </nav>
  );
};

const AppBarItem = ({ children, path }: AppBarItemProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const splitedPathname = pathname.split('/');

  const handleNavigate = () => {
    navigate(path);
  };

  const isActive = splitedPathname.includes(path.replace('/', ''));

  return (
    <li
      onClick={handleNavigate}
      className={cn(
        'w-full h-[80px] flex items-center justify-center cursor-pointer hover:bg-graphite-600 hover:text-primary-light text-graphite-400',
        {
          'bg-graphite-600 text-primary-light': isActive,
        },
      )}
    >
      <div
        className={cn(
          'w-[80%] h-full flex justify-center items-center border-b hover:border-primary-light hover:border-b-2 border-graphite-400',
          {
            'border-primary-light border-b-2': isActive,
          },
        )}
      >
        {children}
      </div>
    </li>
  );
};

export const AppBar = {
  Root: AppBarRoot,
  Item: AppBarItem,
};

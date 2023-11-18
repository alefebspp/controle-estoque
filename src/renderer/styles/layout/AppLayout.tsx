import { PropsWithChildren } from 'react';
import { HomeIcon, ArchiveIcon } from '@radix-ui/react-icons';
import { AppBar } from '../../components/AppBar/AppBar';

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="w-[100vw] h-[100vh] flex">
      <AppBar.Root>
        <AppBar.Item path="/home">
          <HomeIcon className="w-6 h-6" />
        </AppBar.Item>
        <AppBar.Item path="/products">
          <ArchiveIcon className="w-6 h-6" />
        </AppBar.Item>
      </AppBar.Root>
      <div className="w-full h-full">{children}</div>
    </main>
  );
};

export default AppLayout;

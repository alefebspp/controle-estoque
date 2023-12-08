import { useLocation, useNavigate } from 'react-router-dom';

import { PageLayoutProps, PageLayoutSectionProps } from './interface';

import { cn } from '../../lib/util';

const PageLayout = ({ children, title, sections }: PageLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <header className="flex items-end justify-start w-full py-[1rem] px-[15px] gap-[2rem]">
        <div className=" w-fit h-fit border-b-4 border-secondary-neon">
          <h1 className="font-medium text-black">
            {title.toLocaleUpperCase()}
          </h1>
        </div>
        {sections && (
          <div className="flex items-center gap-[1rem]">
            {sections.map((section, index) => {
              return (
                <PageLayoutSection
                  key={index}
                  sectionPath={section.sectionPath}
                  pagePath={section.pagePath}
                  label={section.label}
                />
              );
            })}
          </div>
        )}
      </header>
      <main className="w-full h-full px-[15px] pb-[15px]">{children}</main>
    </div>
  );
};

const PageLayoutSection = ({
  sectionPath,
  pagePath,
  label,
}: PageLayoutSectionProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const location = sectionPath ? `/${pagePath}/${sectionPath}` : `/${pagePath}`;

  const isActive = pathname == location;

  const handleNavigate = () => {
    navigate(sectionPath);
  };

  return (
    <div
      onClick={handleNavigate}
      className={cn(
        'flex items-center justify-center text-xs xl:text-sm font-semibold text-graphite-400 hover:text-secondary-neon cursor-pointer',
        {
          'text-secondary-neon': isActive,
        },
      )}
    >
      {label}
    </div>
  );
};

export default PageLayout;

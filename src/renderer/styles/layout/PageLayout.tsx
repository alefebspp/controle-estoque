import { useLocation, useNavigate } from 'react-router-dom';

import { PageLayoutProps, PageLayoutSectionProps } from './interface';

import { cn } from '../../lib/util';

const PageLayout = ({ children, title, sections }: PageLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <header className="flex items-center justify-start w-full h-[80px] px-[15px] gap-[15px]">
        <div className=" w-fit h-fit border-b-4 border-secondary-neon">
          <h1 className="font-medium text-black">
            {title.toLocaleUpperCase()}
          </h1>
        </div>
        {sections && (
          <div className="h-full flex items-center gap-[15px]">
            {sections.map((section, index) => {
              return (
                <PageLayoutSection
                  key={index}
                  icon={section.icon}
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
  icon,
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
        'p-2 flex items-center justify-center rounded-md text-graphite-400 hover:text-secondary-neon bg-graphite-500 hover:bg-graphite-600 cursor-pointer',
        {
          'text-secondary-neon': isActive,
          'gap-[0.5rem] p-2 text-xs xl:text-sm font-semibold': label,
        },
      )}
    >
      {icon}
      {label ? label : null}
    </div>
  );
};

export default PageLayout;

import { Component1Icon, SketchLogoIcon } from '@radix-ui/react-icons';

import Spinner from '../Loaders/Spinner';
import StablishmentCard from '../StablishmentCard/StablishmentCard';

import useAuthContext from '../../hooks/useAuth';
import { useGetStablishments } from '../../hooks/useStablishments';
import CreateStablishment from '../CreateStablishment/CreateStablishment';

function StablishmentsList() {
  const { user } = useAuthContext();

  const { data, isLoading } = useGetStablishments(user?.id || '');

  let listData: React.ReactNode = (
    <>
      <div className="w-full flex gap-[2rem]">
        <StablishmentLegend />
        <CreateStablishment />
      </div>
      <ul className="w-full h-full flex flex-wrap gap-[1rem] overflow-y-auto">
        {data?.stablishments.map((stablishment) => {
          return (
            <StablishmentCard
              key={stablishment.id}
              stablishment={stablishment}
            />
          );
        })}
      </ul>
    </>
  );

  if (isLoading) {
    listData = (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="w-full h-full p-[1rem]">
      <div className="w-full h-full flex flex-col gap-[1rem]">
        <div className=" w-fit h-fit border-b-4 border-secondary-neon">
          <h3 className="text-md lg:text-lg xl:text-xl font-medium text-black">
            Estabelecimentos
          </h3>
        </div>
        {listData}
      </div>
    </section>
  );
}

function StablishmentLegend() {
  return (
    <div className="flex gap-[2rem]">
      <div className="flex items-center gap-[0.5rem]">
        <Component1Icon className="w-5 h-5 lg:w-6 lg:h-6 text-graphite-500" />
        <i className="text-sm lg:text-md xl:text-lg font-medium text-graphite-500">
          Nome
        </i>
      </div>
      <div className="flex items-center gap-[0.5rem]">
        <SketchLogoIcon className="w-5 h-5 lg:w-6 lg:h-6 text-graphite-500" />
        <i className="text-sm lg:text-md xl:text-lg font-medium text-graphite-500">
          Total em produtos
        </i>
      </div>
    </div>
  );
}

export default StablishmentsList;

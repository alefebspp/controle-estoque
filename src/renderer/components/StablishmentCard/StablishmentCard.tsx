import {
  Component1Icon,
  Pencil2Icon,
  SketchLogoIcon,
  TrashIcon,
} from '@radix-ui/react-icons';

import useAuthContext from '../../hooks/useAuth';

import Button from '../Button/Button';

import { StablishmentCardProps } from './interface';
import { cn } from '../../lib/util';
import { applyCurrency } from '../../lib/masks';

const StablishmentCard = ({ stablishment }: StablishmentCardProps) => {
  const { selectStablishment, stablishment: selectedStablishment } =
    useAuthContext();

  const isSelected = stablishment.id == selectedStablishment?.id;

  return (
    <li className="w-[18rem] h-[14rem] flex p-[1rem] lg:p-[1.5rem] rounded-xl bg-graphite-500">
      <div className="w-full flex flex-col gap-[1rem] lg:gap-[1.5rem]">
        <div className="flex items-center gap-[0.5rem]">
          <Component1Icon
            className={cn('w-4 h-4 lg:w-5 lg:h-5 text-secondary-neon', {
              'text-graphite-400': !isSelected,
            })}
          />
          <p
            className={cn('text-xs text-secondary-neon font-medium', {
              'text-graphite-400': !isSelected,
            })}
          >
            {stablishment.name}
          </p>
        </div>
        <div className="flex items-center gap-[0.5rem]">
          <SketchLogoIcon
            className={cn('w-4 h-4 lg:w-5 lg:h-5 text-secondary-neon', {
              'text-graphite-400': !isSelected,
            })}
          />
          <p
            className={cn('text-xs text-secondary-neon font-medium', {
              'text-graphite-400': !isSelected,
            })}
          >
            {stablishment.productsTotal
              ? applyCurrency(stablishment.productsTotal)
              : 'R$ 0,00'}
          </p>
        </div>
        <Button
          onClick={() => selectStablishment(stablishment)}
          size="sm"
          variant="secondary"
          className={cn(
            'bg-graphite-400 hover:bg-secondary-neon mt-auto text-xs',
            {
              'bg-secondary-neon disabled:opacity-100': isSelected,
              'px-[18px]': !isSelected,
            },
          )}
          disabled={isSelected}
        >
          {isSelected ? 'Selecionado' : 'Selecionar'}
        </Button>
      </div>
      {/* <div className="w-[50%] flex flex-col gap-[1rem] lg:gap-[1.5rem]">
         <div className="flex items-center gap-[0.5rem]">
          <Button size="icon" variant="ghost">
            <Pencil2Icon
              className={cn('w-3 h-3 lg:w-4 lg:h-4 text-white', {
                'text-graphite-400': !isSelected,
              })}
            />
          </Button>
          <Button size="icon" variant="ghost">
            <TrashIcon
              className={cn('w-4 h-4 lg:w-5 lg:h-5 text-red-500', {
                'text-graphite-400': !isSelected,
              })}
            />
          </Button> 
        </div> 
      </div> */}
    </li>
  );
};

export default StablishmentCard;

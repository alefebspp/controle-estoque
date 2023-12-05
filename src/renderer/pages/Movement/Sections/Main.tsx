import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import DateRange from '../../../components/DateRange/DateRange';
import Spinner from '../../../components/Loaders/Spinner';
import MovementsTable from '../../../components/Tables/MovementsTable';

import useAuthContext from '../../../hooks/useAuth';
import { useGetMovements } from '../../../hooks/useMovement';
import { formatDateToString } from '../../../lib/filter';

export const MovementMain = () => {
  const { user, stablishment } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams({
    from: formatDateToString(new Date()),
    to: formatDateToString(new Date()),
  });

  const savedFrom = window.electron.store.get('date-from');
  const savedTo = window.electron.store.get('date-to');

  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const form = useForm({
    defaultValues: {
      from: savedFrom ?? from,
      to: savedTo ?? to,
    },
  });

  const { data, isLoading } = useGetMovements(
    user?.id || '',
    savedFrom ?? from,
    savedTo ?? to,
    stablishment?.id || '',
  );

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-md lg:text-lg xl:text-xl font-semibold text-graphite-400">
        {`Lista de movimentos ${stablishment ? `| ${stablishment.name}` : ''}`}
      </h2>
      <MovementsTable
        extraFilters={<DateRange setDates={setSearchParams} form={form} />}
        movements={data?.movements || []}
      />
    </div>
  );
};

import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Button from '../Button/Button';

import { formatDateToString, parseStringToDate } from '../../lib/filter';
import { DateRangeProps } from './interface';

const DateRange = ({ form, setDates }: DateRangeProps) => {
  const {
    handleSubmit,
    control,
    formState: { isDirty },
    watch,
    reset,
    getValues,
  } = form;

  const onSubmit = handleSubmit((data) => {
    setDates({
      from: data.from,
      to: data.to,
    });
    window.electron.store.set('date-from', data.from);
    window.electron.store.set('date-to', data.to);

    reset(getValues());
  });

  return (
    <form onSubmit={onSubmit} className="h-full flex items-end">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-graphite-400">
          A partir
        </label>
        <Controller
          control={control}
          name="from"
          render={({ field }) => (
            <DatePicker
              selected={parseStringToDate(field.value)}
              onChange={(date) =>
                field.onChange(formatDateToString(date || new Date()))
              }
              dateFormat="MM/yyyy"
              showMonthYearPicker
              selectsStart
              popperPlacement="bottom-start"
              startDate={parseStringToDate(field.value)}
              endDate={parseStringToDate(watch('to'))}
            />
          )}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-graphite-400">Até</label>
        <Controller
          control={control}
          name="to"
          render={({ field }) => (
            <DatePicker
              selected={parseStringToDate(field.value)}
              onChange={(date) =>
                field.onChange(formatDateToString(date || new Date()))
              }
              dateFormat="MM/yyyy"
              showMonthYearPicker
              selectsEnd
              startDate={parseStringToDate(watch('from'))}
              endDate={parseStringToDate(field.value)}
              minDate={parseStringToDate(watch('from'))}
            />
          )}
        />
      </div>
      {isDirty && (
        <Button type="submit" variant="outline">
          Aplicar Datas
        </Button>
      )}
    </form>
  );
};

export default DateRange;

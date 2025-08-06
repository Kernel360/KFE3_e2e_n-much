import { Button } from '@repo/ui/components/ui/button';
import { Calendar } from '@repo/ui/components/ui/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/ui/popover';
import { cn } from '@repo/ui/lib/utils';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FaCalendarAlt } from 'react-icons/fa';
import type { FieldValues } from 'react-hook-form';
import type { FormEndDayProps } from 'src/entities/auction/types';

const FormEndDay = <T extends FieldValues>({
  control,
  name,
  endDayLabel,
  placeholder,
  endTime,
  validateDisableDate
}: FormEndDayProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <FormLabel>
            {endDayLabel}
            <span className="text-(--color-red)">&#42;</span>
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <FaCalendarAlt className="text-(--color-accent) h-4 w-4 opacity-50" />
                  {field.value ? format(field.value, 'PPP', { locale: ko }) : <span>{placeholder}</span>}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(day) => validateDisableDate(day, endTime, true)}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormEndDay;

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import type { FieldValues } from 'react-hook-form';
import type { FormStartingPointProps } from 'src/entities/auction/types';

const FormStartingPoint = <T extends FieldValues>({
  control,
  name,
  startingPointLabel,
  placeholder
}: FormStartingPointProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {startingPointLabel} <span className="text-(--color-red)"> &#42;</span>
          </FormLabel>
          <FormControl>
            <Input className="bg-white" type="number" placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormStartingPoint;

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { useWatch } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

type FormDescriptionType<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  descriptionLabel: string;
  placeholder: string;
  maxDescLength: number;
};

const FormDescription = <T extends FieldValues>({
  control,
  name,
  descriptionLabel,
  placeholder,
  maxDescLength
}: FormDescriptionType<T>) => {
  const description = useWatch({ control, name });
  const descTextColor = description.length >= maxDescLength ? 'text-(--color-red)' : 'text-(--color-warm-gray)';

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex gap-0.5">
            <p className="text-black">{descriptionLabel}</p>
            <span className="text-(--color-red) translate-y-0.5">&#42;</span>
          </FormLabel>
          <div className="relative mt-2">
            <FormControl>
              <Textarea
                {...field}
                className="h-51 w-full resize-none break-all bg-white p-3.5"
                placeholder={placeholder}
                rows={4}
              ></Textarea>
            </FormControl>
          </div>
          <div className="relative">
            <FormMessage />
            <p className={`absolute right-0 top-0 text-xs font-semibold ${descTextColor}`}>
              {description.length}/{maxDescLength}
            </p>
          </div>
        </FormItem>
      )}
    ></FormField>
  );
};

export default FormDescription;

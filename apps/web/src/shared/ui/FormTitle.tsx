import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { useWatch } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

type FormTitleType<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  titleLabel: string;
  placeholder: string;
  maxTitleLength: number;
};

const FormTitle = <T extends FieldValues>({
  control,
  name,
  titleLabel,
  placeholder,
  maxTitleLength
}: FormTitleType<T>) => {
  const title = useWatch({ control, name });
  const titleTextColor = title.length >= maxTitleLength ? 'text-(--color-red)' : 'text-(--color-warm-gray)';

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-8">
          <FormLabel className="flex gap-0.5">
            <p className="text-black">{titleLabel}</p>
            <span className="text-(--color-red) translate-y-0.5">&#42;</span>
          </FormLabel>
          <div className="relative mt-2">
            <FormControl>
              <Input type="text" {...field} className="h-11 bg-white p-3.5" placeholder={placeholder} />
            </FormControl>
          </div>
          <div className="relative">
            <FormMessage />
            <p className={`absolute right-0 top-0 text-xs font-semibold ${titleTextColor}`}>
              {title.length}/{maxTitleLength}
            </p>
          </div>
        </FormItem>
      )}
    ></FormField>
  );
};

export default FormTitle;

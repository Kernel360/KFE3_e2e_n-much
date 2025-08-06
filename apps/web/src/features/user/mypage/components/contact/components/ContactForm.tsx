import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';

const ContactForm = () => {
  return (
    <form>
      <div className="flex flex-col">
        <label className="mb-2 flex items-center gap-0.5 text-sm">
          제목
          <span className="text-(--color-red) translate-y-0.5">*</span>
        </label>
        <Input type="text" placeholder="제목을 입력해 주세요." maxLength={10} />
      </div>
      <div className="mt-8 flex flex-col">
        <label className="mb-2 flex items-center gap-0.5 text-sm">
          내용
          <span className="text-(--color-red) translate-y-0.5">*</span>
        </label>
        <Textarea placeholder="내용을 입력해 주세요." className="h-50" />
      </div>
      <div className="w-ful absolute bottom-0 left-0 right-0 bg-white p-4">
        <Button variant="base" className="w-full">
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;

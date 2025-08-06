import { notFound } from 'next/navigation';
import { getDefaultAddressInfo } from 'src/entities/addresses/api';
import { getServerUser } from 'src/entities/auth/serverAction';
import AddressForm from 'src/features/addresses/components/AddressForm';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';
import type { AddressRow } from 'src/shared/supabase/types';

const AddressFormPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const paramId = (await params).id;

  const user = await getServerUser();
  if (!user) {
    return notFound();
  }

  // true: 수정, false: 등록
  let initialAddressInfo: AddressRow | null = null;
  if (paramId !== 'write') {
    initialAddressInfo = await getDefaultAddressInfo(user.id);
  }

  return (
    <>
      <DetailPageHeader>주소 추가</DetailPageHeader>
      <PageContainer className="relative px-4 pb-8">
        <section className="w-full">
          <AddressForm initialAddressInfo={initialAddressInfo} userId={user.id} />
        </section>
      </PageContainer>
    </>
  );
};

export default AddressFormPage;

import AddressList from 'src/features/addresses/components/AddressList';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const AddressesPage = () => {
  return (
    <>
      <DetailPageHeader>주소록 관리</DetailPageHeader>
      <PageContainer>
        <AddressList />
      </PageContainer>
    </>
  );
};

export default AddressesPage;

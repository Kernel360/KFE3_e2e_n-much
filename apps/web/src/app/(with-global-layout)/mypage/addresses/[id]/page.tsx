import AddressFormPage from 'src/features/addresses/AddressFormPage';

const Address = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <AddressFormPage params={params} />
    </>
  );
};

export default Address;

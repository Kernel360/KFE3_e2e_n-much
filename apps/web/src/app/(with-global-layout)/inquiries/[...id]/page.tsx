import InquiryWritePage from 'src/features/inquiries/InquiryWritePage';

const InquiryWrite = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  return (
    <>
      <InquiryWritePage params={params} />
    </>
  );
};

export default InquiryWrite;

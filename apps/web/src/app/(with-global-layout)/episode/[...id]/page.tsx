import EpisodePage from 'src/features/episode/EpisodePage';

const Episode = async ({
  params,
  searchParams
}: {
  params: Promise<{ id: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <>
      <EpisodePage params={params} searchParams={searchParams} />
    </>
  );
};

export default Episode;

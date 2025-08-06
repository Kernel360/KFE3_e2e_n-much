import { redirect } from 'next/navigation';
import { getServerUserWithProfile } from 'src/entities/auth/serverAction';

const HomePage = async () => {
  const user = await getServerUserWithProfile();

  if (user) {
    redirect('/main');
  } else {
    redirect('/onboarding');
  }
};

export default HomePage;

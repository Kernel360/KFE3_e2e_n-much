import { signUpMetaData } from 'src/entities/auth/metaData';
import SignUpPage from 'src/features/auth/SignUpPage';

export const metadata = signUpMetaData;

const SignUp = () => {
  return (
    <>
      <SignUpPage />
    </>
  );
};

export default SignUp;

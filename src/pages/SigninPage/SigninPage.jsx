import AuthForm from "../../components/AuthForm/AuthForm";
import css from './SigninPage.module.css';

const SigninPage = () => {
  return(
    <div className={css.signinpage}>
      <AuthForm />
    </div>
  )
};

export default SigninPage;
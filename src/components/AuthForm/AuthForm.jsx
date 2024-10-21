import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useId } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';

import { PiEyeLight } from 'react-icons/pi';
import { PiEyeSlash } from 'react-icons/pi';

import css from './AuthForm.module.css';
import { logIn, register } from '../../redux/auth/operations.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { selectUser } from '../../redux/auth/selectors';

const signUpValidationSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email!').required('Required'),
  password: yup
    .string()
    .min(6, 'Must be at least 6 characters!')
    .required('Required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const AuthForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState('Sign Up');
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const repeatPasswordFieldId = useId();

  const user = useSelector(selectUser);

  const initialValues = {
    email: user.email ?? '',
    password: '',
    repeatPassword: '',
  };

  useEffect(() => {
    if (location.pathname === '/login') {
      setAction('Sign In');
    } else if (location.pathname === '/register') {
      setAction('Sign Up');
    }
  }, [location.pathname]);

  const handleSubmit = ({ repeatPassword, ...loginValues }, actions) => {
    switch (action) {
      case 'Sign Up':
        dispatch(register(loginValues))
          .unwrap()
          .then(() => {
            toast.success('Registration success!');
            navigate('/login');
          })
          .catch(e => {
            console.error('Registration error: ', e);
            toast.error(
              `Registration failed. Please check your information and try again.`
            );
          });
        break;
      case 'Sign In':
        dispatch(logIn(loginValues))
          .unwrap()
          .then(() => {
            toast.success('Login success!');
          })
          .catch(e => {
            console.error('Login error: ', e);
            toast.error(`Incorrect login or password. Please try again`);
          });
        break;
      default:
        break;
    }

    actions.resetForm();
  };

  return (
    <>
      <div className={css.wrap_form}>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={css.form}>
              <h2 className={css.title}>{action}</h2>

              <div>
                <label className={css.label} htmlFor={emailFieldId}>
                  Enter your email
                </label>
                <Field
                  className={`${css.field} ${
                    errors.email && touched.email ? css.errorField : ''
                  }`}
                  type="email"
                  name="email"
                  id={emailFieldId}
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errorText}
                />
              </div>

              <div className={css.inputWrapper}>
                <label className={css.label} htmlFor={passwordFieldId}>
                  Enter your password
                </label>
                <Field
                  className={`${css.field} ${
                    touched.password && errors.password ? css.errorField : ''
                  }`}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id={passwordFieldId}
                  placeholder="Password"
                />
                <div
                  className={css.iconWrapper}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <PiEyeSlash className={css.icon} />
                  ) : (
                    <PiEyeLight className={css.icon} />
                  )}
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.errorText}
                />
              </div>

              {action === 'Sign Up' && (
                <div className={css.inputWrapper}>
                  <label className={css.label} htmlFor={repeatPasswordFieldId}>
                    Repeat password
                  </label>
                  <Field
                    className={`${css.field} ${
                      touched.password && errors.password ? css.errorField : ''
                    }`}
                    type={showPassword ? 'text' : 'password'}
                    name="repeatPassword"
                    id={repeatPasswordFieldId}
                    placeholder="Repeat password"
                  />

                  <div
                    className={css.iconWrapper}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <PiEyeSlash className={css.icon} />
                    ) : (
                      <PiEyeLight className={css.icon} />
                    )}
                  </div>

                  <ErrorMessage
                    name="repeatPassword"
                    component="div"
                    className={css.errorText}
                  />
                </div>
              )}

              <button className={css.btn} type="submit">
                {action}
              </button>
            </Form>
          )}
        </Formik>
        <nav>
          <Link
            to={action === 'Sign In' ? '/register' : '/login'}
            className={css.link}
            onClick={() =>
              setAction(action === 'Sign In' ? 'Sign Up' : 'Sign In')
            }
          >
            {action === 'Sign In' ? 'Sign Up' : 'Sign In'}
          </Link>
        </nav>
      </div>
    </>
  );
};

export default AuthForm;

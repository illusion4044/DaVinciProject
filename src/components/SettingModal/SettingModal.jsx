import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import css from './SettingModal.module.css';
import userImage from '../../img/john_1x.jpg';
import { updateUser } from '../../redux/users/operations.js';

const UserSchema = Yup.object().shape({
  gender: Yup.string().required('Please select your gender'),
  name: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(32, 'Maximum 32 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  newPassword: Yup.string().min(
    8,
    'New password must be at least 8 characters long'
  ),
  repeatNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Repeat new password is required'),
});

export default function SettingModal({ closeModal }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(updateUser(values)).unwrap();
      toast.success('Settings updated successfully');
      closeModal();
    } catch (error) {
      toast.error('Failed to update settings');
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleImageUpload = () => {
    toast.info('Image upload feature is not yet implemented');
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick} tabIndex="0">
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <div className={css.wrap}>
          <div className={css.modalHeadingWrap}>
            <p className={css.modalHeading}>Settings</p>
          </div>
          <button type="button" className={css.modalBtn} onClick={closeModal}>
            <svg className={css.closeIcon} width="24" height="24">
              <use href="/icons.svg#icon-x-mark-colored-optimized"></use>
            </svg>
          </button>
        </div>

        <p className={css.subheader}>Your photo</p>

        <div className={css.wrapImageUpload}>
          <img
            className={css.userImg}
            src={user.photo || userImage}
            alt={user.name || 'User photo'}
          />
          <button
            type="button"
            className={css.modalBtn}
            onClick={handleImageUpload}
          >
            <svg className={css.arrowUpTrayIcon} width="16" height="16">
              <use href="/icons.svg#icon-arrow-up-tray"></use>
            </svg>
          </button>
          <p className={css.uploadText}>Upload a photo</p>
        </div>

        <p className={css.subheader}>Your gender identity</p>

        <Formik
          initialValues={{
            gender: user.gender || 'woman',
            name: user.name || '',
            email: user.email || '',
            password: '',
            newPassword: '',
            repeatNewPassword: '',
          }}
          validationSchema={UserSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className={css.form}>
              <div className={css.formGroup}>
                <div className={css.radioGroup}>
                  <label>
                    <Field type="radio" name="gender" value="woman" />
                    Woman
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="man" />
                    Man
                  </label>
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.formGroup}>
                <Field
                  className={css.inputName}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.formGroup}>
                <Field
                  className={css.inputEmail}
                  type="email"
                  name="email"
                  placeholder="E-mail"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.formGroup}>
                <label htmlFor="password">Outdated password:</label>
                <div className={css.modalInputWrap}>
                  <Field
                    className={css.inputOutdated}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                  />
                  <svg
                    className={css.eyeIcon}
                    width="16"
                    height="16"
                    onClick={togglePasswordVisibility}
                  >
                    <use
                      href={`/icons.svg#icon-eye-${
                        showPassword ? '' : 'slash'
                      }`}
                    ></use>
                  </svg>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.formGroup}>
                <label htmlFor="newPassword">New Password:</label>
                <div className={css.modalInputWrap}>
                  <Field
                    className={css.inputNewPassword}
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    placeholder="New password"
                  />
                  <svg
                    className={css.eyeIcon}
                    width="16"
                    height="16"
                    onClick={togglePasswordVisibility}
                  >
                    <use
                      href={`/icons.svg#icon-eye-${
                        showPassword ? '' : 'slash'
                      }`}
                    ></use>
                  </svg>
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.formGroup}>
                <label htmlFor="repeatNewPassword">Repeat New Password:</label>
                <div className={css.modalInputWrap}>
                  <Field
                    className={css.inputRepeatNewPassword}
                    type={showPassword ? 'text' : 'password'}
                    name="repeatNewPassword"
                    placeholder="Repeat password"
                  />
                  <svg
                    className={css.eyeIcon}
                    width="16"
                    height="16"
                    onClick={togglePasswordVisibility}
                  >
                    <use
                      href={`/icons.svg#icon-eye-${
                        showPassword ? '' : 'slash'
                      }`}
                    ></use>
                  </svg>
                </div>
                <ErrorMessage
                  name="repeatNewPassword"
                  component="div"
                  className={css.error}
                />
              </div>

              {errors.submit && (
                <div className={css.error}>{errors.submit}</div>
              )}

              <button
                type="submit"
                className={css.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

SettingModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

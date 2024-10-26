import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { selectUser } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';
import css from './SettingModal.module.css';

import userImage from '../../img/setting_modal-img/userPhoto1x.jpg';
import { uploadUserPhoto, updateUserInfo } from '../../redux/users/operations';
import Loader from '../Loader/Loader.jsx';

import userImage from '../../img/settingModalImg/userPhoto1x.jpg';
import { updateUser } from '../../redux/users/operations.js';


// New file

const UserSchema = Yup.object().shape({
  gender: Yup.string().required('Please select your gender'),

  name: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(32, 'Maximum 32 characters')
    .notRequired(),

  email: Yup.string().email('Invalid email').notRequired(),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .notRequired(),

  newPassword: Yup.string()
    .min(8, 'New password must be at least 8 characters long')
    .when('password', {
      is: val => Boolean(val),
      then: Yup.string().required(
        'New password is required if old password is provided'
      ),
    }),

  repeatNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .when('password', {
      is: val => Boolean(val),
      then: Yup.string().required(
        'Repeat new password is required if old password is provided'
      ),
    }),
});

export default function SettingModal({ closeModal }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState(
    user.photo || userImage
  );

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

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      setPreviewPhotoUrl(URL.createObjectURL(file));
    }
  };

  // const handleSubmit = async (values, { setSubmitting, setErrors }) => {
  //   try {
  //     const userData = {
  //       ...values,
  //       token: user.token,
  //     };

  //     if (selectedPhoto) {
  //       await dispatch(
  //         uploadUserPhoto({ photo: selectedPhoto, token: user.token })
  //       ).unwrap();
  //     }

  //     if (
  //       values.name !== user.name ||
  //       values.email !== user.email ||
  //       values.gender !== user.gender ||
  //       values.password
  //     ) {
  //       await dispatch(updateUserInfo({ ...userData, id: user._id })).unwrap();
  //     }

  //     toast.success('Settings updated successfully');
  //     closeModal();
  //   } catch (error) {
  //     toast.error('Failed to update settings');
  //     setErrors({ submit: error.message });
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const userData = {
        ...values,
        token: user.token,
      };

      // Check if photo was changed and only upload in production
      if (selectedPhoto) {
        if (import.meta.env.MODE === 'development') {
          console.log('Simulating photo upload in development mode.');
        } else {
          await dispatch(
            uploadUserPhoto({ photo: selectedPhoto, token: user.token })
          ).unwrap();
        }
      }

      // Check if other fields were changed
      if (
        values.name !== user.name ||
        values.email !== user.email ||
        values.gender !== user.gender ||
        values.password
      ) {
        await dispatch(updateUserInfo({ ...userData, id: user._id })).unwrap();
      }

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

  return (
    <div
      className={css.backdrop}
      onClick={e => e.target === e.currentTarget && closeModal()}
    >
      <div className={css.modal}>
        {isLoading && (
          <div className={css.loaderContainer}>
            <Loader />
          </div>
        )}
        <div className={css.wrap}>
          <p className={css.modalHeading}>Settings</p>
          <button type="button" className={css.uploadBtn} onClick={closeModal}>
            <svg className={css.closeIcon} width="24" height="24">
              <use href="/icons.svg#icon-x-mark"></use>
            </svg>
          </button>
        </div>

        <p className={css.subheaderYourPhoto}>Your photo</p>

        <div className={css.wrapImageUpload}>
          <img
            className={css.userImg}
            src={previewPhotoUrl}
            alt={user.name || 'User photo'}
          />
          <button
            type="button"
            className={css.uploadBtn}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <svg className={css.arrowUpTrayIcon} width="16" height="16">
              <use href="/icons.svg#icon-arrow-up-tray"></use>
            </svg>
            <span className={css.uploadText}>Upload a photo</span>
          </button>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>

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
              <div className={css.formInner}>
                <div className={css.leftColumn}>
                  <p className={css.subheaderGender}>Your gender identity</p>
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

                  <p className={css.subheaderYourName}>Your name</p>

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

                  <p className={css.subheaderEmail}>E-mail</p>

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
                </div>

                <div className={css.rightColumn}>
                  <p className={css.subheaderPassword}>Password</p>

                  <div className={css.passwordFormGroup}>
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

                  <div className={css.passwordFormGroup}>
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

                  <div className={css.passwordRepeat}>
                    <label htmlFor="repeatNewPassword">
                      Repeat New Password:
                    </label>
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
                </div>
              </div>
              <div className={css.submitBtnWrapper}>
                <button
                  type="submit"
                  className={css.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
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

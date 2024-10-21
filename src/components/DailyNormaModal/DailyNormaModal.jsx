import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import css from './DailyNormaModal.module.css';

import { changeDailyNorma } from '../../redux/water/slice.js';
import {
  fetchMonthlyPortionsThunk,
  updatePortionThunk,
  updateWaterRateThunk,
} from '../../redux/water/operations.js';
import {
  getUserDailyNorma,
  getUserGender,
} from '../../redux/water/selectors.js';

export default function DailyNormaModal({ onClose }) {
  const womanFormula = 'V=(M*0.03) + (T*0.4)';
  const manFormula = 'V=(M*0.04) + (T*0.6)';
  const dispatch = useDispatch();
  const [calculatedNorma, setCalculatedNorma] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const gender = useSelector(getUserGender);
  const dailyNorma = useSelector(getUserDailyNorma);
  const [selectedGender, setSelectedGender] = useState(gender);

  const calculateSchema = Yup.object({
    weight: Yup.number()
      .typeError('Weight must be a number')
      .positive()
      .min(20, 'Minimum value is 20kg')
      .max(300, 'Maximum value is 300kg')
      .required('Weight is required'),
    time: Yup.number()
      .typeError('Time must be a number')
      .positive()
      .min(0.1, 'Minimum value is 0.1h')
      .max(24, 'Maximum value is 24h')
      .required('Time is required'),
    amountOfWater: Yup.number()
      .typeError('Water amount must be a number')
      .min(0.1, 'Minimum value is 0.1L')
      .max(15, 'Maximum value is 15L')
      .required('Water amount is required'),
  });

  const getCurrentDate = () => {
    const currentDate = new Date();
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYear = currentDate.getFullYear();
    return `${currentDay}-${currentMonth}-${currentYear}`;
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const formik = useFormik({
    initialValues: {
      gender: selectedGender,
      weight: dailyNorma?.weight || '',
      time: dailyNorma?.time || '',
      amountOfWater: dailyNorma?.dailyNormaLiters || '',
    },
    validationSchema: calculateSchema,

    onSubmit: async values => {
      setIsLoading(true);
      try {
        const weight = Number(values.weight);
        const time = Number(values.time);
        const dailyNormaLiters = Number(values.amountOfWater);
        const dailyNormaMl = dailyNormaLiters * 1000;

        const newDailyNorma = { dailyNorma: dailyNormaMl, weight, time };
        const currentDate = getCurrentDate();

        dispatch(changeDailyNorma(newDailyNorma));
        await dispatch(updateWaterRateThunk(newDailyNorma));
        await dispatch(updatePortionThunk(newDailyNorma));
        await dispatch(fetchMonthlyPortionsThunk(currentDate));

        toast.success('Data saved successfully!');
        onClose();
      } catch (error) {
        toast.error('An error occurred while saving data!');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleGenderChange = e => {
    setSelectedGender(e.target.value);
    formik.setFieldValue('gender', e.target.value);
  };

  useEffect(() => {
    const weight = Math.floor(formik.values.weight);
    const time = Math.floor(formik.values.time);
    let result;

    if (isNaN(weight) || isNaN(time) || weight <= 0) {
      result = calculatedNorma;
    } else {
      result =
        formik.values.gender === 'woman'
          ? (weight * 0.03 + time * 0.4).toFixed(1)
          : (weight * 0.04 + time * 0.6).toFixed(1);
    }
    setCalculatedNorma(result);
  }, [
    calculatedNorma,
    formik.values.gender,
    formik.values.time,
    formik.values.weight,
  ]);

  return (
    <div className={css.modalContainer} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <div className={css.modalHeaderContainer}>
          <h1 className={css.header}>My daily norma</h1>
          <button onClick={onClose} className={css.closeButton}>
            <span>&times;</span>
          </button>
        </div>
        <div className={css.formulaContainer}>
          <div className={css.womanFormula}>
            <p className={css.formulaText}>
              For woman: <span className={css.formula}>{womanFormula}</span>
            </p>
          </div>
          <div className={css.manFormula}>
            <p className={css.formulaText}>
              For man: <span className={css.formula}>{manFormula}</span>
            </p>
          </div>
        </div>
        <div className={css.placeholderContainer}>
          <p className={css.placeholder}>
            <span>
              * V is the volume of the water norm in liters per day, M is your
              body weight, T is the time of active sports, or another type of
              activity commensurate in terms of loads (in the absence of these,
              you must set 0)
            </span>
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <h2 className={css.rate}>Calculate your rate:</h2>
            <div className={css.radio}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="woman"
                  checked={selectedGender === 'woman'}
                  onChange={handleGenderChange}
                  className={css.gender}
                />
                For woman
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="man"
                  checked={selectedGender === 'man'}
                  onChange={handleGenderChange}
                  className={css.gender}
                />
                For man
              </label>
            </div>

            <label>
              <p className={css.weight}>Your weight in kilograms:</p>
              <input
                id="weight"
                type="number"
                name="weight"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.weight}
                placeholder="0"
                className={css.value}
              />
              {formik.touched.weight && formik.errors.weight ? (
                <div className={css.error}>{formik.errors.weight}</div>
              ) : null}
            </label>

            <label>
              <p className={css.text}>
                The time of active participation in sports or other activities
                with a high physical load in hours:
              </p>
              <input
                id="time"
                type="number"
                name="time"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.time}
                placeholder="0"
                className={css.value}
              />
              {formik.touched.time && formik.errors.time ? (
                <div className={css.error}>{formik.errors.time}</div>
              ) : null}
            </label>
            <div className={css.amountContainer}>
              <p className={css.amount}>
                The required amount of water in liters per day:
              </p>
              <p className={css.calculatedNorma}>{calculatedNorma}</p>
            </div>
          </div>

          <div>
            <label>
              <h2 className={css.amountOfWater}>
                Write down how much water you will drink:
              </h2>
              <input
                type="number"
                name="amountOfWater"
                id="amountOfWater"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amountOfWater}
                placeholder="0"
                className={css.value}
              />
              {formik.touched.amountOfWater && formik.errors.amountOfWater ? (
                <div className={css.error}>{formik.errors.amountOfWater}</div>
              ) : null}
            </label>
          </div>

          <button type="submit" disabled={isLoading} className={css.saveButton}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}

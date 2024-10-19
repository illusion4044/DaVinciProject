import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
/* import css from './DailyNormaModal.module.css'; */

import { changeDailyNorma } from '../../redux/water/slice.js';
import {
  fetchMonthlyPortionsThunk,
  updatePortionThunk,
} from '../../redux/water/operations.js';
import {
  getUserDailyNorma,
  getUserGender,
} from '../../redux/water/selectors.js';

export default function DailyNormaModal({ onClose }) {
  const dispatch = useDispatch();
  const womanFormula = 'V=(M*0.03) + (T*0.4)';
  const manFormula = 'V=(M*0.04) + (T*0.6)';

  const [calculatedNorma, setCalculatedNorma] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const gender = useSelector(getUserGender);
  const dailyNorma = useSelector(getUserDailyNorma);
  const [selectedGender, setSelectedGender] = useState(gender);

  // Валідація полів
  const calculateSchema = Yup.object({
    weight: Yup.number()
      .typeError('Weight must be a number')
      .positive()
      .min(20, 'Minimum value is 20kg')
      .max(300, 'Maximum value is 300kg'),
    time: Yup.number()
      .typeError('Time must be a number')
      .positive()
      .min(0.1, 'Minimum value is 0.1h')
      .max(24, 'Maximum value is 24h'),
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
    <div onClick={handleBackdropClick}>
      <div>
        <div className="modal-header">
          <h1>My daily norma</h1>
          <button onClick={onClose} className="close-btn">
            &times;
          </button>
        </div>

        <p>
          For woman: <span>{womanFormula}</span>
        </p>
        <p>
          For man: <span>{manFormula}</span>
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <h2>Calculate your rate:</h2>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="woman"
                  checked={selectedGender === 'woman'}
                  onChange={handleGenderChange}
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
                />
                For man
              </label>
            </div>

            <label>
              <p>Your weight in kilograms:</p>
              <input
                id="weight"
                type="number"
                name="weight"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.weight}
                placeholder="0"
              />
            </label>

            <label>
              <p>
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
              />
            </label>
            <p>
              The required amount of water in liters per day: {calculatedNorma}
            </p>
          </div>

          <div>
            <label>
              <h2>Write down how much water you will drink:</h2>
              <input
                type="number"
                name="amountOfWater"
                id="amountOfWater"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amountOfWater}
                placeholder="0"
              />
            </label>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}

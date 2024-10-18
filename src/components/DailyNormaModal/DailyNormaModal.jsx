
import * as Yup from 'yup';
import { useFormik } from 'formik';


export default function DailyNormaModal() {

  const womanFormula = 'V=(M*0,03) + (T*0,4)';
  const manFormula = 'V=(M*0,04) + (T*0,6)';

  const calculateSchema = Yup.object({
    weight: Yup.number()
      .typeError('Weight must be a number')
      .positive()
      .min(20, 'Min value 20kg')
      .max(300, 'Max value 300kg'),
    time: Yup.number()
      .typeError('Time must be a number')
      .positive()
      .min(0, 1, 'Min value 0,1h')
      .max(24, 'Max value 24h'),
    amountOfWater: Yup.number()
      .typeError('Water amount must be a number')
      .min(0, 1, 'Min value 0,1L')
      .max(15, 'Max value 15L')
      .required('water amount is required'),
  });


  const formik = useFormik({
    initialValues: {
      gender: '',
      weight: '',
      time: '',
      amountOfWater: '',
    },
    validationSchema: calculateSchema,

  });

  return (
    <div>
      <h1>My daily norma </h1>
      <p>
        For woman: <span>{womanFormula}</span>
      </p>
      <p>
        For man: <span>{manFormula}</span>
      </p>
      <p>
        * V is the volume of the water norm in liters per day, M is your body
        weight, T is the time of active sports, or another type of activity
        commensurate in terms of loads (in the absence of these, you must set 0)
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
                checked={'woman'}

              />
              For woman
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="man"
                checked={ 'man'}

              />
              For man
            </label>
          </div>
          <label>
            <p>Your weight in kilograms:</p>
            <input
              id="weight"
              type="text"
              name="weight"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="0"
            />
          </label>
          <label>
            <p>
              The time of active participation in sports or other activities
              with a high physical. load in hours:
            </p>
            <input
              id="activitys"
              type="text"
              name="activitys"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="0"
            />
            <p>
              The required amount of water in liters per day: {}
            </p>
          </label>
        </div>
        <div>
          <label>
            <h2>Write down how much water you will drink:</h2>
            <input
              type="text"
              name="amountOfWater"
              id="amountOfWater"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="0"
            />
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

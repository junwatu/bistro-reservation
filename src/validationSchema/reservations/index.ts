import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  status: yup.string().required(),
  bistro_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});

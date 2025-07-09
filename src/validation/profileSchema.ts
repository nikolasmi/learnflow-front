import * as yup from 'yup'
import { firstName as name, lastName as surname, email, phoneNumber as phone } from './sharedSchema'
export const profileSchema = yup.object({
  name,
  surname,
  email,
  phone
})

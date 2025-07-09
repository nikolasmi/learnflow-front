import * as yup from 'yup'
import { password } from './sharedSchema'

export const changePasswordSchema = yup.object({
  password,
  newPassword: yup
    .string()
    .required('Нова шифра је обавезна')
    .notOneOf([yup.ref('password')], 'Стара и нова шифра су исте')
    .default(''),
  confirmNewPassword: yup
    .string()
    .required('Потврда шифре је обавезна')
    .oneOf([yup.ref('newPassword')], 'Шифре се не поклапају')
})

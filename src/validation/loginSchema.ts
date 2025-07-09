import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().required('Емаил поље је обавезно'),
  password: yup.string().required('Шифра је обавезна')
})

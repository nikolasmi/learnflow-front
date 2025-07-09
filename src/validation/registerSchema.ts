import * as yup from 'yup'

export const registerSchema = yup.object({
  name: yup
    .string()
    .required('Име је обавезно')
    .transform((currValue) => currValue.trim())
    .max(35, 'Име сме имати максимално 35 карактера')
    .matches(/^[\p{L}\s]+$/u, 'Име сме садржати само словне карактере'),
  surname: yup
    .string()
    .required('Презиме је обавезно')
    .transform((currValue) => currValue.trim())
    .max(35, 'Презиме сме имати максимално 35 карактера')
    .matches(/^[\p{L}\s]+$/u, 'Презиме сме садржати само словне карактере'),
  email: yup
    .string()
    .required('Имејл је обавезан')
    .email('Имејл није валидан'),
  password: yup
    .string()
    .required('Лозинка је обавезна')
    .min(8, 'Лозинка мора имати минимално 8 карактера'),
  phone: yup
    .string()
    .required('Телефон је обавезан')
    .matches(/^\+(381|382|387)[0-9]*$/, 'Телефон мора почети са +381, +382 или +387 и може садржати само бројеве')
})

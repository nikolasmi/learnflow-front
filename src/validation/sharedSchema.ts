import * as yup from 'yup'

const REGEX_FOR_ALLOWED_CHARACTERS = /^[\p{L}\s]+$/u // this allows any character from any language to be written

const username = yup.string().required('Корисничко име је обавезно').default('')
const email = yup.string().required('Email је обавезно поље').email('Email није валидан').default('')
const password = yup.string().required('Шифра је обавезна').min(5, 'Шифра мора имати минимум 5 карактера')
const firstName = yup
  .string()
  .required('Име је обавезно')
  .transform((currVal) => currVal.trim())
  .max(70, 'Име може имати максимално 70 карактера')
  .matches(REGEX_FOR_ALLOWED_CHARACTERS, 'Име може садржати само слова')
  .default('')
const lastName = yup
  .string()
  .required('Презиме је обавезно')
  .transform((currVal) => currVal.trim())
  .max(70, 'Презиме може имати максимално 70 карактера')
  .matches(REGEX_FOR_ALLOWED_CHARACTERS, 'Презиме може садржати само слова')
  .default('')
const phoneNumber = yup
  .string()
  .matches(/^(\d+)?$/, 'Број телефона сме садржати само бројеве')
  .default('')
const dateSchema = yup.date().typeError('Формат датума није валидан').required('Датум од је обавено поље')

export { email, password, firstName, lastName, phoneNumber, username, dateSchema }

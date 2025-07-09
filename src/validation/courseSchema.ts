import * as yup from 'yup'

export const courseSchema = yup.object({
  title: yup
    .string()
    .required('Наслов је обавезан')
    .trim()
    .max(100, 'Наслов не сме бити дужи од 100 карактера'),

  shortDescription: yup
    .string()
    .required('Кратак опис је обавезан')
    .trim()
    .max(200, 'Кратак опис не сме бити дужи од 200 карактера'),

  description: yup
    .string()
    .required('Опис је обавезан')
    .trim()
    .max(1000, 'Опис не сме бити дужи од 1000 карактера'),

  price: yup
    .number()
    .typeError('Цена мора бити број')
    .required('Цена је обавезна')
    .min(0, 'Цена не може бити негативна'),

  categoryId: yup
    .number()
    .typeError('Категорија мора бити број')
    .required('Категорија је обавезна')
    .integer('Категорија мора бити цели број')
    .min(1, 'Неисправан ID категорије'),
})

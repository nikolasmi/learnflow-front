import * as yup from 'yup'

export const purchaseSchema = yup.object({
  cardNumber: yup
    .string()
    .required('Broj kartice je obavezan')
    .matches(/^\d{13,19}$/, 'Kartica mora imati između 13 i 19 cifara'),
  cardHolder: yup
    .string()
    .required('Ime vlasnika kartice je obavezno')
    .min(2, "Ime je prekratko")
    .max(50, 'Ime je predugačko'),
  expiry: yup
    .string()
    .required('Datum isteka je obavezan')
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Datum isteka mora biti u formatu MM/YY'),
  cvv: yup
    .string()
    .required('CVV je obavezan')
    .matches(/^\d{3,4}$/, 'CVV mora imati 3 ili 4 cifre'),
  terms: yup
    .boolean()
    .oneOf([true], 'Morate se složiti sa uslovima korišćenja'),
})

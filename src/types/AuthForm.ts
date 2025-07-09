export interface ForgotPasswordForm {
  username: string
  email: string
}

export interface LoginForm extends ForgotPasswordForm {
  email: string
  password: string
}

export interface RegisterForm extends ForgotPasswordForm {
  firstName: string
  lastName: string
  password: string
}

export interface SignInInterface {
  email: string;
  password: string;
}

export interface SingUpInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  countryCode: string;
  phone: string;
}

export interface ChangePasswordInterface {
  newPassword: string;
  confirmPassword: string;
}

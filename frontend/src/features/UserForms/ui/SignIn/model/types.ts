export interface SignInParams {
  email: string;
  password: string;
}

export interface SignInData {
  accessToken: string;
  refreshToken: string;
}

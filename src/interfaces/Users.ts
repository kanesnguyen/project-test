interface UserInterface {
  id: number;
  code: string;
  type: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  forgotPasswordOtp: string;
  forgotPasswordSentAt: Date;
  avatar: string;
  status: string;
  dateOfBirth: Date;
  gender: string;
  facebookUserId: string;
  googleUserId: string;
  accumulatedMoney: number;
  createdAt?: Date;
  updatedAt?: Date;

  passwordConfirmation?: string;
};

export default UserInterface;

interface AdminInterface {
  id: number;
  avatar: string;
  username: string;
  password: string;
  fullname: string;
  phoneNumber: string;
  email: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export default AdminInterface;

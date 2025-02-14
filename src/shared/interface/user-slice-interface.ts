export interface CurrentUserInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  type: string;
  status: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSliceInterface {
  userId: string;
  token: string;
  currentUser: CurrentUserInterface;
  users: any;
  projectId: string | null;
}

export interface projectSliceInterface {
  projectId: string | null;
  projectName: string | null;
  projectStatus: string | null;
  projectPlan: string | null;
  createdAt?: Date | null;
}

export interface userIdAndToken {
  userId: string;
  token: string;
}

export type Geo = {
  lat: string;
  lng: string;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type DetailUser = {
  id?: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  [key: string]: string | number | undefined;
};

export type User = {
  listUsers: DetailUser[];
  selectedUserById: DetailUser;
  isLoading: boolean;
  isModal: boolean;
  isDelete: boolean;
  type: 'delete' | 'edit' | 'add' | '';
};

export type UserList = User[];

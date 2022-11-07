export type DrawerParamsList = {
  Home: undefined;
};
export type StackParamsList = {
  Dashbord: undefined;
  MyProfile: { screenIndex: number };
  Login: undefined;
  Logout: undefined;
};
export type ActionProps = {
  path?: string;
  method: "GET" | "POST";
  payload?: any;
  token?: string;
};

export interface InitialState {
  loading: boolean;
  error: string;
  data: any;
}
export interface IconsProps {
  name?: string;
  size?: number;
  color?: string;
  source?: string;
}
export interface DatumProps {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
}
export interface AuthProps {
  email: string;
  password: string;
}
export interface InputProps {
  name: string;
  value: string;
}

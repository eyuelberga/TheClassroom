export * from './props';
export interface RouteConfigSpec {
  path: string;
  component: any;
  exact: boolean;
}

export interface Badge {
  name: string;
  description?: string;
  icon?: string;
}

export interface UserMetaContextProps {
  userId: string;
  fullname: string;
  username: string;
  email: string;
  profilePicture: string | null;
  categories: string[];
  role: string;
  activated: boolean;
}

export interface ClaimPayload {
  userId: string;
  fullname: string;
  username: string;
  email: string;
  role: string;
  profilePicture: string | null;
  categories: string[];
  activated: boolean;
}
export interface Auth0Extended {
  'https://hasura.io/jwt/claims/profile': ClaimPayload;
}

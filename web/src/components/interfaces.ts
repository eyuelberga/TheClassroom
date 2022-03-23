import { ReactNode } from 'react';
import { ApolloError } from '@apollo/client';
import { ResponsiveValue } from '@chakra-ui/react';
export interface Extendable {
  action?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}
export interface BasicUserInfo {
  username: string;
  fullname: string;
  profilePicture?: string;
}
export interface ListProps<T> extends Exclude<Extendable, 'action'> {
  loading: boolean;
  data?: T[];
  error?: ApolloError;
  hideDetails?: boolean;
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
  onPreview?: (id: string) => void;
  link?:string;
  columns?: ResponsiveValue<number>;
}

export interface ManagementActions {
  onEdit?: () => void;
  onRemove?: () => void;
  onPreview?: () => void;
}

export interface BasicDisplayInfo {
  id: string;
  title: string;
  description?: string;
  updatedAt: string;
}

export interface ExtendedDisplayProps {
  hideUserInfo?: boolean;
  smallFont?: boolean;
  isDisabled?: boolean;
}

export interface Linkable {
  link?: string;
}

export interface Loadable {
  isLoading?: boolean;
}
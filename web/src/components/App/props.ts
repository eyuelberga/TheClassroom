import { RefObject } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Extendable,
} from '../interfaces';
import { ReactNode } from 'react';

export interface AccountMenuProps {
  minimal?: boolean;
}
export interface LayoutProps {
  children: any;
}
export interface AlertProps {
  title: string;
  description?: string | ReactNode;
  status: 'error' | 'warning' | 'success' | 'info';
}

export interface EmptyPlaceholderProps {
  icon: IconProp;
  title: string;
  description?: string;
}


export interface SubNavigationProps extends Pick<Extendable, 'action'> {
  title?: string;
  description?: string | ReactNode;
  goBack?: boolean;
}

export interface ListHeaderProps {
  title: string;
  linkName?: string;
  linkPath?: string;
}

export interface DialogContentProps {
  cancelRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
}
export interface DialogProps extends DialogContentProps {
  isOpen: boolean;
}

export interface DeleteDialogProps {
  callback: (id: string) => void;
  id: string;
  name?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface MenuAction {
  to: string;
  name: string;
  icon?: IconProp;
}
export type NavActions = (MenuAction | 'divider')[];

export interface NavMenuProps {
  actions: NavActions;
}

export interface StatsCardProps {
  title: string;
  stat?: string | number;
  icon?: IconProp;
  description?: string | ReactNode;
  onAction?: () => void;
}
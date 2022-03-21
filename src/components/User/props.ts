import {
  ListProps,
  BasicUserInfo,
  Linkable,
  ExtendedDisplayProps,
  Extendable,
} from '../interfaces';

export interface UserItemProps
  extends BasicUserInfo,
    Linkable,
    Pick<ExtendedDisplayProps, 'smallFont'>,
    Pick<Extendable, 'action'> {
  id?: string;
}

export interface UserListProps
  extends ListProps<UserItemProps>,
  Pick<ExtendedDisplayProps, 'smallFont'> {
}

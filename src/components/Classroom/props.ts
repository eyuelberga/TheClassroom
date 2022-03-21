import {
  Loadable,
  Linkable,
  ManagementActions,
  BasicDisplayInfo,
  ExtendedDisplayProps,
  ListProps,
} from '../interfaces';

export interface ClassroomDisplayProps
  extends ManagementActions,
    BasicDisplayInfo,
    Linkable,
    Loadable,
    ExtendedDisplayProps {
}
export interface ClassroomListProps
  extends ListProps<ClassroomDisplayProps>,
    ExtendedDisplayProps {
}

export interface Classroom {
  title: string;
  description?: string;
}

export interface CreateClassroomProps extends Loadable {
  title?: string;
  description?: string;
  onSave?: (newValue: Classroom) => void;
}
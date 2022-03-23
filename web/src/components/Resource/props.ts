import {
  ListProps,
  ManagementActions,
  BasicDisplayInfo,
  Linkable,
  Loadable,
  ExtendedDisplayProps,
} from '../interfaces';
import { ReactNode } from 'react';
export interface ResourceDisplayProps
  extends ManagementActions,
  BasicDisplayInfo,
  Linkable,
  Loadable,
  ExtendedDisplayProps {
  content?: string;
  label?: string;
  footer?:ReactNode;
}

export interface Resource {
  title: string;
  description?: string;
  content: string;
}

export interface ScheduledResource extends Resource {
  timestamp: string;
}
export interface ResourceEditorProps extends Loadable {
  title?: string;
  description?: string;
  content?: string;
  action?: ReactNode;
  onSave?: (newValue: Resource) => void;
  onSubmit?: (newValue: Resource) => void;
  onPublish?: (newValue: Resource) => void;
  onSchedule?: (newValue: ScheduledResource) => void;
}

export interface ResourceDisplaySkeletonProps {
  isDetailed?: boolean;
}
export interface ResourceListProps
  extends ListProps<ResourceDisplayProps>,
  ExtendedDisplayProps { }

export interface CreateScheduleProps extends Loadable {
  date?: string;
  time?: string;
  onSave: (timestamp: string) => void;
}
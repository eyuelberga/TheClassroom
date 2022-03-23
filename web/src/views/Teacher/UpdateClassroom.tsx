import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery, useMutation } from '@apollo/client';
import CreateClassroom from '../../components/Classroom/CreateClassroom';
import ClassroomDisplaySkeleton from '../../components/Classroom/ClassroomDisplaySkeleton';
import EmptyPlaceholder from '../../components/App/EmptyPlaceholder';
import SubNavigation from '../../components/App/SubNavigation';
import { Classroom } from '../../interfaces';
import { alert, toastifyError, toastifySuccess } from '../../utils';
import AsyncRender from '../../components/App/AsyncRender';

const GET_CLASSROOM = loader('../../queries/classrooms/detail-for-update.gql');
const UPDATE_CLASSROOM = loader('../../queries/classrooms/update.gql');

export interface UpdateProps {
  id?: string;
}
const Update: React.FC<UpdateProps> = ({ id }) => {

  const [classroom, setClassroom] = useState<Classroom | undefined>();
  const { error, loading } = useQuery(GET_CLASSROOM, {
    fetchPolicy: 'network-only',
    variables: {
      id,
    },
    onCompleted: ({ classroom: s }) => {
      setClassroom(s);
    },
  });

  const [update, { loading: saveLoading }] = useMutation(UPDATE_CLASSROOM, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: () => {
      toastifySuccess({
        title: 'Classroom updated',
        description: 'Classroom has been updated sucessfully',
      });
    },
  });

  const save = ({ title, description }: Classroom) => {
    update({
      variables: {
        id,
        title,
        description,
      },
    });
  };

  const displayData = () => {
    if (id && classroom) {
      return (
        <CreateClassroom
          isLoading={saveLoading}
          title={classroom.title}
          description={classroom.description}
          onSave={save}
        />
      );
    }
    return undefined;
  };

  return (
    <>
      <SubNavigation goBack title="Update Classroom" />
      <AsyncRender
        loading={loading}
        skeleton={<ClassroomDisplaySkeleton />}
        data={displayData()}
        alert={alert(error)}
        fallback={
          <EmptyPlaceholder icon="exclamation-circle" title="Nothing Here!" />
        }
      />
    </>
  );
};
export default Update;

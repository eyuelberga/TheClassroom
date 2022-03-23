import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/client';
import CreateClassroom from '../../components/Classroom/CreateClassroom';
import SubNavigation from '../../components/App/SubNavigation';
import { Classroom } from '../../interfaces';
import { toastifySuccess, toastifyError } from '../../utils';

const CREATE_CLASSROOM = loader('../../queries/classrooms/create.gql');

const Create: React.FC<Record<string, never>> = () => {
  const navigate = useNavigate();
  const [create, { loading: saveLoading }] = useMutation(CREATE_CLASSROOM, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: () => {
      toastifySuccess({
        title: 'Classroom Created!',
        description: 'Your new Classroom has been created.',
      });
      navigate(-1);
    },
  });
  const save = () => {
    return ({ title, description }: Classroom) => {
      create({
        variables: {
          title,
          description,
        },
      });
    };
  };
  return (
    <>
      <SubNavigation goBack title="Create a Classroom" />
      <CreateClassroom isLoading={saveLoading} onSave={save()} />
    </>
  );
};
export default Create;

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { loader } from "graphql.macro";
import ResourceEditor from "../../components/Resource/ResourceEditor";
import ResourceDisplaySkeleton from "../../components/Resource/ResourceDisplaySkeleton";
import EmptyPlaceholder from "../../components/App/EmptyPlaceholder";
import SubNavigation from "../../components/App/SubNavigation";
import { Resource } from "../../interfaces";
import { alert, toastifyError, toastifySuccess } from "../../utils";
import AsyncRender from "../../components/App/AsyncRender";

const GET_ASSIGNMENT = loader("../../queries/resources/get-assignment-with-submission.gql");
const SUBMIT_ASSIGNMENT = loader("../../queries/resources/submit-assignment.gql");
export interface SubmitProps {
  assignmentId?: string;
}
const Submit: React.FC<SubmitProps> = ({ assignmentId }) => {
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<Resource | undefined>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { error, loading } = useQuery(GET_ASSIGNMENT, {
    fetchPolicy: "network-only",
    variables: {
      assignmentId,
    },
    onCompleted: ({ assignment: {title,submissions} }) => {
      let content = "";
      if(submissions && submissions.length){
        content = submissions[0].content;
        setIsSubmitted(true);
      }
      setAssignment({title, content});
    },
  });
  const [submit, { loading: updateLoading }] = useMutation(SUBMIT_ASSIGNMENT, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: () => {
      toastifySuccess({
        title: "Submited!",
        description: "your assignment has been submitted",
      });
      navigate(-1);
    },
  });
  const save = () => {
    if (!isSubmitted) {
      return ({ title, content }: Resource) => {
        submit({
          variables: {
            assignmentId,
            content,
          },
        });
      };
    }
    return undefined;
  };

  const displayData = () => {
    if (assignmentId && assignment) {
      return (
        <ResourceEditor
          action={
            <SubNavigation
              goBack
              title="Submit Assignment"
            />
          }
          isLoading={updateLoading}
          content={assignment.content}
          title={assignment.title}
          onSubmit={save()}
        />
      );
    }
    return undefined;
  };
  return (
    <>
      <AsyncRender
        loading={loading}
        skeleton={<ResourceDisplaySkeleton isDetailed />}
        data={displayData()}
        alert={alert(error)}
        fallback={
          <EmptyPlaceholder icon="exclamation-circle" title="Nothing Here!" />
        }
      />
    </>
  );
};
export default Submit;

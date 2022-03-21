import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import ResourceDisplay from "../../components/Resource/ResourceDisplay";
import ResourceDisplaySkeleton from "../../components/Resource/ResourceDisplaySkeleton";
import EmptyPlaceholder from "../../components/App/EmptyPlaceholder";
import SubNavigation from "../../components/App/SubNavigation";
import { alert } from "../../utils";
import AsyncRender from "../../components/App/AsyncRender";

const GET_SUBMISSION = loader("../../queries/resources/submission-detail.gql");

export interface DetailProps {
  assignmentId?: string;
  studentId?: string;
}

const Detail: React.FC<DetailProps> = ({ studentId, assignmentId }) => {
  const [submission, setSubmission] = useState<any>(null);

  const { error, loading } = useQuery(GET_SUBMISSION, {
    variables: {
      studentId,
      assignmentId,
    },
    onCompleted: ({
      submission: {
        content,
        assignment: { id, title },
        updatedAt
      },
    }) => {
      setSubmission({ id, content, title, updatedAt });
      window.scrollTo({ top: 0 });
    },
  });

  const DataDisplay = () => {
    return (
      <>
        <ResourceDisplay
          id={submission.id}
          title={submission.title}
          updatedAt={submission.updatedAt}
          content={submission.content}
        />
      </>
    );
  };
  const displayData = () => {
    if (submission) {
      return DataDisplay();
    }
    return undefined;
  };
  return (
    <>
      <SubNavigation goBack title={submission?.title} />
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
export default Detail;
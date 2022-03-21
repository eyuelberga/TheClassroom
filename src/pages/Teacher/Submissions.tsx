import React from "react";
import { useParams } from "react-router-dom";
import Submissions from "../../views/Teacher/Submissions";
import SubNavigation from "../../components/App/SubNavigation";
import { useQuery } from "../../hooks";
const Page: React.FC<Record<string, any>> = () => {
  const query = useQuery();
  const { assignmentId } = useParams<{ assignmentId: string }>();
  return (
    <>
      <SubNavigation goBack title="Submissions" />
      <Submissions
        assignmentName={query.get("title") || ""}
        assignmentId={assignmentId}
        previewLink="/app/teach/submission"
      />
    </>
  );
};
export default Page;

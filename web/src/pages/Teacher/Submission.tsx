import React from "react";
import { useParams } from "react-router-dom";
import PreviewSubmission from "../../views/Teacher/PreviewSubmission";
import { useQuery } from "../../hooks";
const Page: React.FC<Record<string, any>> = () => {
  const query = useQuery();
  const { studentId } = useParams<{ studentId: string }>();
  return (
    <PreviewSubmission
      studentId={studentId}
      assignmentId={query.get("assignmentId") || ""}
    />
  );
};
export default Page;

import React from "react";
import { useParams } from "react-router-dom";
import Submit from "../../views/Student/SubmitAssignment"
const Page: React.FC<Record<string, any>> = () => {
    const { assignmentId } = useParams<{ assignmentId: string }>();
    return <Submit assignmentId={assignmentId}  />
}
export default Page;
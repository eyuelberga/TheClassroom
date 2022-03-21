import React from "react";
import { useParams } from "react-router-dom";
import PreviewResource from "../../views/Student/PreviewResource"
const Page: React.FC<Record<string, any>> = () => {
    const { assignmentId } = useParams<{ assignmentId: string }>();
    return <PreviewResource id={assignmentId} />
}
export default Page;
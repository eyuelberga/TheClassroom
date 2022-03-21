import React from "react";
import { useParams } from "react-router-dom";
import PreviewResource from "../../views/Teacher/PreviewResource"
const Page: React.FC<Record<string, any>> = () => {
    const { assignmentId } = useParams<{ assignmentId: string }>();
    return <PreviewResource id={assignmentId} editLink="/app/teach/update-assignment" submissionsLink="/app/teach/submissions" />
}
export default Page;
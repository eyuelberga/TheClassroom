import React from "react";
import { useParams } from "react-router-dom";
import UpdateResource from "../../views/Teacher/UpdateResource"
const Page: React.FC<Record<string, any>> = () => {
    const { assignmentId } = useParams<{ assignmentId: string }>();
    return <UpdateResource id={assignmentId} />
}
export default Page;
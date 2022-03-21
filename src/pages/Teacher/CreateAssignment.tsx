import React from "react";
import { useParams } from "react-router-dom";
import CreateResource from "../../views/Teacher/CreateResource"
const Page: React.FC<Record<string, any>> = () => {
    const { classroomId } = useParams<{ classroomId: string }>();
    return <CreateResource classroomId={classroomId} type="ASSIGNMENT" />
}
export default Page;
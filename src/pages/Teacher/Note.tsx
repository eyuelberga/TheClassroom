import React from "react";
import { useParams } from "react-router-dom";
import PreviewResource from "../../views/Teacher/PreviewResource"
const Page: React.FC<Record<string, any>> = () => {
    const { noteId } = useParams<{ noteId: string }>();
    return <PreviewResource id={noteId} editLink="/app/teach/update-note" />
}
export default Page;
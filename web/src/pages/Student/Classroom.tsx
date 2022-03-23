import React from "react";
import { useParams } from "react-router-dom";
import Resources from "../../views/Student/Resources";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import SubNavigation from "../../components/App/SubNavigation";
import NavMenu from "../../components/App/NavMenu";
import { useQuery } from "../../hooks";
const Page: React.FC<Record<string, any>> = () => {
  const query = useQuery();
  const { classroomId } = useParams<{ classroomId: string }>();
  return (
    <>
      <SubNavigation
        title={query.get("title") || "__"}
        action={
          <NavMenu
            actions={[
              {
                to: "/app/student",
                name: "Classrooms",
                icon: "chalkboard",
              },
            ]}
          />
        }
      />
      <Tabs isLazy>
        <TabList>
          <Tab>Notes</Tab>
          <Tab>Assignments</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Resources
              classroomId={classroomId}
              previewLink="/app/student/note"
              type="NOTE"
            />
          </TabPanel>
          <TabPanel>
            <Resources
              classroomId={classroomId}
              previewLink="/app/student/assignment"
              type="ASSIGNMENT"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
export default Page;

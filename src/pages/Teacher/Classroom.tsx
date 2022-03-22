import React from "react";
import { useParams } from "react-router-dom";
import Resources from "../../views/Teacher/Resources";
import Enrollments from "../../views/Teacher/Enrollments";
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import SubNavigation from "../../components/App/SubNavigation";
import NavMenu from "../../components/App/NavMenu";
import { useQuery } from "../../hooks";

const T: React.FC<{ published?: boolean; classroomId?: string }> = ({
  published,
  classroomId,
}) => {
  return (
    <Tabs isLazy>
      <TabList>
        <Tab>Notes</Tab>
        <Tab>Assignments</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Resources
            classroomId={classroomId}
            previewLink="/app/teach/note"
            editLink="/app/teach/update-note"
            type="NOTE"
            published={published}
          />
        </TabPanel>
        <TabPanel>
          <Resources
            classroomId={classroomId}
            previewLink="/app/teach/assignment"
            editLink="/app/teach/update-assignment"
            type="ASSIGNMENT"
            published={published}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
const Page: React.FC<Record<string, any>> = () => {
  const query = useQuery();
  const { classroomId } = useParams<{ classroomId: string }>();
  return (
    <>
      <SubNavigation
        title={query.get("title") || "__"}
        description={
          <Text
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            {`CLASS CODE: ${classroomId}`}
          </Text>
        }
        action={
          <NavMenu
            actions={[
              {
                to: `/app/teach/create-note/${classroomId}`,
                name: "Add Note",
                icon: "plus",
              },
              {
                to: `/app/teach/create-assignment/${classroomId}`,
                name: "Add Assignment",
                icon: "plus",
              },
              {
                to: "/app/teach",
                name: "Classrooms",
                icon: "chalkboard",
              },
            ]}
          />
        }
      />
      <Tabs isLazy variant="enclosed-colored">
        <TabList>
          <Tab>Drafts</Tab>
          <Tab>Published</Tab>
          <Tab>Enrollments</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <T classroomId={classroomId} />
          </TabPanel>
          <TabPanel>
            <T classroomId={classroomId} published />
          </TabPanel>
          <TabPanel>
            <Enrollments
              classroomId={classroomId}
              previewLink="/app/teach/student"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
export default Page;

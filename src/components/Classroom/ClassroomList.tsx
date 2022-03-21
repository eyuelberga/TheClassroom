import React from "react";
import { SimpleGrid, Stack } from "@chakra-ui/react";
import ClassroomDisplay from "./ClassroomDisplay";
import EmptyPlaceholder from "../App/EmptyPlaceholder";
import ClassroomDisplaySkeleton from "./ClassroomDisplaySkeleton";
import { ClassroomListProps } from "./props";
import AsyncRender from "../App/AsyncRender";
import { alert } from "../../utils";

const ClassroomList: React.FC<ClassroomListProps> = ({
  loading,
  data,
  error,
  header: Header,
  footer: Footer,
  onEdit,
  onPreview,
  onRemove,
  hideDetails,
  smallFont,
  columns,
  link,
}) => {
  const Classrooms = () => {
    const onPreviewInternal = (id: string) => {
      if (onPreview) {
        return () => {
          onPreview(id);
        };
      }
      return undefined;
    };
    const onEditInternal = (id: string) => {
      if (onEdit) {
        return () => {
          onEdit(id);
        };
      }
      return undefined;
    };
    const onRemoveInternal = (id: string) => {
      if (onRemove) {
        return () => {
          onRemove(id);
        };
      }
      return undefined;
    };

    return (
      <>
        {Header}
        <SimpleGrid
          spacing={4}
          columns={columns || { base: 1, sm: 2, md: 3 }}
          m={4}
        >
          {data?.map(({ id, title, updatedAt, description }) => (
            <ClassroomDisplay
              link={link ? `${link}/${id}?title=${title}` : undefined}
              smallFont={smallFont}
              id={id}
              key={id}
              title={title}
              updatedAt={updatedAt}
              description={!hideDetails ? description : undefined}
              onEdit={onEditInternal(id)}
              onPreview={onPreviewInternal(`${id}?title=${title}`)}
              onRemove={onRemoveInternal(id)}
            />
          ))}
        </SimpleGrid>
        {Footer}
      </>
    );
  };
  const displayClassrooms = () => {
    if (data?.length) {
      return Classrooms();
    }
    return undefined;
  };
  return (
    <Stack id="ClassroomList">
      <AsyncRender
        loading={loading}
        skeleton={
          <SimpleGrid
            spacing={4}
            columns={columns || { base: 1, sm: 2, md: 2 }}
            m={4}
          >
            {[1, 2].map((x) => (
              <ClassroomDisplaySkeleton key={x} />
            ))}
          </SimpleGrid>
        }
        data={displayClassrooms()}
        alert={alert(error)}
        fallback={<EmptyPlaceholder icon="chalkboard" title="No Classrooms " />}
      />
    </Stack>
  );
};

export default ClassroomList;

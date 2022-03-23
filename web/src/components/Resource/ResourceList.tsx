import React from "react";
import { Stack } from "@chakra-ui/react";
import ResourceDisplay from "./ResourceDisplay";
import EmptyPlaceholder from "../App/EmptyPlaceholder";
import ResourceDisplaySkeleton from "./ResourceDisplaySkeleton";
import { alert } from "../../utils";
import { ResourceListProps } from "./props";
import AsyncRender from "../App/AsyncRender";

const ResourceList: React.FC<ResourceListProps> = ({
  loading,
  data,
  error,
  header: Header,
  footer: Footer,
  onRemove,
  onEdit,
  onPreview,
  link,
  hideDetails,
  smallFont,
}) => {
  const Resources = () => {
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
        {data?.map(({ id, title, updatedAt, description, label }) => (
          <ResourceDisplay
            link={link ? `${link}/${id}` : undefined}
            smallFont={smallFont}
            id={id}
            key={id}
            title={title}
            label={label}
            updatedAt={updatedAt}
            description={!hideDetails ? description : undefined}
            onEdit={onEditInternal(id)}
            onPreview={onPreviewInternal(id)}
            onRemove={onRemoveInternal(id)}
          />
        ))}
        {Footer}
      </>
    );
  };
  const displayResources = () => {
    if (data?.length) {
      return Resources();
    }
    return undefined;
  };
  return (
    <Stack spacing={4} id="ResourceList">
      <AsyncRender
        loading={loading}
        skeleton={[1, 2, 3, 4].map((x) => (
          <ResourceDisplaySkeleton key={x} />
        ))}
        data={displayResources()}
        alert={alert(error)}
        fallback={
          <EmptyPlaceholder icon="file" title="Nothing Here!" />
        }
      />
    </Stack>
  );
};

export default ResourceList;

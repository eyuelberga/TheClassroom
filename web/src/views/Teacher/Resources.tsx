import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { loader } from "graphql.macro";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import ResourceList from "../../components/Resource/ResourceList";
import StatsCard from "../../components/App/StatsCard";
import { FETCH_LIMIT as limit } from "../../config/constants";
import { toastifyError } from "../../utils";

const GET_DRAFT_RESOURCES_BY_CLASSROOM = loader(
  "../../queries/resources/drafts.gql"
);
const GET_PUBLISHED_RESOURCES_BY_CLASSROOM = loader(
  "../../queries/resources/published.gql"
);
const REMOVE_RESOURCE = loader("../../queries/resources/remove.gql");

export interface ManageResourcesProps {
  published?: boolean;
  previewLink: string;
  editLink: string;
  classroomId?: string;
  type: String;
}

const Manage: React.FC<ManageResourcesProps> = ({
  classroomId,
  published,
  previewLink,
  editLink,
  type,
}) => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<any[]>([]);
  const [totalLeft, setTotalLeft] = useState(0);
  const [total, setTotal] = useState(0);
  const query = published
    ? GET_PUBLISHED_RESOURCES_BY_CLASSROOM
    : GET_DRAFT_RESOURCES_BY_CLASSROOM;
  const { error, loading } = useQuery(query, {
    fetchPolicy: "network-only",
    variables: {
      classroomId,
      type,
      limit,
    },
    onCompleted: ({ resources: ns, total: t }) => {
      const fetchedResources = ns as any[];
      setResources(
        fetchedResources.map((r: Record<string, any>) => {
          if (r.schedule)
            return {
              ...r,
              label: `Scheduled for: ${new Date(
                r.schedule
              ).toDateString()}  ${new Date(r.schedule).toLocaleTimeString()}`,
            };
          return r;
        })
      );
      setTotal(t.aggregate.count);
      setTotalLeft(t.aggregate.count - fetchedResources.length);
    },
  });

  const [more, { loading: moreLoading }] = useLazyQuery(query, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ resources: moreNs }) => {
      const moreResources = moreNs as any[];
      setTotalLeft(totalLeft - moreResources.length);
      setResources([...resources, ...moreResources]);
    },
  });
  const [remove, { loading: removeLoading }] = useMutation(REMOVE_RESOURCE, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ resource }) => {
      const { id: deletedId } = resource;
      setResources(
        resources.filter(({ id }) => {
          return id !== deletedId;
        })
      );
      setTotal(total - 1);
    },
  });
  const loadMore = () => {
    more({
      variables: {
        classroomId,
        type,
        limit,
        cursor:
          resources[resources.length ? resources.length - 1 : 0].updatedAt,
      },
    });
  };
  const onRemove = (id: string) => {
    if (window.confirm("Are you sure? this action is permanent")) {
      remove({ variables: { id } });
    }
  };
  const t = type === "NOTE" ? "Notes" : "Assignments";
  return (
    <>
      <StatsCard
        title={published ? `Total Published ${t}` : `Total Draft ${t}`}
        stat={`${total}`}
        description={
          published
            ? `${t} can be seen by all students`
            : `Not yet published, only you can this ${t}`
        }
        icon={["far", "file"]}
      />

      <ResourceList
        error={error}
        onEdit={(id) => {
          navigate(`${editLink}/${id}`);
        }}
        onPreview={(id) => {
          navigate(`${previewLink}/${id}`);
        }}
        onRemove={onRemove}
        loading={loading || removeLoading}
        data={resources}
        footer={
          <Button
            isDisabled={totalLeft <= 0}
            colorScheme="gray"
            variant="link"
            onClick={loadMore}
            isLoading={moreLoading}
          >
            Load more..
          </Button>
        }
      />
    </>
  );
};

export default Manage;

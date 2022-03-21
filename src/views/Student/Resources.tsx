import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { loader } from "graphql.macro";
import { useQuery, useLazyQuery } from "@apollo/client";
import ResourceList from "../../components/Resource/ResourceList";
import { FETCH_LIMIT as limit } from "../../config/constants";
import { toastifyError } from "../../utils";

const GET_RESOURCES_BY_CLASSROOM = loader(
  "../../queries/resources/published.gql"
);

export interface ManageResourcesProps {
  previewLink: string;
  classroomId?: string;
  type: string;
}

const Manage: React.FC<ManageResourcesProps> = ({
  classroomId,
  previewLink,
  type,
}) => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<any[]>([]);
  const [totalLeft, setTotalLeft] = useState(0);
  const [total, setTotal] = useState(0);
  const query = GET_RESOURCES_BY_CLASSROOM;
  const { error, loading } = useQuery(query, {
    fetchPolicy: "network-only",
    variables: {
      type,
      classroomId,
      limit,
    },
    onCompleted: ({ resources: ns, total: t }) => {
      const fetchedResources = ns as any[];
      setResources(fetchedResources);
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
  const loadMore = () => {
    more({
      variables: {
        type,
        classroomId,
        limit,
        cursor:
          resources[resources.length ? resources.length - 1 : 0].updatedAt,
      },
    });
  };

  return (
    <>
      <ResourceList
        error={error}
        link={previewLink}
        loading={loading}
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

import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { loader } from "graphql.macro";
import { useQuery, useLazyQuery } from "@apollo/client";
import UserList from "../../components/User/UserList";
import StatsCard from "../../components/App/StatsCard";
import { FETCH_LIMIT as limit } from "../../config/constants";
import { toastifyError } from "../../utils";

const GET_SUBMISSIONS = loader(
  "../../queries/resources/submissions.gql"
);

export interface ManageUsersProps {
  previewLink: string;
  assignmentId?: string;
}

const Manage: React.FC<ManageUsersProps> = ({ assignmentId, previewLink }) => {
  const [submissions, setUsers] = useState<any[]>([]);
  const [totalLeft, setTotalLeft] = useState(0);
  const [total, setTotal] = useState(0);
  const query = GET_SUBMISSIONS;
  const { error, loading } = useQuery(query, {
    fetchPolicy: "network-only",
    variables: {
      assignmentId,
      limit,
    },
    onCompleted: ({ submissions: ns, total: t }) => {
      const fetchedUsers = ns as any[];
      setUsers(
        fetchedUsers.map(
          ({ student: { fullname, username, profilePicture }, updatedAt }) => {
            return { fullname, username, profilePicture, updatedAt };
          }
        )
      );
      setTotal(t.aggregate.count);
      setTotalLeft(t.aggregate.count - fetchedUsers.length);
    },
  });

  const [more, { loading: moreLoading }] = useLazyQuery(query, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ submissions: moreNs }) => {
      const moreUsers = moreNs as any[];
      setTotalLeft(totalLeft - moreUsers.length);
      setUsers([...submissions, ...moreUsers]);
    },
  });
  const loadMore = () => {
    more({
      variables: {
        assignmentId,
        limit,
        cursor:
          submissions[submissions.length ? submissions.length - 1 : 0].updatedAt,
      },
    });
  };
  return (
    <>
      <StatsCard
        title="Submissions"
        stat={`${total}`}
        description="students currently enrolled in the class"
        icon={["far", "file"]}
      />

      <UserList
        link={previewLink}
        error={error}
        loading={loading}
        data={submissions}
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

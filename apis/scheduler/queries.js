const {gql} = require("graphql-request");

const addSchedule = gql`mutation ADD_SCHEDULE($resourceId: uuid!, $schedule: timestamptz!, $scheduleId: String!) {
  update_resources_by_pk(pk_columns: {id: $resourceId}, _set: {schedule: $schedule, schedule_id: $scheduleId}) {
    schedule_id
    schedule
  }
}

`;

const removeSchedule = gql`mutation REMOVE_SCHEDULE($resourceId: uuid!) {
  update_resources_by_pk(pk_columns: {id: $resourceId}, _set: {schedule: null, schedule_id: null}) {
    schedule_id
    schedule
  }
}

`;

const publish = gql`mutation PUBLISH($resourceId: uuid!) {
  update_resources_by_pk(pk_columns: {id: $resourceId}, _set: {published: true}) {
    schedule_id
    schedule
  }
}`;

module.exports = {addSchedule, publish, removeSchedule}


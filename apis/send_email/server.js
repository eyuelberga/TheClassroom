const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fetch = require("node-fetch");
const { gql, GraphQLClient } = require("graphql-request");
const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_KEY1,
  process.env.MAILJET_KEY2
);

const graphQLClient = new GraphQLClient(process.env.HASURA_HTTPS_URL, {
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
  },
  fetch,
});
const query = gql`
  query MyQuery($id:uuid!) {
  users(where: {enrollments: {classroom: {resources: {id: {_eq: $id}}}}}) {
    email
  }
}
`;

const sendEmail = async (to, Subject, message) => {
  const request = await mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "eyuel.berga@gmail.com",
          Name: "The Classroom",
        },
        To: [
          {
            Email: to,
          },
        ],
        Subject,
        TextPart: message,
      },
    ],
  });
};
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  try {
    // webhook payload
    const {
      event: { op, data },
      table: { schema, name },
    } = req.body;
    const TABLE_NAME = "resources";
    const published = data.new ? data.new.published : data.old.published;

    // make sure the table name is correct and note is published
    if (name === TABLE_NAME && published) {
      if (op === "INSERT" || op === "UPDATE") {
        const objectID = data.new.id;
        const variables = { id: objectID };
        const response = await graphQLClient.request(query, variables);
        if (response && response.users) {
          const emails = response.users.map(({ email }) => {
            return email;
          });
          emails.forEach(async (email) => {
            await sendEmail(
              email,
              "New Updates on The Classroom",
              `Your teacher has published a ${data.new.type} for you, Check it out at The Classroom.`
            );
          });
          res.status(200).send({ message: "success" });
          return;
        }
        const emails = response.users.map(({ email }) => {
          return email;
        });
        res.status(400).send({ message: "no emails" });
      }
    } else {
      // ignore if the trigger name is not matched
      res.status(400).send({ message: "ignored event" });
      return;
    }
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).send({ error });
    return;
  }
});

app.listen(app.get("port"), function () {
  console.log("Server started on: " + app.get("port"));
});

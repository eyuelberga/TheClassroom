const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const graphQLClient = require("./graphql-client");
const { publish, addSchedule, removeSchedule } = require("./queries");
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let sessionMap = {};
app.post("/schedule", async (req, res) => {
  try {
    const {
      input: { resourceId, schedule },
    } = req.body;
    const r = await fetch(`${process.env.HASURA_HTTPS_URL}/metadata`, {
      method: "POST",
      body: JSON.stringify({
        type: "create_scheduled_event",
        args: {
          webhook: process.env.WEBHOOK_URL,
          schedule_at: schedule,
          payload: { resourceId },
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Hasura-Role": "admin",
        "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
      },
    });
    const { event_id: scheduleId } = await r.json();
    const response = await graphQLClient.request(addSchedule, {
      resourceId,
      schedule,
      scheduleId,
    });
    res.status(200).json({ scheduleId, resourceId, schedule });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({ erorr: e });
  }
});

app.post("/cancel_schedule", async (req, res) => {
  try {
    const {
      input: { scheduleId, resourceId },
    } = req.body;
    const r = await fetch(`${process.env.HASURA_HTTPS_URL}/metadata`, {
      method: "POST",
      body: JSON.stringify({
        type: "delete_scheduled_event",
        args: {
          type: "one_off",
          event_id: scheduleId,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Hasura-Role": "admin",
        "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
      },
    });
    const json = await r.json();
    const response = await graphQLClient.request(removeSchedule, {
      resourceId,
    });
    res.status(200).json({ resourceId });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({ erorr: e });
  }
});

app.post("/publish", async (req, res) => {
  try {
    const {
      payload: { resourceId },
    } = req.body;
    const response = await graphQLClient.request(publish, {
      resourceId,
    });
    res.status(200).json({ message: req.body });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({ erorr: e });
  }
});

app.listen(app.get("port"), function () {
  console.log("Server started on: " + app.get("port"));
});

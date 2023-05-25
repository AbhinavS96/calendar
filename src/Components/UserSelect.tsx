import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState, useContext } from "react";
import { userType } from "../Models/user";
import eventsContext from "../Store/events-context";
import { payloadType } from "../Models/payload";

export default function UserSelect() {
  const [users, setUsers] = useState<userType[] | []>([]);
  const [user, setUser] = useState<userType>();
  const { setEvents } = useContext(eventsContext);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:5000/get_users");
      const result = await response.json();
      setUsers(result);
      setUser(users[0]);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:5000/get_events");
      const result = await response.json();

      let mappedResults: payloadType[] = [];
      if (Object.keys(result).length != 0) {
        mappedResults.push(
          result["events"].map((res: payloadType) => {
            return {
              ...res,
              eventType: "event",
              start: new Date(res.start),
              end: new Date(res.end),
            };
          })
        );
        mappedResults.push(
          result["tasks"].map((res: payloadType) => {
            return {
              ...res,
              eventType: "task",
              start: new Date(res.start),
              end: new Date(res.end),
            };
          })
        );
        mappedResults.push(
          result["reminders"].map((res: payloadType) => {
            return {
              ...res,
              eventType: "reminder",
              start: new Date(res.start),
              end: new Date(res.end),
            };
          })
        );
      }
      setEvents(mappedResults);
    })();
  }, [user]);
  const onChangeHandler = (event: SelectChangeEvent) => {
    const user: userType = users.filter(
      (user) => `${user.id}` == (event.target.value as string)[0]
    )[0];
    (async () => {
      const response = await fetch("http://127.0.0.1:5000/set_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });
      if (response.status == 200) {
        setUser(user);
      } else {
        console.log("error");
      }
    })();
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="user-select-label">User</InputLabel>
        <Select
          id="user-select"
          value={user ? `${user.id}` : "1"}
          label="User"
          onChange={onChangeHandler}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={`${user.id}`}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

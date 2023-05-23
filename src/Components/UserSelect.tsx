import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { userType } from "../Models/user";

export default function UserSelect() {
  const [users, setUsers] = useState<userType[] | []>([]);
  const [user, setUser] = useState<userType>();
  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:5000/get_users");
      const result = await response.json();
      setUsers(result);
      setUser(users[0]);
    })();
  }, []);
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
        const result = await response.json();
        console.log(result.message);
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

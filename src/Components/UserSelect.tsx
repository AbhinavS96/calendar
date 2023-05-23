import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";

export default function UserSelect() {
  const [user, setUser] = useState("user1");

  const onChangeHandler = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="user-select-label">User</InputLabel>
        <Select
          id="user-select"
          value={user}
          label="User"
          onChange={onChangeHandler}
        >
          <MenuItem value={"user1"}>User 1</MenuItem>
          <MenuItem value={"user2"}>User 2</MenuItem>
          <MenuItem value={"user3"}>User 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

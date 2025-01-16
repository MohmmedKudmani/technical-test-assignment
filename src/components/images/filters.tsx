import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import Stack from "@mui/material/Stack";
import { CategoryType } from "@/common/schemas/categories.schema";

// Filters props
interface Props {
  categories: CategoryType[];
  category: string;
  search: string;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
}

function Filters({
  categories,
  category,
  search,
  setCategory,
  setSearch,
}: Props) {
  return (
    <Stack mb={4.5} mt={1} direction='row' gap={2}>
      {/* Select category */}
      <FormControl
        sx={{
          width: 200,
        }}
      >
        <InputLabel id='category'>Category</InputLabel>
        <Select
          labelId='category'
          id='demo-simple-select'
          value={category}
          label='Category'
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value='all'>All</MenuItem>
          {categories.map((category) => (
            <MenuItem value={category.id} key={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Input search for name */}
      <TextField
        id='name'
        label='Name'
        placeholder='Search by name...'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </Stack>
  );
}

export default Filters;


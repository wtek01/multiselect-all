import { useState } from "react";
import { TextField, Autocomplete, Checkbox } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";

export default function MultiSelect({
  items,
  label,
  selectAllLabel,
  onChange
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const allSelected = items.length === selectedOptions.length;

  const handleToggleOption = (selectedOps) => setSelectedOptions(selectedOps);
  const handleClearOptions = () => setSelectedOptions([]);

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedOptions(items);
    } else {
      handleClearOptions();
    }
  };

  const handleToggleSelectAll = () => {
    handleSelectAll && handleSelectAll(!allSelected);
  };

  const handleChange = (event, selectedOps, reason) => {
    if (reason === "selectOption" || reason === "removeOption") {
      if (selectedOps.find((option) => option.name === "Sélectionner Tous")) {
        handleToggleSelectAll();
        const result = items.filter((el) => el.name !== "Sélectionner Tous");
        return onChange(result);
      } else {
        handleToggleOption && handleToggleOption(selectedOps);
        return onChange(selectedOps);
      }
    } else if (reason === "clear") {
      handleClearOptions && handleClearOptions();
    }
  };

  const filter = createFilterOptions();

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={items}
      value={selectedOptions}
      getOptionLabel={(option) => option.name}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return [{ id: 0, name: selectAllLabel }, ...filtered];
      }}
      renderOption={(props, option, { selected }) => {
        // To control the state of 'select-all' checkbox
        const selectAllProps =
          option.name === "Sélectionner Tous" ? { checked: allSelected } : {};
        return (
          <li {...props}>
            <Checkbox checked={selected} {...selectAllProps} />
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={label} />
      )}
      onChange={handleChange}
    />
  );
}

MultiSelect.defaultProps = {
  items: [],
  selectedValues: []
};

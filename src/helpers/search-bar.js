export const filterResults = (results, filterBy, values) =>
  results.filter((item) =>
    values
      .split(" ")
      .filter((val) => val !== "")
      .every((value) =>
        filterBy.some((filter) => item[filter].toLowerCase().startsWith(value))
      )
  );

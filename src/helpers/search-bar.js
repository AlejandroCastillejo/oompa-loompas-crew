export const filterResults = (results, filterBy, values) => {
  console.log("values:", values);
  return results.filter((item) =>
    values
      .split(" ")
      .filter((val) => val !== "")
      .every((value) =>
        filterBy.some((filter) => item[filter].toLowerCase().includes(value))
      )
  );
};

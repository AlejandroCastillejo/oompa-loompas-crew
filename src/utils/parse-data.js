export const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;

export const getGenderByLetter = (letter) =>
  letter === "F" ? "Woman" : letter === "M" ? "Man" : "Other";

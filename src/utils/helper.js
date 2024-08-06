export function toTitleCase(str) {
  if (str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  } else {
    return "";
  }
}

export function convertCustomerData(input) {
  // Extract the key and value from the input object
  const [key, value] = Object.entries(input)[0];

  // Return the transformed array
  return [
    {
      CustParam1Name: key,
      CustParam1Value: value,
    },
  ];
}

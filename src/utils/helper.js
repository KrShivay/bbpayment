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
  const output = [];
  let index = 1;

  for (const [key, value] of Object.entries(input)) {
    output.push({
      [`CustParam${index}Name`]: key,
      [`CustParam${index}Value`]: value,
    });
    index++;
  }

  return output;
}

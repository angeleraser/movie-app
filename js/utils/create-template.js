export function createHtmlTemplate(strings, ...propsNames) {
  return function (props) {
    const slices = [...strings];
    propsNames.forEach((key, index) => {
      slices[index] += props[key];
    });
    return slices.join("");
  };
}

export const FlConverter = (value = "") => {
  const convert = value?.charAt(0).toUpperCase() + value.slice(1);
  return convert;
};

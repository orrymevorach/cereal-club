export function replaceCamelCaseWithSpaces(string) {
  const regex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
  return string.replace(regex, '$1$4 $2$3$5');
}

export function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function camelToFlat(camel) {
  const camelCase = camel.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');

  let flat = '';

  camelCase.forEach(word => {
    flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + ' ';
  });
  return flat.trim();
}

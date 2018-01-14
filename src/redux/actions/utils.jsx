export const validCountryCode = (code) => {
  if (!code || typeof code !== "string") {
    return false;
  }

  var pattern = /^[A-Z]{3}$/;

  if (!code.toUpperCase().match(pattern)) {
    return false;
  }
  return true;
}
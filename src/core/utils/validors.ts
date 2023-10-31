export function isValidEmail(raw: string) {
  return raw.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
}

export function isValidCEP(raw: string) {
  return raw.match(/^\d{5}-\d{3}$/);
}
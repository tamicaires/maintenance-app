export const phoneMask = (val: string) => {
  let value = val.replace(/\D/g, "");

  if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d)/, "($1) $2");
  }

  if (value.length > 6) {
    value = value.replace(/^(\(\d{2}\) \d)(\d{4})/, "$1 $2");
  }

  if (value.length > 10) {
    value = value.replace(/^(\(\d{2}\) \d \d{4})(\d{4})/, "$1-$2");
  }

  return value;
};

export const cnpjMask = (val: string) => {
  let value = val.replace(/\D/g, "");

  if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  }

  if (value.length > 6) {
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  }

  if (value.length > 9) {
    value = value.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4");
  }

  if (value.length > 13) {
    value = value.replace(
      /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  return value;
};

export const cpfMask = (val: string) => {
  let value = val.replace(/\D/g, "");

  if (value.length > 3) {
    value = value.replace(/^(\d{3})(\d)/, "$1.$2");
  }

  if (value.length > 7) {
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  }

  if (value.length > 11) {
    value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  }

  return value;
};

export const cepMask = (val: string) => {
  let value = val.replace(/\D/g, "");

  if (value.length > 5) {
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
  }

  return value;
};

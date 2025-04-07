export function mapToOptions<T>(
  data: T[] = [],
  options: {
    valueKey: keyof T;
    labelKey: keyof T;
    descriptionKey?: keyof T;
  }
) {
  const { valueKey, labelKey, descriptionKey } = options;

  return data.map((item) => {
    const base = {
      value: item[valueKey],
      label: item[labelKey],
    };

    if (descriptionKey) {
      return {
        ...base,
        description: item[descriptionKey],
      };
    }

    return base;
  });
}

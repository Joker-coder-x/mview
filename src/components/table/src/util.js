function filterCsvData(columns, data, isHeader = true) {
  const headers = {},
    headerLine = {};

  columns.forEach(col => {
    headers[col.prop] = true;
    headerLine[col.prop] = col.label;
  });

  const $data = data.map(row => {
    const line = {};

    Object.keys(row).forEach(key => {
      if (headers[key]) {
        line[key] = row[key];
      }
    });

    return line;
  });

  if (isHeader) {
    $data.unshift(headerLine);
  }

  return $data;
}

export { filterCsvData };

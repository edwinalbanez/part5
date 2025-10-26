const formattedList = (list) => {
  if (list.length === 0) {
    return "";
  }

  if (list.length === 1) {
    return list[0];
  }

  if (list.length === 2) {
    return list.join(' and ');
  }

  if (list.length) {
    const start = list.slice(0, -1);
    const end = list.slice(-1);
    return `${start.join(", ")} and ${end[0]}`;
  }
}

export default formattedList;
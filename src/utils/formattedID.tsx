export function formattedID(id: number) {
  let formattedId = '';

  if (id < 10) {
    formattedId = `#00${id}`
  } else if (id >= 10 && id < 100) {
    formattedId = `#0${id}`
  } else {
    formattedId = `#${id}`
  }

  return formattedId;
}
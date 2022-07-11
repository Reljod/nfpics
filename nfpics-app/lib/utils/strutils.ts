const convTextToIdForm = (str: string): string => {
  return str.replace(/\s+/g, '-').toLowerCase()
}

export { convTextToIdForm }

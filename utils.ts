/**
 * This function prevents the site from crushing if someone does something like
 * something/something?param=4&param=9, as it would be of type array instead of a string
 */
export const readFirstInQuery = (param: string | string[] | undefined) => {
  return Array.isArray(param) ? param[0] : param;
};

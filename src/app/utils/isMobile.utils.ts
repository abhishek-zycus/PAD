const isMobile = (): boolean => {
  const width = window.innerWidth;
  if (width < 756) {
    return true;
  } else return false;
};
export default isMobile;

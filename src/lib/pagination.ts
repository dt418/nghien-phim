export const calculatePageList = (
  currentPage: number,
  PAGE_TO_DISPLAY: number,
  totalPage: number
): number[] => {
  const pageList: number[] = [];

  for (
    let i = currentPage - PAGE_TO_DISPLAY;
    i < currentPage + PAGE_TO_DISPLAY;
    i++
  ) {
    if (i < 1) continue;
    if (i > totalPage) break;
    pageList.push(i);
  }
  return pageList;
};

const isScrolledIntoView = (el: HTMLDivElement) => {
  let rect = el.getBoundingClientRect();
  let elemTop = rect.top;
  let elemBottom = rect.bottom;

  //  Only completely visible elements return true
  // let isVisible = (elemTop = 0) && (elemBottom = window.innerHeight);
  //  Partially visible elements return true
  let isVisible = elemTop < window.innerHeight / 2 && elemBottom >= 0;

  // My own choice cuz above options do not work in this case
  // let isVisible = elemTop === 0;
  return isVisible;
};

export default isScrolledIntoView;

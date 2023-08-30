/* eslint-disable no-console */
const Navigate = (toUri) => {
  console.log("rentreNavigate");
  console.log(toUri);
    const fromUri = window.location.pathname;
    if (fromUri === toUri) return;
  
    window.history.pushState({}, '', toUri);
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  };
  
  export default Navigate;
  
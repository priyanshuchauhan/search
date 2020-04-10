import { gitURL, GET, PATCH } from "./constants";
// import apiMock from "./mockAPIData";

/**
 * Factory function to inject fetch dependency for testing
 *
 * @param {String} page for pagination
 * @returns {Promise} API call promise
 */
export const getShipmentReport = async (page = 1, id = null, limit = 20) => {
  let queryString = `page=${page}&_limit=${limit}`
  if (id) {
    queryString = `${queryString}&id=${id}`
  }
  return getShipmentReporttDI(fetch, GET, queryString)
}

export const updateShipmentData = async (data = {}) =>
  getShipmentReporttDI(fetch, PATCH, data);

/**
 * Function to make async call to get shipment details
 *
 * @param {function} fetch Dependency Injection for testing
 * @param {String} page for pagination
 * @returns {Promise} API call promise
 */
export async function getShipmentReporttDI(fetch, method = GET, data = {}) {
  /* Used to to deploy to github pages
    const promise = new Promise((resolve, reject) => {
      resolve(apiMock.shipments);
    });
    return promise;
  */

  let requestURL = gitURL;
  const requestObject = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (method === GET) {
    requestURL = `${requestURL}?${data}`;
  } else {
    requestObject.body = JSON.stringify(data);
  }
  return await fetch(requestURL, requestObject).then(
    async response => await response.json()
  );
}

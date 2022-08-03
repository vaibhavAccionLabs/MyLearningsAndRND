const JSON_HEADER = { 'Content-Type': 'application/json' };
export const POST_DATA = (bodyData, endpoint, method, options = {}) => {
  const config = {
    method: method || 'POST',
    mode: 'cors',
    headers: Object.assign({}, JSON_HEADER),
    ...options,
    body: JSON.stringify(bodyData),
  };
  return fetch(endpoint, config)
    .then((response) => response.json())
    .then((res) => res)
    .catch((err) => err);
};

export const DELETE_RECORD = (endpoint, options = {}) => {
  const config = {
    method: 'DELETE',
    mode: 'cors',
    headers: Object.assign({}, JSON_HEADER),
    ...options,
  };
  return fetch(endpoint, config)
    .then((response) => response.json())
    .then((res) => res)
    .catch((err) => err);
};

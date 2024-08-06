import apiInterceptor from "../interceptor";

export function paymentToken() {
  return apiInterceptor
    .get("paymentToken", {
      headers: {
        Authorization: import.meta.env.VITE_AUTH_VALUE,
      },
    })
    .then((resp) => resp.data);
}

export function billCategories(headers) {
  return apiInterceptor
    .get("billCategories", {
      headers: {
        ...headers,
      },
    })
    .then((resp) => resp.data);
}

export function billerForCategories(payload, headers) {
  return apiInterceptor
    .post("billerForCate", payload, {
      headers: {
        ...headers,
      },
    })
    .then((resp) => resp.data);
}

export function billData(payload, headers) {
  return apiInterceptor
    .post("billData", payload, {
      headers: {
        ...headers,
      },
    })
    .then((resp) => resp.data);
}

import apiInterceptor from "../interceptor";

export function paymentToken(userId) {
  return apiInterceptor
    .get("paymentToken", {
      headers: {
        Authorization: import.meta.env.VITE_AUTH_VALUE,
        agentId: userId || "12345678",
        scope: "bbps",
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

export function submitBill(payload, headers) {
  return apiInterceptor
    .post("submitBill", payload, {
      headers: {
        ...headers,
      },
    })
    .then((resp) => resp.data);
}

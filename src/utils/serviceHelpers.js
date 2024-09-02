import Swal from "sweetalert2";

export const successService = (resp) =>
  resp?.apiResponseCode == 200 && resp?.apiResponseData?.responseCode == 200;

export const errorService = (resp, hide) => {
  if (!hide) {
    Swal.fire({
      title: "Error!",
      icon: "error",
      text: resp?.apiResponseData?.responseMessage || resp?.apiResponseMessage,
    });
  }
};

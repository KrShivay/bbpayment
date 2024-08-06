import Swal from "sweetalert2";

export function getSwalTitle(val) {
  switch (val) {
    case "error":
      return "Error!";
    case "warning":
      return "Warning!";
    case "success":
      return "Success!";
    case "info":
      return "Info!";
    case "confirm":
      return "Confirmation!";
    default:
      return "Error!";
  }
}

export default function showSwal({ icon, message }) {
  return Swal.fire({
    title: getSwalTitle(icon),
    icon: icon,
    text: message || "Something went wrong!",
  });
}

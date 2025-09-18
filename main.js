import "./assets/scss/all.scss";
import * as bootstrap from "bootstrap";

/* popover 跳出式視窗初始化 */
document.addEventListener("DOMContentLoaded", () => {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );
});

console.log("Hello world");

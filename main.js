import "./assets/scss/all.scss";

/* 所有頁面:popover跳出式視窗初始化 */
document.addEventListener("DOMContentLoaded", () => {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );
});

/* contrib投稿頁面:動態表單欄位新增&刪除功能 */
const addBtn = document.getElementById("addExtraBtn");
const container = document.getElementById("extra-container");

// 監聽新增按鈕
addBtn.addEventListener("click", () => {
  const newItem = document.createElement("div");
  newItem.className = "mb-8 d-flex extra-item";
  newItem.innerHTML = `
      <label class="me-6 w-100">
        <div>
          <p class="px-2 d-flex mb-2">
            <span class="contrib-font-size-sm neutral-900">額外成分名稱</span>
            <span class="contrib-font-size-xs neutral-600 ms-auto">選填</span>
          </p>
          <div>
            <input
              type="text"
              class="form-control border-radius contrib-input-heigh"
              placeholder="請輸入額外成分（例：牛磺酸）"
            />
          </div>
        </div>
      </label>
      <div class="w-100 d-flex align-items-end">
        <label class="w-100 me-6">
          <p class="px-2 d-flex mb-2">
            <span class="contrib-font-size-sm neutral-900">額外成分比例</span>
            <span class="contrib-font-size-xs neutral-600 ms-auto">選填</span>
          </p>
          <div class="input-group">
            <input
              type="text"
              class="form-control border-radius contrib-input-heigh"
              placeholder="請輸入額外成分比例"
            />
            <div class="input-group-text neutral-800 bg-neutral-100">%</div>
          </div>
        </label>
        <button
          type="button"
          class="btn contrib-delete-area contrib-delete-btn border-radius"
        >
          <img src="../assets/images/contrib/trash.png" alt="trash" />
        </button>
      </div>
    `;

  // 在新增按鈕前插入
  container.insertBefore(newItem, addBtn.parentElement);

  // 綁定刪除事件
  const delBtn = newItem.querySelector(".contrib-delete-btn");
  delBtn.addEventListener("click", () => {
    newItem.remove();
  });
});

// 綁定初始區塊的刪除事件
document.querySelectorAll(".contrib-delete-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".extra-item").remove();
  });
});

/* contrib投稿頁面:刊登規範審核機制 */
const agreeCheckbox = document.getElementById("agreeCheckbox");
const publicationSpeciModal = document.getElementById("publicationSpeci");
const publicationSpeciForm = document.getElementById("publicationSpeciForm");

// 初始 checkbox 禁用
agreeCheckbox.disabled = true;

// 追蹤是否已經看過 modal
let hasViewedModal = false;

// 點擊表單區塊
publicationSpeciForm.addEventListener("click", (e) => {
  // 如果 checkbox 已經解鎖，允許正常勾選
  if (hasViewedModal) return;

  // 阻止 checkbox 被直接勾選
  e.preventDefault();

  // 使用 Bootstrap JS 打開 modal
  const modal = new bootstrap.Modal(publicationSpeciModal);
  modal.show();
});

// 當 modal 關閉後，允許勾選 checkbox
publicationSpeciModal.addEventListener("hidden.bs.modal", () => {
  agreeCheckbox.disabled = false;
  hasViewedModal = true; // 標記已經看過 modal
});

/* 驗證提示 */
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

console.log("Hello world");

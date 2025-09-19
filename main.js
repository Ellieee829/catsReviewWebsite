import "./assets/scss/all.scss";

/* popover 跳出式視窗初始化 */
document.addEventListener("DOMContentLoaded", () => {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );
});

/* contrib投稿頁面 動態表單欄位新增&刪除功能 */
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
            <span class="contrib-font-size-sm text-highlight ms-1">*</span>
            <span class="contrib-font-size-xs text-highlight ms-auto">必填</span>
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
          class="btn contrib-delete-btn bg-white border-radius"
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

console.log("Hello world");

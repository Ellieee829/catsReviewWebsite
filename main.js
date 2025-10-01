import "./assets/scss/all.scss";
import "quill/dist/quill.snow.css"; //先安裝quill -> bash: npm install quill
import Quill from "quill";

/* 所有頁面:popover跳出式視窗初始化 */
document.addEventListener("DOMContentLoaded", () => {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );
});

/* contrib投稿食品頁面:動態表單欄位新增&刪除功能 */
const addBtn = document.getElementById("addExtraBtn");
const container = document.getElementById("extra-container");

// 監聽新增按鈕
addBtn.addEventListener("click", () => {
  const newItem = document.createElement("div");
  newItem.className = "mb-md-8 mb-sm-3 d-sm-flex extra-item";
  newItem.innerHTML = `
      <label for="extraName" class="me-sm-6 mb-3 mb-sm-0 w-100">
        <div>
          <p class="px-2 d-flex mb-1 mb-md-2">
            <span class="contrib-font-size-sm neutral-900"
              >額外成分名稱</span
            >
            <span class="contrib-font-size-xs neutral-600 ms-auto"
              >選填</span
            >
          </p>
          <div>
            <input
              type="text"
              class="form-control border-radius contrib-input-heigh px-4"
              id="extraName"
              placeholder="請輸入額外成分（例：牛磺酸）"
            />
          </div>
        </div>
      </label>
      <div class="w-100 d-flex align-items-end">
        <label for="extra%" class="w-100 me-6 mb-3 mb-sm-0">
          <p class="px-2 d-flex mb-1 mb-md-2">
            <span class="contrib-font-size-sm neutral-900"
              >額外成分比例</span
            >
            <span class="contrib-font-size-xs neutral-600 ms-auto"
              >選填</span
            >
          </p>
          <div class="input-group">
            <input
              type="text"
              class="form-control border-radius contrib-input-heigh px-4"
              id="extra%"
              placeholder="請輸入額外成分比例"
            />
            <div
              class="input-group-text neutral-800 bg-neutral-100"
            >
              %
            </div>
          </div>
        </label>
        <button
          type="button"
          class="btn contrib-delete-area contrib-delete-btn border-radius mb-3 mb-sm-0"
        >
          <img
            src="../assets/images/contrib/trash.png"
            alt="trash"
          />
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

/* contrib投稿頁面:食品&專欄共用刊登規範審核機制 */
// 共用審核機制
function setupSpeciCheck(formId, checkboxId, modalId) {
  const form = document.getElementById(formId);
  const checkbox = document.getElementById(checkboxId);
  const modalElement = document.getElementById(modalId);

  if (!form || !checkbox || !modalElement) return;

  // 初始 checkbox 禁用
  checkbox.disabled = true;

  // 追蹤是否已經看過 modal
  let hasViewedModal = false;

  // 點擊表單區塊
  form.addEventListener("click", (e) => {
    if (hasViewedModal) return; // 已經解鎖過，就直接勾選
    e.preventDefault(); // 阻止直接勾選

    // 使用 Bootstrap JS 打開 modal
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  });

  // 當 modal 關閉後，允許勾選 checkbox
  modalElement.addEventListener("hidden.bs.modal", () => {
    checkbox.disabled = false;
    hasViewedModal = true;
  });
}

// 第一組: 食品投稿
setupSpeciCheck("publicationSpeciForm", "agreeCheckbox", "publicationSpeci");

// 第二組: 專欄投稿
setupSpeciCheck(
  "columnPublicationSpeciForm",
  "agreeColumnCheckbox",
  "columnPublicationSpeci"
);

/* contrib投稿頁面:表單提交驗證提示 */
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

/* contrib專欄投稿頁面:Quill function */
// DOM Ready 後執行
document.addEventListener("DOMContentLoaded", () => {
  // 初始化 Quill 編輯器
  const quill = new Quill("#editor-container", {
    theme: "snow",
    modules: {
      toolbar: "#toolbar",
    },
    placeholder:
      "請輸入內文 (可自定義段落樣式、插入圖片、Youtube影片連結)\n(總字數不得少於200字，不得多於2,000字)\n(圖片檔案大小不得超過10MB，解析度需高於1280 × 720 px)",
  });

  // 表單送出時，把內容存進隱藏 input
  const form = document.querySelector("form");
  form.addEventListener("submit", () => {
    const contentInput = document.getElementById("editor-content");
    contentInput.value = quill.root.innerHTML;
  });
});

/* contrib專欄投稿頁面:動態更新第二個select(主題&對應的知識類別) */
document.addEventListener("DOMContentLoaded", function () {
  const topicSelect = document.getElementById("topicSelect");
  const categorySelect = document.getElementById("categorySelect");

  const categoryMap = {
    Diet: [
      "糧食類型解析",
      "成分與標籤知識",
      "換糧指南",
      "特殊處方糧",
      "自製食物",
      "飲水與水分攝取",
      "其他",
    ],
    Health: [
      "健康照護",
      "常見疾病",
      "身體警訊",
      "絕育照護",
      "老貓照護",
      "保健品解析",
      "其他",
    ],
    Behavior: [
      "行為解讀",
      "情緒觀察",
      "廁所問題",
      "多貓家庭",
      "遊戲建議",
      "其他",
    ],
    Ownership: [
      "養貓前準備",
      "初養用品",
      "選貓指南",
      "環境設置",
      "外出與就診",
      "常見錯誤",
      "其他",
    ],
    Others: ["無"],
  };

  topicSelect.addEventListener("change", function () {
    const selectedTopic = topicSelect.value;

    // 清空第二個 select
    categorySelect.innerHTML = `<option value="" selected>請選擇</option>`;

    if (categoryMap[selectedTopic]) {
      categoryMap[selectedTopic].forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      });
    }
  });
});

/* contrib投稿專欄頁面:動態表單欄位新增&刪除功能 */
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addExtraReadingBtn");
  const container = document.getElementById("extra-reading-container");

  let counter = 1; // 第一筆已存在

  addBtn.addEventListener("click", () => {
    if (counter >= 3) return; // 最多 3 筆

    const newDiv = document.createElement("div");
    newDiv.classList.add(
      "reading-item",
      "mb-8",
      "w-100",
      "d-flex",
      "align-items-end"
    );

    newDiv.innerHTML = `
      <label for="furtherReading${counter}" class="w-100 me-6">
        <p class="px-2 d-flex mb-2">
          <span class="contrib-font-size-sm neutral-900">7. 延伸閱讀</span>
          <span class="contrib-font-size-xs neutral-600 ms-auto">選填</span>
        </p>
        <div>
          <input
            type="url"
            class="form-control border-radius contrib-input-heigh px-4"
            id="furtherReading${counter}"
            placeholder="請列出相關延伸閱讀網址"
          />
        </div>
      </label>
      <button type="button" class="btn contrib-delete-area contrib-delete-btn border-radius">
        <img src="../assets/images/contrib/trash.png" alt="trash" />
      </button>
    `;

    // 插入到按鈕上方
    container.insertBefore(newDiv, addBtn.parentElement);

    counter++;

    // 綁定刪除事件
    const trashBtn = newDiv.querySelector(".contrib-delete-btn");
    trashBtn.addEventListener("click", () => {
      newDiv.remove();
      counter--;
    });
  });
});

console.log("Hello world");

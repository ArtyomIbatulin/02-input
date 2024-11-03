import "./style.css";

const app = document.querySelector("#app");

const header = document.createElement("header");
header.className = "header";

const headerTitle = document.createElement("h4");
headerTitle.className = "header__title";
headerTitle.textContent = "DS";

header.appendChild(headerTitle);

const main = document.createElement("main");
main.className = "main";

const mainTitle = document.createElement("h1");
mainTitle.className = "main__title";
mainTitle.textContent = "Кастомный input";

const mainDescription = document.createElement("h4");
mainDescription.className = "main__description";
mainDescription.textContent = "Это кастомный input";

const form = document.createElement("form");
form.method = "POST";
form.enctype = "multipart/form-data";
form.className = "main__form";

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.multiple = true;
fileInput.hidden = true;
fileInput.id = "upload";
fileInput.accept = ".jpg, .jpeg, .png";
fileInput.className = "main__file-input";

const labelInput = document.createElement("label");
labelInput.htmlFor = "upload";
labelInput.className = "main__label-input";

const spanLabel = document.createElement("span");
spanLabel.innerHTML = "	&#8853;";
spanLabel.className = "label-input__span";

const pLabel = document.createElement("p");
pLabel.textContent = "Click to upload";
pLabel.className = "label-input__p";

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.className = "main__submit-button";
submitButton.textContent = "Отправить";

const fileDescription = document.createElement("h4");
fileDescription.className = "main__file-description";
fileDescription.textContent =
  "Вы можете загрузить до 5 файлов JPG, JPEG, PNG, размер одного — до 10 МБ";

const fileWrapper = document.createElement("div");
fileWrapper.className = "main__fileWrapper";

const uploadedFilesDescription = document.createElement("h3");
uploadedFilesDescription.className = "fileWrapper__uploaded-files-description";
uploadedFilesDescription.textContent = "Uploaded files";

const previewContainer = document.createElement("div");
previewContainer.className = "preview-container";

const errorContainer = document.createElement("div");
errorContainer.className = "main__error-container";

const errorContainerFileId = document.createElement("div");
errorContainerFileId.className = "main__error-container--fileId";

const errorContainerType = document.createElement("div");
errorContainerType.className = "main__error-container--type";

const errorContainerSize = document.createElement("div");
errorContainerSize.className = "main__error-container--size";

labelInput.appendChild(spanLabel);
labelInput.appendChild(pLabel);

form.appendChild(fileInput);
form.appendChild(labelInput);
form.appendChild(submitButton);

fileWrapper.appendChild(uploadedFilesDescription);

main.appendChild(mainTitle);
main.appendChild(mainDescription);
main.appendChild(form);
main.appendChild(fileDescription);
main.appendChild(fileWrapper);
main.appendChild(previewContainer);
main.appendChild(errorContainer);
main.appendChild(errorContainerType);
main.appendChild(errorContainerSize);
main.appendChild(errorContainerFileId);

const footer = document.createElement("footer");
footer.className = "footer";

const footerTitle = document.createElement("h4");
footerTitle.className = "footer__title";
footerTitle.textContent = "DS ноябрь 2024";

footer.appendChild(footerTitle);

app.appendChild(header);
app.appendChild(main);
app.appendChild(footer);

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILE_COUNT = 5;
const addedFiles = new Set();
let selectedFiles = [];

fileInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);

  errorContainer.textContent = "";
  let rejectedFiles = [];

  if (selectedFiles.length + files.length > MAX_FILE_COUNT) {
    const availableSlots = MAX_FILE_COUNT - selectedFiles.length;
    rejectedFiles = files.slice(availableSlots).map((file) => file.name);
    files.splice(availableSlots);
    errorContainer.textContent = `Эти файлы не добавлены, так как превышено максимальное количество файлов: ${rejectedFiles.join(
      ", "
    )}`;
  }

  files.forEach((file) => {
    let fileName = file.name;
    let fileSize = Math.round(file.size / 1024) + " КБ";
    let fileType = file.name.split(".").pop().toLowerCase();
    const fileId = `${fileName}-${fileSize}`;

    if (addedFiles.has(fileId)) {
      errorContainer.textContent += `\nФайл ${fileId} уже добавлен`;
      return;
    }

    if (!["png", "jpeg", "jpg"].includes(fileType)) {
      errorContainer.textContent += `\nУ файла ${file.name} не тот формат`;
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      errorContainer.textContent += `\nФайл ${file.name} весит больше 10 МБ`;
      return;
    }

    addedFiles.add(fileId);
    selectedFiles.push(file);

    fileView(fileName, fileType, fileSize, fileId, file);
  });

  // previewContainer.innerHTML = "";

  // if (e.target.files[0].type.startsWith("image/")) {
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const img = document.createElement("img");
  //     img.src = e.target.result;
  //     img.alt = fileName;
  //     img.style.width = "100px";
  //     img.style.height = "auto";
  //     previewContainer.appendChild(img);
  //   };

  //   reader.readAsDataURL(e.target.files[0]);
  // }
});

const fileView = (fileName, fileType, fileSize, fileId, file) => {
  const showFileBox = document.createElement("div");
  showFileBox.classList.add("fileWrapper__show-file-box");

  const leftSide = document.createElement("div");
  leftSide.classList.add("show-file-box__leftSide");

  const fileTypeElem = document.createElement("span");
  fileTypeElem.classList.add("left-side__span");
  fileTypeElem.innerHTML = fileType;
  leftSide.appendChild(fileTypeElem);

  const fileTitleElem = document.createElement("h3");
  fileTitleElem.innerHTML = fileName;
  leftSide.appendChild(fileTitleElem);

  const fileSizeElem = document.createElement("h4");
  fileSizeElem.innerHTML = fileSize;
  leftSide.appendChild(fileSizeElem);

  showFileBox.appendChild(leftSide);

  const rightSide = document.createElement("div");
  rightSide.classList.add("show-file-box__rightSide");
  showFileBox.appendChild(rightSide);

  const deleteSpan = document.createElement("span");
  deleteSpan.innerHTML = "&#215;";
  deleteSpan.classList.add("right-side__span");
  rightSide.appendChild(deleteSpan);
  fileWrapper.appendChild(showFileBox);

  deleteSpan.addEventListener("click", () => {
    fileWrapper.removeChild(showFileBox);
    addedFiles.delete(fileId);
    selectedFiles = selectedFiles.filter((f) => f !== file);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (selectedFiles.length === 0) {
    errorContainer.textContent = "Выберите хотя бы один файл перед отправкой";
    return;
  }

  const formData = new FormData(form);

  selectedFiles.forEach((file, index) => {
    formData.append(`file${index + 1}`, file);
  });

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка отправки данных");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Успешная отправка данных:", data);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });

  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
});

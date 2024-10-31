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
form.action = "";
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

const footer = document.createElement("footer");
footer.className = "footer";

const footerTitle = document.createElement("h4");
footerTitle.className = "footer__title";
footerTitle.textContent = "DS ноябрь 2024";

footer.appendChild(footerTitle);

app.appendChild(header);
app.appendChild(main);
app.appendChild(footer);

fileInput.addEventListener("change", (e) => {
  let fileName = e.target.files[0].name;
  let fileSize = Math.round(e.target.files[0].size / 1024) + " КБ";
  let fileType = e.target.value.split(".").pop();
  fileView(fileName, fileType, fileSize);
});

const fileView = (fileName, fileType, fileSize) => {
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
  });
};

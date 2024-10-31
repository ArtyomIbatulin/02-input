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

const showFileBox = document.createElement("div");
showFileBox.className = "fileWrapper__show-file-box";

const leftSide = document.createElement("div");
leftSide.className = "show-file-box__leftSide";

const spanLeftSide = document.createElement("span");
spanLeftSide.className = "left-side__span";
spanLeftSide.innerHTML = "Расширение";

const nameFile = document.createElement("h3");
nameFile.className = "left-side__name-file";
nameFile.textContent = "Название файла";

const rightSide = document.createElement("div");
rightSide.className = "show-file-box__rightSide";

const spanRightSide = document.createElement("span");
spanRightSide.className = "right-side__span";
spanRightSide.innerHTML = "&#215;";

labelInput.appendChild(spanLabel);
labelInput.appendChild(pLabel);

form.appendChild(fileInput);
form.appendChild(labelInput);
form.appendChild(submitButton);

leftSide.appendChild(spanLeftSide);
leftSide.appendChild(nameFile);

rightSide.appendChild(spanRightSide);

showFileBox.appendChild(leftSide);
showFileBox.appendChild(rightSide);

fileWrapper.appendChild(uploadedFilesDescription);
fileWrapper.appendChild(showFileBox);

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
  let fileSize = Math.trunc(e.target.files[0].size / 1024) + " КБ";
  let fileType = e.target.value.split(".").pop();
  console.log(fileSize);
  fileView(fileName, fileType);
});

const fileView = (fileName, fileType) => {
  const showfileboxElem = document.createElement("div");
  showfileboxElem.classList.add("fileWrapper__show-file-box");
  const leftElem = document.createElement("div");
  leftElem.classList.add("show-file-box__leftSide");
  const fileTypeElem = document.createElement("span");
  fileTypeElem.classList.add("left-side__span");
  fileTypeElem.innerHTML = fileType;
  leftElem.appendChild(fileTypeElem);
  const filetitleElem = document.createElement("h3");
  filetitleElem.innerHTML = fileName;
  leftElem.appendChild(filetitleElem);
  showfileboxElem.appendChild(leftElem);
  const rightElem = document.createElement("div");
  rightElem.classList.add("show-file-box__rightSide");
  showfileboxElem.appendChild(rightElem);
  const crossElem = document.createElement("span");
  crossElem.innerHTML = "&#215;";
  crossElem.classList.add("right-side__span");
  rightElem.appendChild(crossElem);
  fileWrapper.appendChild(showfileboxElem);

  crossElem.addEventListener("click", () => {
    fileWrapper.removeChild(showfileboxElem);
  });
};

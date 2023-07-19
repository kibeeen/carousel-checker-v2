const fileInput = document.querySelectorAll(".non-wof-input");
const preview = document.querySelectorAll(".md-teaser-image.non-wof-image");
const wofPreview = document.querySelector(".md-teaser-image.non-wof-image");
const wofPreviewMobile = document.querySelector(".teaser-image-mobile.wof-image");
const png = document.querySelectorAll(".carousel-png");
const brands = selectEl("#brands");
let reader = new FileReader();

let firstDrop = true;
function handleEvent(event) {
  if (event.type === "load") {
    const brandValue = document.querySelector('input[name="contact"]:checked').value;
    selectEl(".drop-container").classList.remove("no-content");
    for (let i = 0; i < preview.length; i++) {
      if (brandValue != "wof") {
        if (firstDrop == false) {
          for (let k = 0; k < png.length; k++) {
            png[k].setAttribute("src", `${reader.result}`);
          }
          return;
        }
        preview[i].style.backgroundImage = `url(${reader.result})`;
        selectEl(".background").classList.remove("absolute");
        firstDrop = false;
        return;
      } else {
        if (firstDrop) {
          wofPreview.style.backgroundImage = `url(${reader.result})`;
          firstDrop = false;
          return;
        }
        wofPreviewMobile.style.backgroundImage = `url(${reader.result})`;
        selectEl(".mobile-container").classList.remove("no-content");
      }
    }
  }
}

function addListeners(reader) {
  reader.addEventListener("loadstart", handleEvent);
  reader.addEventListener("load", handleEvent);
  reader.addEventListener("loadend", handleEvent);
  reader.addEventListener("progress", handleEvent);
  reader.addEventListener("error", handleEvent);
  reader.addEventListener("abort", handleEvent);
}
function handleSelected(e) {
  const selectedFile = fileInput;
  for (let i = 0; i < selectedFile.length; i++) {
    if (selectedFile[i].files[0]) {
      reader = new FileReader();
      addListeners(reader);
      reader.readAsDataURL(selectedFile[i].files[0]);
    }
  }
}
for (let i = 0; i < fileInput.length; i++) {
  fileInput[i].addEventListener("change", handleSelected);
}

function createFrag(tag, string) {
  let frag = document.createDocumentFragment(),
    el = document.createElement(tag);
  el.innerHTML = string;
  while (el.firstChild) {
    frag.appendChild(el.firstChild);
  }
  return frag;
}

let inputs = document.querySelectorAll(".input-text > input");

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keyup", (e) => {
    if (e.target.classList.contains("title-input")) {
      let title = document.querySelectorAll(".title");

      for (let j = 0; j < title.length; j++) {
        title[j].innerHTML = "";
        title[j].append(createFrag("span", e.target.value.toUpperCase()));
      }
      return;
    }
    if (e.target.classList.contains("CTA")) {
      let btn = document.querySelectorAll(".epcot-btn");

      for (let j = 0; j < btn.length; j++) {
        btn[j].innerHTML = "";
        btn[j].innerText = e.target.value;
      }
      return;
    }
    let subtitle = document.querySelectorAll(".subtitle");
    for (let k = 0; k < subtitle.length; k++) {
      subtitle[k].innerHTML = "";
      subtitle[k].append(createFrag("span", e.target.value.toUpperCase()));
    }
  });
}
selectEl('input[type="file"]').addEventListener("click", (e) => {
  if (e.target.value) e.preventDefault();
});

(function changeBrand() {
  let currentClass = "betcasino";
  let parent = selectEl(".teasers"),
    childElements = parent.querySelectorAll("div, a, p, img"),
    mobileParent = document.querySelector(".teaser-mobile.non-wof"),
    wofParent = document.querySelector(".teaser-mobile.wof"),
    mobileChild = mobileParent.querySelectorAll("div, a, p"),
    wofChild = wofParent.querySelectorAll("div, a, p");

  function changeClass(elements) {
    let brands = ["betcasino", "betpoker", "borgatacasino", "borgatapoker", "bingo", "wof", "partycasino"];
    for (let i = 0; i < brands.length; i++) {
      elements.classList.remove(brands[i]);
    }
  }

  function state(newClass) {
    for (let i = 0; i < childElements.length; i++) {
      changeClass(childElements[i]);
      childElements[i].classList?.add(`${newClass}`);
    }
  }
  function stateMobile(newClass) {
    for (let i = 0; i < mobileChild.length; i++) {
      changeClass(mobileChild[i]);
      mobileChild[i].classList?.add(`${newClass}`);
      changeClass(wofChild[i]);
      wofChild[i].classList?.add(`${newClass}`);
    }
  }
  function updateClass({ value, header }) {
    value == "bingo"
      ? selectEl(".swiper-wrapper").classList.add("bingo-wrapper")
      : selectEl(".swiper-wrapper").classList.remove("bingo-wrapper");
    if (value == "wof") {
      selectEl(".non-wof").style.display = "none";
      selectEl(".teaser-mobile.wof").style.display = "block";
      selectEl(".swiper-slide-prev").classList.add("full");
    } else {
      selectEl(".non-wof").style.display = "block";
      selectEl(".teaser-mobile.wof").style.display = "none";
      selectEl(".swiper-slide-prev").classList.remove("full");
    }
    state(value);
    stateMobile(value);
    currentClass = value;
    selectEl(".header").style.backgroundImage = `url(${header})`;
  }
  selectEl("#brands").addEventListener("change", (e) => {
    switch (e.target.value) {
      case "betcasino":
        updateClass({ value: e.target.value, header: "./image.png" });
        break;
      case "betpoker":
        updateClass({ value: e.target.value, header: "./image.png" });
        break;
      case "borgatacasino":
        updateClass({ value: e.target.value, header: "./borgata.png" });
        break;
      case "borgatapoker":
        updateClass({ value: e.target.value, header: "./borgata.png" });
        break;
      case "bingo":
        updateClass({ value: e.target.value, header: "./borgata.png" });
        break;
      case "wof":
        updateClass({ value: e.target.value, header: "./borgata.png" });
        break;
      case "partycasino":
        updateClass({ value: e.target.value, header: "./partycasino.png" });
        break;
    }
  });
})();

function selectEl(selector) {
  return document.querySelector(`${selector}`);
}

selectEl(".reset button").addEventListener("click", () => {
  window.location.reload();
  // var inputs = document.querySelectorAll('.text-input');
  // inputs.forEach(function (element) {
  //     element.value = "";
  // })
});

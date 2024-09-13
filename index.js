import { catsData } from "./data.js";

const emotionRadios = document.querySelector("#emotion-radios");
const gifOnlyOption = document.getElementById("gifs-only-option");
const getImageBtn = document.getElementById("get-image-btn");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const modalCloseBtn = document.getElementById("meme-modal-close-btn");

// EVENT-LISTENERS

emotionRadios.addEventListener("change", highlightRadioBtn);

modalCloseBtn.addEventListener("click", closeMemeModal);

getImageBtn.addEventListener("click", renderSingleCatObject);

// FUNCTIONS RELATED TO EVENT-LISTENERS IN ORDER

function highlightRadioBtn(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function closeMemeModal() {
  memeModal.style.display = "none";
}

function renderSingleCatObject() {
  const singleCatObject = getSingleCatObject();

  memeModalInner.innerHTML = `
        <img 
        class="cat-img" 
        src="./images/${singleCatObject.image}"
        alt="${singleCatObject.alt}"
        >
    `;
  memeModal.style.display = "flex";
}

function getSingleCatObject() {
  const matchingCatsArray = getMatchingCatsArray();

  const randomIndex = Math.floor(Math.random() * matchingCatsArray.length);
  if (matchingCatsArray.length === 1) {
    return matchingCatsArray;
  } else {
    return matchingCatsArray[randomIndex];
  }
}

function getMatchingCatsArray() {
  if (document.querySelector("input[type='radio']:checked")) {
    const checkedEmotion = document.querySelector(
      "input[type='radio']:checked"
    ).id;
    const isGif = gifOnlyOption.checked;

    const matchingCatsArray = catsData.filter((e) => {
      if (isGif) {
        return e.emotionTags.includes(checkedEmotion) && e.isGif;
      } else {
        return e.emotionTags.includes(checkedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

// RENDERING EMOTIONS ARRAY ON THE PAGE

function renderEmotionsArray(cats) {
  const emotions = getEmotionsArray(cats);
  let radios = ``;
  emotions.forEach((e) => {
    radios += `
    <div class="radio">
    <label for="${e}">${e}</label>
    <input
    type="radio"
    id="${e}"
    value="${e}"
    name="emotions"
    >
    </div>
    `;
  });
  emotionRadios.innerHTML = radios;
}

function getEmotionsArray(cats) {
  const emotionsArray = [];
  cats.forEach((e) => {
    e.emotionTags.forEach((f) => {
      if (!emotionsArray.includes(f)) emotionsArray.push(f);
    });
  });
  return emotionsArray;
}

renderEmotionsArray(catsData);

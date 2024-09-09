import { catsData } from "./data.js";

const emotionRadios = document.querySelector("#emotion-radios");

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotion(cats) {
  let radioEmotions = ``;
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    radioEmotions += `
      <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input 
        type="radio"
        id="${emotion}"
        value="${emotion}"
        name="emotions">
      </div>
    `;
  }
  emotionRadios.innerHTML = radioEmotions;
}

renderEmotion(catsData);

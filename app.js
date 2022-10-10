const URL =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");

const fetchPages = async (sarchTerm) => {
  resultsDOM.innerHTML = '<div class="loading"></div>';
  try {
    const response = await fetch(`${URL}${sarchTerm}`);
    const data = await response.json();
    if (!response) {
      throw new Error(`error, no response from the server`);
    }
    const results = data.query.search;
    if (results.length < 1) {
      resultsDOM.innerHTML = '<div class="error">no matching results</div>';
    }
    renderResults(results);
  } catch (error) {
    resultsDOM.innerHTML = '<div class="error">there was an error</div>';
  }
};

const renderResults = (list) => {
  const cardList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `
    <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
    <h4>${title}</h4>
    <p>${snippet}</p>
    </a>
    `;
    })
    .join("");
  resultsDOM.innerHTML = `<div class="articles">${cardList}</div>`;
};

// search form
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = inputDOM.value;
  if (!value) {
    resultsDOM.innerHTML =
      '<div class="error">please enter valid search term</div>';
    throw new Error("nothing to search");
  }
  fetchPages(value);
});

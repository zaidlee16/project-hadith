const output = document.getElementById("output");
var url = "https://api.hadith.gading.dev/books";

function getListHadiths() {
  axios.get(url).then(function (res) {
    var hadith = res.data.data
      .map((h) => {
        return `
          <div class="card-hadiths">
            <div class="img-hadiths">
              <img src="./images/${h.id}.jpg" alt="${h.name}"></img>
            </div>
            <h2>${h.name}</h2>
            <p>Jumlah Hadits : <b>${h.available}</b></p>
            <a class="btn btn-secondary w-100"
            href="/hadiths/${h.id}.html">
            Klik Disini
            </a>
          </div>
        `;
      })
      .join("");

    output.innerHTML = hadith;
  });
}

const outputHadiths = document.getElementById("output-hadiths");

var currentURL = window.location.href;
var fileName = currentURL.split("/").pop();
var fileNameWithoutExtension = fileName.replace(/\.html$/, "");

function getHadithsById() {
  axios
    .get(`${url}/${fileNameWithoutExtension}?range=1-300`)
    .then(function (res) {
      var getHadiths = res.data.data.hadiths
        .map((hadiths) => {
          return `
          <div class="card mb-3 mt-3">
            <div class="card-header bg-info-subtle">
              <h3 class="card-title">Hadits No : ${hadiths.number}</h3>
            </div>
            <div class="card-body">
              <p class="text-end fs-5 card-text">${hadiths.arab}</p>
              <p class="arti card-text">${hadiths.id}</p>
            </div>
          </div>
          `;
        })
        .join("");

      outputHadiths.innerHTML = getHadiths;
    });
}

// function btnSearch() {
//   const searchId = document.getElementById("search-id").value;
//   const titleSearch = document.getElementById("title-search");
//   const resultSearch = document.getElementById("output-search");

//   axios
//     .get(`${url}/${fileNameWithoutExtension}/${searchId}`)
//     .then(function (res) {
//       var getSearch = res.data.data.contents;

//       outputHadiths.innerHTML = `
//       <div class="card mb-3 mt-3">
//         <div class="card-header bg-dark-subtle">
//           <h3 class="card-title">Hadits No : ${getSearch.number}</h3>
//         </div>
//         <div class="card-body">
//           <p class="text-end fs-5 card-text">${getSearch.arab}</p>
//           <p class="arti card-text">${getSearch.id}</p>
//         </div>
//       </div>
//       `;
//     });
// }

function btnSearch() {
  const searchId = document.getElementById("search-id").value;
  const titleSearch = document.getElementById("title-search");
  const resultSearch = document.getElementById("output-search");

  axios
    .get(`${url}/${fileNameWithoutExtension}/?range=1-300`)
    .then(function (res) {
      var getSearch = res.data.data.hadiths.filter((fill) => {
        return fill.id.toLowerCase().includes(searchId.toLowerCase());
      });

      if (searchId.length > 0) {
        titleSearch.innerHTML = `Pencarian Hadiths : <b>${searchId}</b>`;
        resultSearch.innerHTML = getSearch
          .map((result) => {
            return `
          <div class="card mb-3 mt-3">
            <div class="card-header bg-info-subtle">
              <h3 class="card-title">Hadits No : ${result.number}</h3>
            </div>
            <div class="card-body">
              <p class="text-end fs-5 card-text">${result.arab}</p>
              <p class="arti card-text">${result.id}</p>
            </div>
          </div>
        `;
          })
          .join("");
      } else if (searchId == "") {
        titleSearch.innerHTML = "";
        resultSearch.innerHTML = "Data tidak tersedia!";
      }
    });
}

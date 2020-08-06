let engineSelect = document.getElementById("engine-select");
let modeSelect = document.getElementById("mode-select");
let maxNumber = document.getElementById("max-number");
let submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", (e) => {
  axios
    .post("/solve", {
      "engine-select": engineSelect.value,
      "mode-select": modeSelect.value,
      maxNumber: maxNumber.value === "" ? 2 : parseInt(maxNumber.value),
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.err(err);
    });
});

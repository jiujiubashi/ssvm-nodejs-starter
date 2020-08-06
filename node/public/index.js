let engineSelect = document.getElementById("engine-select");
let modeSelect = document.getElementById("mode-select");
let maxNumber = document.getElementById("max-number");
let submitButton = document.getElementById("submit-button");
let resultP = document.getElementById('result')

submitButton.addEventListener("click", (e) => {
  axios
    .post("/solve", {
      "engine-select": engineSelect.value,
      "mode-select": modeSelect.value,
      "max-number": maxNumber.value === "" ? 2 : parseInt(maxNumber.value),
    })
    .then((res) => {
      console.log(res);
      resultP.innerText = `计算结果：${res.data.answer}，花费时间：${parseFloat(res.data.time) / 1000} ms`
    })
    .catch((err) => {
      console.err(err);
      resultP.innerText = `出错啦：${JSON.stringify(err)}`
    });
});

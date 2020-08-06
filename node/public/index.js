let engineSelect = document.getElementById("engine-select");
let modeSelect = document.getElementById("mode-select");
let maxNumber = document.getElementById("max-number");
let submitButton = document.getElementById("submit-button");
let resultP = document.getElementById("result");

submitButton.addEventListener("click", (e) => {
  resultP.innerText = `正在计算中，请等待...`;
  if (engineSelect.value === "javascript-client") {
    let startTick = new Date();
    let result = compute_with_client(modeSelect.value, maxNumber.value);
    let endTick = new Date();

    resultP.innerText = `计算结果：${result}，花费时间：${
      parseFloat(endTick - startTick) / 1000
    } ms`;
  } else if (
    engineSelect.value === "javascript" ||
    engineSelect.value === "wasm"
  ) {
    axios
      .post("/solve", {
        "engine-select": engineSelect.value,
        "mode-select": modeSelect.value,
        "max-number": maxNumber.value === "" ? 2 : parseInt(maxNumber.value),
      })
      .then((res) => {
        resultP.innerText = `计算结果：${res.data.answer}，花费时间：${
          parseFloat(res.data.time) / 1000
        } ms`;
      })
      .catch((err) => {
        resultP.innerText = `出错啦：${JSON.stringify(err)}`;
      });
  }
});
function compute_with_client(mode, maxNumber) {
  let result;
  if (mode === "brute") {
    result = compute_with_client_impl_brute(maxNumber);
  } else if (mode === "optimized") {
    result = compute_with_client_impl_optimized(maxNumber);
  }
  return result;
}
function compute_with_client_impl_brute(n) {
  let result = 0;
  for (let a = 1; a <= n; ++a) {
    for (let b = 1; b <= n; ++b) {
      for (let c = 1; c <= n; ++c) {
        for (let d = 1; d <= n; ++d) {
          let status =
            Math.pow(a, 3) + Math.pow(b, 3) === Math.pow(c, 3) + Math.pow(d, 3);
          if (status) {
            ++result;
          }
        }
      }
    }
  }
  return result;
}

function compute_with_client_impl_optimized(n) {
  let result = 0;
  let sums = new Map();
  for (let a = 1; a <= n; ++a) {
    for (let b = 1; b <= n; ++b) {
      let sum = Math.pow(a, 3) + Math.pow(b, 3);
      let count = sums.get(sum) || 0;
      sums.set(sum, count + 1);
    }
  }
  for (const [_, count] of sums) {
    result += Math.pow(count, 2);
  }
  return result;
}

const { compute } = require('../pkg/ssvm_nodejs_starter_lib')
module.exports.computeWithJS = function computeWithJS(mode, maxNumber) {
    let result
    if (mode === "brute") {
        result = computeWithJS_impl_brute(maxNumber)
    } else if (mode === "optimized") {
        result = computeWithJS_impl_optimized(maxNumber)
    }
    return result
}
module.exports.computeWithWasm = function computeWithWasm(mode, maxNumber) {
    let result
    if (mode === "brute") {
        result = compute(JSON.stringify([mode, maxNumber]))
    } else if (mode === "optimized") {
        result = compute(JSON.stringify([mode, maxNumber]))
    }
    return result
}
function computeWithJS_impl_brute(n) {
    let result = 0
    for (let a = 1; a <= n; ++a) {
        for (let b = 1; b <= n; ++b) {
            for (let c = 1; c <= n; ++c) {
                for (let d = 1; d <= n; ++d) {
                    let status = (
                        Math.pow(a, 3) + Math.pow(b, 3)
                        ===
                        Math.pow(c, 3) + Math.pow(d, 3)
                    )
                    if (status) {
                        ++result
                    }
                }
            }
        }
    }
    return result
}

function computeWithJS_impl_optimized(n) {
    let result = 0
    let sums = new Map()
    for (let a = 1; a <= n; ++a) {
        for (let b = 1; b <= n; ++b) {
            let sum = Math.pow(a, 3) + Math.pow(b, 3)
            let count = sums.get(sum) || 0
            sums.set(sum, count + 1)
        }
    }
    for (const [_, count] of sums) {
        result += Math.pow(count, 2)
    }
    return result
}
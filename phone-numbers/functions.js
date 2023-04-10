function createPhoneNumber(numbers) {
    first3Nums = numbers.slice(0, 3).join("")
    next3Nums = numbers.slice(3, 6).join("")
    last4Nums = numbers.slice(6, 10).join("")
    return `(${first3Nums}) ${next3Nums}-${last4Nums}`
}


module.exports = createPhoneNumber;
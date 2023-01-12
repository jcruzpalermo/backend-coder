export const randomNumbers = (cant) => {
    if (!cant) {
        cant = 1000000
    }

    let arrayNumeros = []

    for (let i = 0; i <= 1000; i++) {
        arrayNumeros[i] = 0
    }

    for (let i = 0; i < cant; i++) {
        let number = Math.floor((Math.random() * 1000 + 1))
        arrayNumeros[number]++
    }

    let arrayData = []
    for (let i = 0; i < arrayNumeros.length; i++) {
        if (arrayNumeros[i] !== 0) {
            let acumulador = { numero: i, veces: arrayNumeros[i] }
            arrayData.push(acumulador)
        }
    }
    return arrayData
}


process.on('message', (data) => {
    process.send(randomNumbers(data))
})

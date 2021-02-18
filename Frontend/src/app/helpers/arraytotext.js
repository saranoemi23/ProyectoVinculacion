// arreglo de string
export default function arraytotext(arreglo){
    arreglo = arreglo.map(function(fila){
        return fila.join(';')
    })
    return arreglo.join('\n')
}

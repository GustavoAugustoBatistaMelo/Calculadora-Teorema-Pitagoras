/**
* @description Verifica se os valores forma um triangulo.
*
* @param   {Number} ladoA Cateto
* @param   {Number} ladoB Cateto 
* @param   {Number} ladoC Hipotenusa
* @returns false ou true
**/
export const validateTriangle = (a, b, c) => { 
   if (a < (b + c) && b < (a + c) && c < (a + b)) {
    return true;
   }
   else {
    return false;
   }
}
/**
* @desc Valida se foram preenchido mais do que dois campos.
*
* @param {Number} ladoA Cateto
* @param {Number} ladoB Cateto 
* @param {Number} ladoC Hipotenusa
* @returns false ou true
**/
export const validateFields = (a,b,c) => { 
    if (a && b && c) {
     return true;
    } else { 
     return false;
    }
}




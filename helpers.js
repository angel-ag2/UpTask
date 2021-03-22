// la idea es generar un json con la siguiente estructura
// id       cliente
//array = array(
//    'id' =>1,
//    'nombre'=>'jose'
//)
exports.vardump = (objeto)=> JSON.stringify(objeto, null,2);
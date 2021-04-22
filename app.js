const { argv } = require('./config/yargs');
const colors = require("colors");

const porHacer = require('./por-hacer/por-hacer')

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        console.log(listado);
        
        for(let tarea of listado){
            console.log("********Por Hacer**********".green);
            console.log("Tarea: ".red+ `${tarea.descripcion}`.yellow);
            console.log("Estado:".red + `${tarea.completado}`.yellow);
            console.log("***************************".green);
        }
        break;
    case 'actualizar':
        porHacer.actualizar(argv.descripcion, argv.completado);
        break;
    case 'eliminar':
        porHacer.eliminar(argv.descripcion);
        break;
    default:
        console.log("Comando no valido");
        break;
}
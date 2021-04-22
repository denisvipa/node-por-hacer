
const fs = require('fs');
const colors = require("colors");

let listadoPorHacer = [];

const guardarDB = () => {
    const data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err){ throw new Error (`error al crear el archivo: ${ err }`); }
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require("../db/data.json");        
    } catch (error) {
        listadoPorHacer = [];
    }
    return listadoPorHacer;
}

const getListado = () => {
     cargarDB();
     return listadoPorHacer;
}

const crear = (descripcion)=>{
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const actualizar = (descripcion, completado) => {
    cargarDB();

    if(completado == "true" || completado == "false"){
        
        let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion );
    
        if (index >= 0){
            listadoPorHacer[index].completado = completado; 
            guardarDB();
        }    
        
    }else {
        throw new Error ('completado debe ser igual a true o false');
    }
}

const eliminar = descripcion => {
    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion );
    
    if (index >= 0){
        listadoPorHacer.splice(index,1);
        guardarDB();
    } 
}


module.exports = {
    crear,
    getListado,
    actualizar,
     eliminar
}
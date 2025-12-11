// src/scripts/scriptMain.js

document.getElementById('edad-hora').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const edad = parseInt(document.getElementById('edad').value);
    const horaDespertar = document.getElementById('hora').value;
    
    // Validación básica para evitar errores si los campos están vacíos
    if (!edad || !horaDespertar) return;
    
    // Convertir la hora de despertar a formato Date
    const [hora, minutos] = horaDespertar.split(':').map(Number);
    let despertar = new Date();
    despertar.setHours(hora);
    despertar.setMinutes(minutos);
    
    // Diccionario con rangos de sueño (Tu data original intacta)
    const rangosDeSueño = {
        '0': { idealMin: 12, idealMax: 17, posibleMin: 10, posibleMax: 19 },
        '1-2': { idealMin: 11, idealMax: 14, posibleMin: 9, posibleMax: 16 },
        '3-5': { idealMin: 10, idealMax: 13, posibleMin: 8, posibleMax: 14 },
        '6-13': { idealMin: 9, idealMax: 11, posibleMin: 7, posibleMax: 12 },
        '14-17': { idealMin: 8, idealMax: 10, posibleMin: 7, posibleMax: 11 },
        '18-25': { idealMin: 7, idealMax: 9, posibleMin: 6, posibleMax: 11 },
        '26-64': { idealMin: 7, idealMax: 9, posibleMin: 6, posibleMax: 10 },
        '65+': { idealMin: 7, idealMax: 8, posibleMin: 5, posibleMax: 9 }
    };
    
    const grupo_edad = {
        '0': { grupo: 'Recien Nacido/Bebé' },
        '1-2': { grupo: 'Niño pequeño' },
        '3-5': { grupo: 'Preescolar' },
        '6-13': { grupo: 'Edad escolar' },
        '14-17': { grupo: 'Adolescentes' },
        '18-25': { grupo: 'Adulto Joven' },
        '26-64': { grupo: 'Adulto' },
        '65+': { grupo: 'Adulto mayor' }
    };

    // Funciones helper originales
    function obtenerRangoDeSueño(edad) {
        if (edad <= 3) return rangosDeSueño['0'];
        if (edad <= 2) return rangosDeSueño['1-2'];
        if (edad <= 5) return rangosDeSueño['3-5'];
        if (edad <= 13) return rangosDeSueño['6-13'];
        if (edad <= 17) return rangosDeSueño['14-17'];
        if (edad <= 25) return rangosDeSueño['18-25'];
        if (edad <= 64) return rangosDeSueño['26-64'];
        return rangosDeSueño['65+'];
    }

    function obtenerGrupoEdad(edad) {
        if (edad <= 3) return grupo_edad['0'];
        if (edad <= 2) return grupo_edad['1-2'];
        if (edad <= 5) return grupo_edad['3-5'];
        if (edad <= 13) return grupo_edad['6-13'];
        if (edad <= 17) return grupo_edad['14-17'];
        if (edad <= 25) return grupo_edad['18-25'];
        if (edad <= 64) return grupo_edad['26-64'];
        return grupo_edad['65+'];
    }

    // Obtener rangos
    const { idealMin, idealMax, posibleMin, posibleMax } = obtenerRangoDeSueño(edad);
    const { grupo } = obtenerGrupoEdad(edad);

    // Cálculos de horas
    function calcularHoraAcostarse(horas) {
        let acostarse = new Date(despertar);
        acostarse.setHours(acostarse.getHours() - horas);
        return acostarse.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    function calcularHoraMedia(minHoras, maxHoras) {
        const mediaHoras = (minHoras + maxHoras) / 2;
        return calcularHoraAcostarse(mediaHoras);
    }

    const horaIdealMin = calcularHoraAcostarse(idealMax); 
    const horaIdealMax = calcularHoraAcostarse(idealMin); 
    const horaMediaIdeal = calcularHoraMedia(idealMin, idealMax); 

    const horaPosibleMin = calcularHoraAcostarse(posibleMax); 
    const horaPosibleMax = calcularHoraAcostarse(posibleMin); 
    const horaMediaPosible = calcularHoraMedia(posibleMin, posibleMax);

    // --- ACTUALIZACIÓN DE TEXTOS (Lógica Original) ---
    // Restauramos el formato exacto que tenías, manteniendo solo las clases CSS para negrita/color en el pie si es necesario.
    
    document.getElementById('mensaje-ideal').innerText = `Hora ideal: entre ${horaIdealMin} y ${horaIdealMax}. Sugerencia: ${horaMediaIdeal}`;
    document.getElementById('mensaje-cerca').innerText = `Hora cerca del rango ideal: entre ${horaPosibleMin} y ${horaPosibleMax}. Sugerencia: ${horaMediaPosible}`;
    document.getElementById('mensaje-fuera').innerText = `Hora fuera del rango: antes de ${horaPosibleMin} o después de ${horaPosibleMax}`;
    
    // El pie usa innerHTML en tu original para poner spans con clase "variablesPie"
    // Mantendremos esa estructura.
    document.getElementById('pie-semaforo').innerHTML = `Las horas sugeridas de sueño para <span class="font-bold text-[#3F74FB]">${grupo}</span> es entre <span class="font-bold text-[#3F74FB]">${idealMin}</span> y <span class="font-bold text-[#3F74FB]">${idealMax}</span>, idealmente <span class="font-bold text-[#3F74FB]">${horaMediaIdeal}</span>`;
});
document.getElementById('edad-hora').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const edad = parseInt(document.getElementById('edad').value);
    const horaDespertar = document.getElementById('hora').value;
    const sexo = document.querySelector('input[name="sexo"]:checked')?.value || 'otro';

    const modal = document.getElementById('modal-info');
    const closeModalBtn = document.getElementById('close-modal-btn');

    const cerrarModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    closeModalBtn.onclick = cerrarModal;
    modal.onclick = (e) => {
        if (e.target === modal) cerrarModal();
    };

    if (!edad || !horaDespertar) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        return;
    }
    
    const [hora, minutos] = horaDespertar.split(':').map(Number);
    let despertar = new Date();
    despertar.setHours(hora);
    despertar.setMinutes(minutos);
    
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
        '6-13': { grupo: 'niño en edad escolar' },
        '14-17': { grupo: 'Adolescentes' },
        '18-25': { grupo: 'Adulto Joven' },
        '26-64': { grupo: 'Adulto' },
        '65+': { grupo: 'Adulto mayor' }
    };

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

    const { idealMin, idealMax, posibleMin, posibleMax } = obtenerRangoDeSueño(edad);
    const { grupo } = obtenerGrupoEdad(edad);

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

    
    document.getElementById('mensaje-ideal').innerText = `Hora ideal: entre ${horaIdealMin} y ${horaIdealMax}. Sugerencia: ${horaMediaIdeal}`;
    document.getElementById('mensaje-cerca').innerText = `Hora cerca del rango ideal: entre ${horaPosibleMin} y ${horaPosibleMax}. Sugerencia: ${horaMediaPosible}`;
    document.getElementById('mensaje-fuera').innerText = `Hora fuera del rango: antes de ${horaPosibleMin} o después de ${horaPosibleMax}`;
    
    document.getElementById('pie-semaforo').classList.add('bg-slate-100/75');
    document.getElementById('pie-semaforo').innerHTML = `Las horas sugeridas de sueño para un <span class="font-bold text-somno">${grupo}</span> es entre <span class="font-bold text-somno">${idealMin}</span> y <span class="font-bold text-somno">${idealMax}</span>, idealmente dormir a las <span class="font-bold text-somno">${horaMediaIdeal}</span>`;

    
    function obtenerEtapa(edad) {
        if (edad <= 3)  return 'bebe';
        if (edad <= 13) return 'nino';
        if (edad <= 17) return 'adolescente';
        if (edad <= 64) return 'adulto';
        return 'mayor';
    }

    const avatarMap = {
        'bebe-hombre':        '/avatares/bebe.svg',
        'bebe-mujer':         '/avatares/bebe.svg',
        'bebe-otro':          '/avatares/bebe.svg',
        'nino-hombre':        '/avatares/nino-hombre.webp',
        'nino-mujer':         '/avatares/nino-mujer.webp',
        'nino-otro':          '',
        'adolescente-hombre': '/avatares/adolescente-hombre.webp',
        'adolescente-mujer':  '/avatares/adolescente-mujer.webp',
        'adolescente-otro':   '',
        'adulto-hombre':      '/avatares/adulto-hombre.webp',
        'adulto-mujer':       '/avatares/adulto-mujer.webp',
        'adulto-otro':        '',
        'mayor-hombre':       '/avatares/mayor-hombre.webp',
        'mayor-mujer':        '/avatares/mayor-mujer.webp',
        'mayor-otro':         '',
    };

    const etapa = obtenerEtapa(edad);
    const claveAvatar = `${etapa}-${sexo}`;
    const srcAvatar = avatarMap[claveAvatar] ?? avatarMap[`${etapa}-otro`];

    const avatarEl  = document.getElementById('semaforo-avatar');
    const overlayEl = document.getElementById('semaforo-overlay');

    avatarEl.style.opacity = '0';
    overlayEl.style.opacity = '0';

    setTimeout(() => {
        avatarEl.src = srcAvatar;
        avatarEl.alt = `Ilustración ${grupo}`;

        avatarEl.onload = () => { avatarEl.style.opacity = '1'; };
        if (avatarEl.complete) avatarEl.style.opacity = '1';

        overlayEl.style.opacity = '1';
    }, 200);
});
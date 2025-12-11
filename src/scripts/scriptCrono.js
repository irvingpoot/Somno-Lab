// src/scripts/scriptCrono.js

document.getElementById('submit-btn').addEventListener('click', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const edad = parseInt(document.getElementById('edad').value);
    const horaActual = document.getElementById('hora').value;
    const horaDeseada = document.getElementById('horaDespertar').value;

    // --- MODIFICACIÓN VISUAL 1: Modal con clases Tailwind ---
    function mostrarModal(mensaje) {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modal-message');
        
        modalMessage.textContent = mensaje;
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        const closeBtn = document.getElementById('close-btn');
        const closeAction = function() {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        };

        closeBtn.onclick = closeAction;

        window.onclick = function(event) {
            if (event.target === modal) {
                closeAction();
            }
        }

        const understandBtn = document.getElementById('close-modal-btn');
        if(understandBtn) understandBtn.onclick = closeAction;
    }

    if (!edad || !horaActual || !horaDeseada) {
        mostrarModal("Por favor, rellene todos los campos");
        return;
    }
    function verificarMinutos(hora) {
        const [hh, mm] = hora.split(':').map(Number);
        return mm === 0 || mm === 30;
    }

    if (!verificarMinutos(horaActual) || !verificarMinutos(horaDeseada)) {
        mostrarModal("Las horas deben tener minutos en intervalos de 30 (00 o 30).");
        return;
    }

    // ---------------------------------------------------------
    //  LÓGICA DE CÁLCULO INTACTA (NO TOCAR)
    // ---------------------------------------------------------
    const rangosDeSueño = {
        '0-3': { idealMin: 14, idealMax: 17 },
        '4-11': { idealMin: 12, idealMax: 15 },
        '1-2': { idealMin: 11, idealMax: 14 },
        '3-5': { idealMin: 10, idealMax: 13 },
        '6-13': { idealMin: 9, idealMax: 11 },
        '14-17': { idealMin: 8, idealMax: 10 },
        '18-25': { idealMin: 7, idealMax: 9 },
        '26-64': { idealMin: 7, idealMax: 9 },
        '65+': { idealMin: 7, idealMax: 8 }
    };

    function obtenerRangoDeSueño(edad) {
        if (edad <= 3) return rangosDeSueño['0-3'];
        if (edad <= 11) return rangosDeSueño['4-11'];
        if (edad <= 2) return rangosDeSueño['1-2'];
        if (edad <= 5) return rangosDeSueño['3-5'];
        if (edad <= 13) return rangosDeSueño['6-13'];
        if (edad <= 17) return rangosDeSueño['14-17'];
        if (edad <= 25) return rangosDeSueño['18-25'];
        if (edad <= 64) return rangosDeSueño['26-64'];
        return rangosDeSueño['65+'];
    }

    const { idealMin, idealMax } = obtenerRangoDeSueño(edad);
    const horasIdeales = (idealMin + idealMax) / 2;

    function convertirHoraAMinutos(hora) {
        const [hh, mm] = hora.split(':').map(Number);
        return hh * 60 + mm;
    }

    function convertirMinutosAHora(minutos) {
        let horas = Math.floor(minutos / 60) % 24;
        const minutosRestantes = minutos % 60;
        const ampm = horas >= 12 ? 'PM' : 'AM';
        horas = horas % 12 || 12;
        return `${horas}:${minutosRestantes.toString().padStart(2, '0')} ${ampm}`;
    }

    const minutosActuales = convertirHoraAMinutos(horaActual);
    const minutosDeseados = convertirHoraAMinutos(horaDeseada);

    let dias = [];
    let tituloTexto = "";

    // Cálculo de Días
    if (minutosDeseados > minutosActuales) {
        // Despertar más tarde
        const minutosDormirActual = (minutosActuales - horasIdeales * 60 + 1440) % 1440;
        const minutosDormirDeseado = (minutosDeseados - horasIdeales * 60 + 1440) % 1440;
        
        let dia = 1;
        let minutosAjuste = minutosDormirActual;

        while (minutosAjuste !== minutosDormirDeseado) {
            dias.push({ dia: `Día ${dia}`, hora: convertirMinutosAHora(minutosAjuste) });
            if (minutosAjuste < minutosDormirDeseado) {
                minutosAjuste = (minutosAjuste + 30) % 1440;
            } else {
                minutosAjuste = (minutosAjuste + 30) % 1440;
            }
            dia++;
        }
        dias.push({ dia: `Día ${dia}`, hora: convertirMinutosAHora(minutosDormirDeseado) });
        tituloTexto = 'Usted debe irse a dormir a las siguientes horas:';

    } else {
        let dia = 1;
        let minutosAjuste = minutosActuales;

        while (minutosAjuste > minutosDeseados) {
            dias.push({ dia: `Día ${dia}`, hora: convertirMinutosAHora(minutosAjuste) });
            minutosAjuste = (minutosAjuste - 30 + 1440) % 1440;
            dia++;
        }
        dias.push({ dia: `Día ${dia}`, hora: convertirMinutosAHora(minutosDeseados) });
        tituloTexto = 'Usted debe levantarse a las siguientes horas:';
    }

    // ---------------------------------------------------------
    // --- MODIFICACIÓN VISUAL ---
    // ---------------------------------------------------------
    
    const tituloCrono = document.getElementById('titulo-crono');
    tituloCrono.innerHTML = tituloTexto;

    const cronoContainer = document.querySelector('.crono');
    cronoContainer.innerHTML = ''; 

    dias.forEach(item => {
        const card = document.createElement('div');
        
        card.className = `
            bg-white 
            rounded-3xl 
            p-6 
            shadow-[0_10px_20px_rgba(0,0,0,0.05)] 
            border border-gray-100 
            flex flex-col items-center justify-center 
            transition-all duration-300 
            hover:-translate-y-1 hover:shadow-lg hover:border-blue-100
            group
            cursor-default
        `;
        
        card.innerHTML = `
            <div class="text-[#3F74FB] font-bold text-lg mb-2 bg-blue-50 px-4 py-1 rounded-full group-hover:bg-[#3F74FB] group-hover:text-white transition-colors duration-300">
                ${item.dia}
            </div>
            <div class="text-gray-700 font-semibold text-2xl font-mono tracking-tight">
                ${item.hora}
            </div>
        `;
        
        cronoContainer.appendChild(card);
    });
});
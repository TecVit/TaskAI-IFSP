(() => {
    // Evitar múltiplas execuções
    if (window.taskAIInitialized) return;
    window.taskAIInitialized = true;

    // Estilos básicos
    const style = document.createElement('style');
    style.textContent = `
        .taskai-popup {
            position: fixed;
            top: 25px;
            right: 25px;
            width: 400px;
            max-height: 90vh;
            overflow-y: auto;
            background: #f4f4f5;
            border: 2px solid #d4d4d8;
            border-radius: 8px;
            z-index: 9999;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
            font-family: sans-serif;
            padding: 15px;
        }
        .taskai-popup h2 {
            margin-bottom: 10px;
            font-size: 18px;
            color: #379936;
        }
        .taskai-popup .item {
            background: #e4e4e7c2;
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .taskai-popup .item img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 4px;
        }
        .taskai-popup .item a {
            color: #1d4ed8;
            text-decoration: none;
        }
        .taskai-popup .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    // Container
    const popup = document.createElement('div');
    popup.className = 'taskai-popup';
    popup.innerHTML = `
        <div class="close-btn">X</div>
        <h2>Disciplinas</h2>
        <div class="list">Carregando...</div>
    `;
    document.body.appendChild(popup);

    // Fechar
    popup.querySelector('.close-btn').onclick = () => popup.remove();

    // Função para adicionar conteúdo
    const addContentDisciplines = (disciplinesList) => {
        const list = popup.querySelector('.list');
        list.innerHTML = '';
        disciplinesList.forEach(d => {
            const item = document.createElement('div');
            item.className = 'item';
            item.innerHTML = `
                <img src="${d.courseimage}" />
                <div>
                    <div><strong>${d.fullname}</strong></div>
                    <a href="${d.viewurl}" target="_blank">Mostrar tarefas</a>
                </div>
            `;
            list.appendChild(item);
        });
    };

    // Buscar a sesskey do Moodle
    const link = document.querySelector('a[href*="logout.php?sesskey="]');
    const sesskey = link ? new URL(link.href).searchParams.get('sesskey') : null;

    if (sesskey) {
        fetch(`https://moodle.arq.ifsp.edu.br/lib/ajax/service.php?sesskey=${sesskey}&info=core_course_get_enrolled_courses_by_timeline_classification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([{
                index: 0,
                methodname: 'core_course_get_enrolled_courses_by_timeline_classification',
                args: {
                    classification: 'all',
                    limit: 0,
                    offset: 0,
                    sort: 'fullname',
                    customfieldname: '',
                    customfieldvalue: ''
                }
            }])
        })
        .then(res => res.json())
        .then(data => {
            const courses = data[0].data.courses;
            addContentDisciplines(courses);
        })
        .catch(err => {
            console.error(err);
            popup.querySelector('.list').textContent = 'Erro ao carregar disciplinas.';
        });
    } else {
        popup.querySelector('.list').textContent = 'Sesskey não encontrada.';
    }
})();
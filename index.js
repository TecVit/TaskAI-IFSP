(() => {
    // Evita múltiplas execuções
    if (window.taskAIInitialized) return;
    window.taskAIInitialized = true;

    // 1. CSS via <style>
    const style = document.createElement('style');
    style.textContent = `
        .hidden {
  /* display: none !important; */
  opacity: 0 !important;
  z-index: -10 !important;
} .flex {
  display: flex !important;
  opacity: 1 !important;
  z-index: 900 !important;
} .none {
  display: none !important;
}

:root {
  --black: #232323;
  --white: #fafafa;
  --gray: #bcbcbc;
  --green: #379936;
  --blue: #1d4ed8;
  --lightBlue: #0ea5e9;

  /* Neutral */
  --one: #0a0a0a; /* 950 */
  --two: #171717; /* 900 */
  --three: #262626; /* 800 */
  --four: #404040; /* 700 */
  --five: #525252; /* 600 */
  --six: #737373; /* 500 */
  --seven: #a1a1aa; /* 400 */
  --eight: #d4d4d8; /* 300 */
  --nine: #e4e4e7c2; /* 200 */
  --ten: #f4f4f5; /* 100 */
  --eleven: #fafafa; /* 50 */
}

* {
  margin: 0px;
  border: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

body {
  width: 100%;
  background: var(--eleven);
  color: var(--one);
}

/* BTN POPUP */
.btn-popup {
  width: 90px;
  height: 90px;
  position: fixed;
  bottom: 25px;
  right: 25px;
  overflow: hidden;
  border-radius: 50%;
  transition: all .1s ease-in-out;
  cursor: pointer;
  z-index: 1000 !important;
} .btn-popup:hover {
  box-shadow: 0px 1px 8px var(--gray);
}

.btn-popup:hover img {
  scale: 1.075;
}

.btn-popup img {
  width: 100%;
  transition: all .1s ease-in-out;
}

/* Container */
.container-script {
  width: 100%;
  max-width: 500px;
  height: calc(95vh - 25px);
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  background: var(--ten);
  border: 2px solid var(--eight);
  position: fixed;
  top: 25px;
  right: 25px;
  transition: all .15s ease-in-out;
  z-index: 999 !important;
}

.container-script .bar-top {
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid var(--eight);
  padding: 10px;
}

.container-script .bar-top img {
  width: 60px;
  height: 60px;
}

.container-script .bar-top h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0px 0px 0px 4px;
  color: var(--green);
}

.container-script .bar-top .btn-close {
  width: auto;
  height: auto;
  background: transparent;
  margin: 0px 10px 0px auto;
}

.container-script .bar-top .btn-close .icon {
  font-size: 40px;
  color: var(--six);
  cursor: pointer;
  transition: all .1s ease-in-out;
} .container-script .bar-top .btn-close .icon:hover {
  color: var(--green);
}

.container-script .content {
  width: 100%;
  height: auto;
  max-height: calc(100% - 90px);
  padding: 22.5px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}

.container-script .content h1 {
  width: 100%;
  font-size: 20px;
  font-weight: 500;
  color: var(--five);
  margin: 0px 0px 12px 0px;
}

.container-script .content h2 {
  width: 100%;
  font-size: 17px;
  font-weight: 600;
  color: var(--five);
  margin: 5px 0px;
}

/* LIST */
.container-script .content .list {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.container-script .content .list .item {
  width: 100%;
  height: auto;
  border-radius: 6px;
  background: var(--nine);
  border: 2px solid var(--eight);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
}

.container-script .content .list .item img {
  min-width: 55px;
  max-width: 55px;
  min-height: 55px;
  max-height: 55px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0px 12.5px 0px 0px;
}

.container-script .content .list .item .text {
  width: auto;
  display: flex;
  flex-direction: column;
}

.container-script .content .list .item .text h1 {
  font-size: 14px;
  font-weight: 600;
  margin: 0px 0px 2px 0px;
  color: var(--five);
}


.container-script .content .list .item .text a {
  width: auto;
  font-size: 14px;
  font-weight: 600;
  color: var(--blue);
  transition: all .1s ease-in-out;
} .container-script .content .list .item .text a:hover,
.container-script .content .list .item .text a:focus {
  color: var(--lightBlue);
}
    `;
    document.head.appendChild(style);

    // 2. HTML via innerHTML
    const html = `
        <div onclick="changeStatusPopup()" class="btn-popup">
            <img src="./assets/images/TaskAI.jpg" alt="Logo TaskAI - IFSP">
        </div>
        
        <main class="container-script hidden">
            
            <div class="bar-top">
                <img src="./assets/images/TaskAI.png" alt="Logo TaskAI - IFSP">
                <h1>TaskAI - IFSP</h1>

                <button onclick="changeStatusPopup()" class="btn-close">
                    <ion-icon class="icon" name="close-outline"></ion-icon>
                </button>
            </div>

            <div class="content">

                <h1 class="subtitle">Disciplinas</h1>

                <div class="list">
                    
                    <!-- conteúdo em Script -->
                    <h2>Nenhuma disciplina encontrada</h2>

                </div>

            </div>

        </main>

    `;
    document.body.insertAdjacentHTML('beforeend', html);

    // 3. Script original exatamente como você escreveu
    // Functions Popup
    var statusPopup = false;

    const changeStatusPopup = () => {
        statusPopup = !statusPopup;

        const container = document.querySelector(".container-script");
        const btnPopup = document.querySelector(".btn-popup");

        if (statusPopup) {
            container.classList.remove("hidden");
            btnPopup.classList.add("none");
        } else {
            btnPopup.classList.remove("none");
            container.classList.add("hidden");
        }
    }
    window.changeStatusPopup = changeStatusPopup;

    // List Items => Disciplines
    const addContentDisciplines = (disciplinesList) => {
        const list = document.querySelector('.container-script .content .list');
        const itemsHTML = disciplinesList.map((discipline) => `
            <div class="item">
                <img src="${discipline.courseimage}">
                <div class="text">
                    <h1>${discipline.fullname}</h1>
                    <a onclick="getTaskOfDiscipline(${discipline.id})">Mostrar tarefas</a>
                </div>
            </div>
        `);

        list.innerHTML = itemsHTML.join('');
    }
    window.addContentDisciplines = addContentDisciplines;

    // List Items => Tasks
    const addContentTasks = (tasksList) => {
        const subtitle = document.querySelector('.subtitle');
        const list = document.querySelector('.container-script .content .list');
        const itemsHTML = tasksList.map((discipline) => `
            <div class="item">
                <div class="text">
                    <h1>${discipline.fullname}</h1>
                    <a href="${discipline.viewurl}">Mostrar tarefas</a>
                </div>
            </div>
        `);
        
        subtitle.textContent = "Tarefas";
        list.innerHTML = itemsHTML.join('');
    }
    window.addContentTasks = addContentTasks;

    // Coletar as tarefas da disciplina
    const getTaskOfDiscipline = async (id) => {
        const link = document.querySelector('a[href*="logout.php?sesskey="]');
        const sesskey = link ? new URL(link.href).searchParams.get('sesskey') : null;

        if (sesskey) {
            const response = await fetch("https://moodle.arq.ifsp.edu.br/lib/ajax/service.php?sesskey=UIy6dQHPt9&info=core_courseformat_get_state", {
                credentials: "include",
                headers: {
                    "Accept": "application/json, text/javascript, */*; q=0.01",
                    "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([{
                    index: 0,
                    methodname: "core_courseformat_get_state",
                    args: {
                        courseid: id
                    }
                }]),
                method: "POST",
                mode: "cors"
            });

            const json = await response.json();
            const data = json[0].data;

            // Crie um mapa de cm por sectionid
            const cmBySection = {};
            data.cm.forEach(cm => {
            if (!cmBySection[cm.sectionid]) {
                cmBySection[cm.sectionid] = [];
            }
            cmBySection[cm.sectionid].push({
                id: cm.id,
                name: cm.name,
                url: cm.url
            });
            });

            // Monte as seções formatadas
            const formattedSections = data.section.map(section => ({
                id: section.id,
                title: section.title,
                cm: cmBySection[section.id] || []
            }));

            console.log(formattedSections);
        } else {
            console.error('Sesskey não encontrado');
        }
    };
    window.getTaskOfDiscipline = getTaskOfDiscipline;
    
    // Coletar disciplinas do estudante
    const getDisciplinesOfStudent = () => {
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
            .then(r => {
                const data = r.json();
                const disciplines = data[0].data.courses;
                addContentDisciplines(disciplines);
                // console.log(data);
            })
            .then(console.log)
            .catch(console.error);
        } else {
            console.error('Sesskey não encontrado');
        }
    };
    window.getDisciplinesOfStudent = getDisciplinesOfStudent;

    // Começo do Script
    getDisciplinesOfStudent();

    // Outras funcionalidades
    async function baixarPDFComoBase64(url) {
        const response = await fetch(url);
        const blob = await response.blob();

        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
    window.baixarPDFComoBase64 = baixarPDFComoBase64;
})();
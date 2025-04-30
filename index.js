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
            top: 25px;
            right: 25px;
            overflow: hidden;
            border-radius: 50%;
            transition: all .1s ease-in-out;
            cursor: pointer;
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
            height: 95vh;
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
            <img src="https://raw.githubusercontent.com/TecVit/TaskAI-IFSP/refs/heads/main/assets/images/TaskAI.jpg" alt="Logo TaskAI - IFSP">
        </div>
        
        <main class="container-script ">
            
            <div class="bar-top">
                <img src="https://raw.githubusercontent.com/TecVit/TaskAI-IFSP/refs/heads/main/assets/images/TaskAI.png" alt="Logo TaskAI - IFSP">
                <h1>TaskAI - IFSP</h1>

                <button onclick="changeStatusPopup()" class="btn-close">
                    <ion-icon class="icon" name="close-outline"></ion-icon>
                </button>
            </div>

            <div class="content">

                <h1>Disciplinas</h1>

                <div class="list">
                    
                    <!-- conteúdo em Script -->

                </div>

            </div>

        </main>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    // 3. Script original exatamente como você escreveu
    var statusPopup = false;

    const changeStatusPopup = () => {
        statusPopup = !statusPopup;

        const container = document.querySelector(".container-script");
        const btnPopup = document.querySelector(".btn-popup");

        if (statusPopup) {
            container.classList.remove("hidden");
            btnPopup.classList.add("hidden");
        } else {
            container.classList.add("hidden");
            btnPopup.classList.remove("hidden");
        }
    }
    window.changeStatusPopup = changeStatusPopup;

    const addContentDisciplines = (disciplinesList) => {
        const list = document.querySelector('.container-script .content .list');
        const itemsHTML = disciplinesList.map((discipline) => `
            <div class="item">
                <img src="${discipline.courseimage}">
                <div class="text">
                    <h1>${discipline.fullname}</h1>
                    <a href="${discipline.viewurl}">Mostrar tarefas</a>
                </div>
            </div>
        `);
        list.innerHTML = itemsHTML.join('');
    }
    window.addContentDisciplines = addContentDisciplines;

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
            .then(r => r.json())
            .then(data => {
                const disciplines = data[0].data.courses;
                addContentDisciplines(disciplines);
                console.log(data);
            })
            .catch(console.error);
        } else {
            console.error('Sesskey não encontrado');
        }
    };
    window.getDisciplinesOfStudent = getDisciplinesOfStudent;

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

    baixarPDFComoBase64("https://moodle.arq.ifsp.edu.br/mod/resource/view.php?id=107708").then(res => console.log(res));
    window.baixarPDFComoBase64 = baixarPDFComoBase64;
})();
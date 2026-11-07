document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('.projects-flex-container');
    const addProjectBtn = document.getElementById('add-project-btn');
    const deleteProjectBtn = document.getElementById('delete-project-btn');
    const toggleProjectsBtn = document.getElementById('toggle-projects-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    if (!projectsContainer) {
        console.error('Ошибка: Контейнер проектов .projects-flex-container не найден!');
        return;
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('theme-dark');
    }

    const savedProjectsHTML = localStorage.getItem('projectsHTML');
    if (savedProjectsHTML) {
        projectsContainer.innerHTML = savedProjectsHTML;
    }

    const isHidden = localStorage.getItem('projectsHidden') === 'true';
    if (isHidden) {
        projectsContainer.classList.add('hidden');
        if (toggleProjectsBtn) {
            toggleProjectsBtn.textContent = 'Развернуть проекты';
        }
    }

    function saveProjectsState() {
        localStorage.setItem('projectsHTML', projectsContainer.innerHTML);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('theme-dark');
            const isDark = document.body.classList.contains('theme-dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    } else {
        console.error('Ошибка: Кнопка переключения темы #theme-toggle-btn не найдена.');
    }

    if (toggleProjectsBtn) {
        toggleProjectsBtn.addEventListener('click', () => {
            projectsContainer.classList.toggle('hidden');
            const hidden = projectsContainer.classList.contains('hidden');
            toggleProjectsBtn.textContent = hidden ? 'Развернуть проекты' : 'Свернуть проекты';
            localStorage.setItem('projectsHidden', hidden);
        });
    } else {
        console.error('Ошибка: Кнопка сворачивания #toggle-projects-btn не найдена.');
    }

    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', () => {
            const titleInput = prompt('Введите название нового проекта:', 'Новый проект');
            if (titleInput === null) return;
            const descInput = prompt('Введите описание проекта:', 'Стек: JavaScript, DOM');
            if (descInput === null) return;

            const newCard = document.createElement('article');
            newCard.className = 'project-card';

            const iconImg = document.createElement('img');
            iconImg.src = 'images/IM1.png';
            iconImg.alt = 'Project';
            iconImg.width = 50;
            iconImg.height = 50;
            iconImg.className = 'project-icon';

            const infoDiv = document.createElement('div');
            infoDiv.className = 'card-info';

            const titleH3 = document.createElement('h3');
            titleH3.textContent = titleInput.trim() !== '' ? titleInput : 'Без названия';

            const descP = document.createElement('p');
            descP.textContent = descInput.trim() !== '' ? descInput : 'Без описания';

            const detailsBtn = document.createElement('button');
            detailsBtn.type = 'button';
            detailsBtn.textContent = 'Подробнее';

            infoDiv.appendChild(titleH3);
            infoDiv.appendChild(descP);
            infoDiv.appendChild(detailsBtn);

            newCard.appendChild(iconImg);
            newCard.appendChild(infoDiv);

            projectsContainer.appendChild(newCard);

            saveProjectsState();
        });
    } else {
        console.error('Ошибка: Кнопка добавления #add-project-btn не найдена.');
    }

    if (deleteProjectBtn) {
        deleteProjectBtn.addEventListener('click', () => {
            const cards = projectsContainer.querySelectorAll('.project-card');
            
            if (cards.length > 0) {
                const lastCard = cards[cards.length - 1];
                lastCard.remove();
                saveProjectsState();
            } else {
                console.log('Нет проектов для удаления');
                alert('Список пуст');
            }
        });
    } else {
        console.error('Ошибка: Кнопка удаления #delete-project-btn не найдена.');
    }
});
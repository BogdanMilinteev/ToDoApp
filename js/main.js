const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')


//Сохранение данных и разметки страницы в дериктории браузера
// if (localStorage.getItem('tasksHTML')) {
//     tasksList.innerHTML = localStorage.getItem('tasksHTML')

// }


let tasks = []

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task) => renderTask(task))
}

checkEmtyList()

//Добваление задачи
form.addEventListener('submit', addTask)

//Удаление задачи
tasksList.addEventListener('click', deleteTask)

//Отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask)


//Функции
//Функции
//Функции
function addTask(event) {
    event.preventDefault()        //отменяет постоянную перезагрузку при событии 

    //Достаем текст задачи из поля ввода
    const taskText = taskInput.value

    //Описываем задачу в виде обьекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }


    //Добавляем задачу в массив с задачами
    tasks.push(newTask)
    // console.log(newTask)


    renderTask(newTask)

    //Очищаем поле воода и возвращаем на него фокус

    taskInput.value = ''
    taskInput.focus()


    checkEmtyList()
    saveToLacalStorage()
    // saveHYMLtoLS()
}


function deleteTask(event) {
    //Проверяем если клик был не по кнопке "Удалить задачу"
    if (event.target.dataset.action !== 'delete') return

    //Проверяем что клик был по кнопке "Удалить задачу"
    const parenNode = event.target.closest('.list-group-item')

    //Удаляем задачу из данных, определяем по ID 
    const id = Number(parenNode.id)


    //Находим индекс задачи в массиве
    // const index = tasks.findIndex((task) => task.id === id)

    //Удаляем задачу из массива 
    // tasks.splice(index,1)

    //Удаляем задачу чурез фильтрацию массива
    tasks = tasks.filter((task) => task.id !== id)


    //Удаляем задачу из разметки 
    parenNode.remove()

    checkEmtyList()
    saveToLacalStorage()
    // saveHYMLtoLS()
}


function doneTask(event) {
    //Проверяем если клик был не по кнопке "Завершить задачу"
    if (event.target.dataset.action !== 'done') return

    //Проверяем что клик был по кнопке "Завершить задачу"
    const parenNode = event.target.closest('.list-group-item')

    //Определяем id задачи
    const id = Number(parenNode.id)
    const task = tasks.find((task) => task.id === id)
    task.done = !task.done

    const taskTitle = parenNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')

    checkEmtyList()
    saveToLacalStorage()
}


function checkEmtyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
        <li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
        </li>`
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }
    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null
    }
}


// function saveHYMLtoLS() {
//     localStorage.setItem('tasksHTML', tasksList.innerHTML)
// }

function saveToLacalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


function renderTask(task) {
    const cssClass = task.done ? "task-title task-title--done " : "task-title"
    //Формируем разметку для новой задачи
    const taskHTML =
        `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>`
    tasksList.insertAdjacentHTML('beforeend', taskHTML)
}
var screen = document.querySelector('#screen');
var btn = document.querySelectorAll('.btn');
let historyContent = document.getElementById('history-content');


function calculation(v) {
    let result;
    try {
        result = eval(v); 
    } catch (e) {
        result = "Error";
    }

    let para = document.createElement('p');
    para.innerHTML = v + " = " + result;

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        para.remove();
        saveToLocalStorage(); 
    });

    para.appendChild(deleteBtn);
    historyContent.appendChild(para);

    saveToLocalStorage(); 

    return result;
}


for (item of btn) {
    item.addEventListener('click', (e) => {
        let btntext = e.target.innerText;
        screen.value += btntext;
    });
}


function backspc() {
    screen.value = screen.value.substr(0, screen.value.length - 1);
}


function clearScreen() {
    screen.value = '';
}


function clearHistory() {
    historyContent.innerHTML = ''; 
    saveToLocalStorage(); 
}


function saveToLocalStorage() {
    localStorage.setItem('history', historyContent.innerHTML);
}

function loadFromLocalStorage() {
    let savedHistory = localStorage.getItem('history');
    if (savedHistory) {
        historyContent.innerHTML = savedHistory;

        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.parentElement.remove();
                saveToLocalStorage(); 
            });
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
});

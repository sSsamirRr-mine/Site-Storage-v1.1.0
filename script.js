'use strict';

let name = document.querySelector('#name');
let site = document.querySelector('#site');
let add = document.querySelector('#add');
let tBody = document.querySelector('tbody');
let search = document.querySelector('#search');
let sort = document.querySelector('#sort');

let infos = JSON.parse(localStorage.getItem('data')) || [];

function saveToLocalStorage() {
    localStorage.setItem('data', JSON.stringify(infos));
}

add.addEventListener('click', () => {
    if (name.value && site.value) {
        infos.push({ name: name.value, site: site.value });
        saveToLocalStorage();
        name.value = '';
        site.value = '';
        renderData();
    } else {
        alert('Заполните оба поля!');
    }
});

function deleteInfo(index) {
    infos.splice(index, 1);
    saveToLocalStorage();
    renderData();
}

function editInfo(index) {
    let newName = prompt('Введите новое имя:', infos[index].name);
    let newSite = prompt('Введите новый сайт:', infos[index].site);

    if (newName && newSite) {
        infos[index] = { name: newName, site: newSite };
        saveToLocalStorage();
        renderData();
    } else {
        alert('Имя и сайт не могут быть пустыми!');
    }
}

search.addEventListener('input', () => {
    renderData();
});

sort.addEventListener('change', () => {
    renderData();
});

function filterAndSortData() {
    let searchTerm = search.value.toLowerCase();
    let sortedData = [...infos];

    sortedData = sortedData.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.site.toLowerCase().includes(searchTerm)
    );

    if (sort.value === 'name') {
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort.value === 'site') {
        sortedData.sort((a, b) => a.site.localeCompare(b.site));
    } else if (sort.value === 'num') {
        sortedData = sortedData.map((item, index) => ({ ...item, index })).sort((a, b) => a.index - b.index);
    }

    return sortedData;
}

function renderData() {
    tBody.innerHTML = '';

    filterAndSortData().forEach((item, index) => {
        renderInfo(item, index);
    });
}

function renderInfo(item, index) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td><a href="${item.site}" target="_blank">${item.site.substring(0, 20)}</a></td>
        <td>
            <button onclick="editInfo(${index})">✏️</button>
            <button onclick="deleteInfo(${index})">🗑️</button>
        </td>
    `;

    tBody.appendChild(tr);
}

renderData();

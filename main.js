const dinos = [{
    id: 'dino1',
    name: 'Rex',
    type: 'T Rex',
    age: 100,
    owner: 'Zoe',
    adventures: [],
    health: 100,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61fC04pumjL._AC_SL1001_.jpg'
    },
    {
    id: 'dino2',
    name: 'Birdy',
    type: 'Bird Thing',
    age: 100,
    owner: 'Luke',
    adventures: [],
    health: 100,
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/4/2019/07/dino_dps_03-7b541f7.jpg?quality=45&resize=960,413'
    },
    {
    id: 'dino3',
    name: 'William',
    type: 'Not Sure',
    age: 100,
    owner: 'Mary',
    adventures: [],
    health: 100,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR241PyLQR8L218X_Cv6Y41hqC1twa871J5sYKXn8cfodBa7cmv'
    }
];

const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

const closeSingleViewEvent = () => {
    printToDom('single-view', '');
    printDinos(dinos);
};

const viewSingleDino = () => {
    let domString = '';
    domString += '<button id="close-single-view" class="btn btn-outline-dark single-dino"><i class="fas fa-times-circle"></i></button>'
    printToDom('kennel', '');
    printToDom('single-view', domString);
    document.getElementById('close-single-view').addEventListener('click', closeSingleViewEvent);    
}

const singleDinoAddEvents = () => {
    const dinoViewButtons = document.getElementsByClassName('single-dino');
    for (let i = 0; i < dinoViewButtons.length; i++) {
        dinoViewButtons[i].addEventListener('click', viewSingleDino);
    }
}


const printDinos = (dinoArray) => {
    let domString = '';
    for (let i = 0; i < dinoArray.length; i++) {
        domString += '<div class="col-4">';
        domString += '<div class="card">';
        domString += `<img class="card-img-top" src="${dinoArray[i].imageUrl}" alt="Card">`;
        domString += '<div class="card-body">';
        domString += `<h5 class="card-title">${dinoArray[i].name}</h5>`;
        domString += `<p class="card-text">Health: ${dinoArray[i].health}</p>`;
        domString += '<button class="btn btn-outline-dark single-dino"><i class="fas fa-eye"></i></button>'
        domString += '</div>';
        domString += '</div>';
        domString += '</div>';
    }
    printToDom('kennel', domString);
    singleDinoAddEvents();
};

const newDino = (e) => {
    e.preventDefault();
    const brandnewDino = {
        id: `dino${dinos.length + 1}`,
        name: document.getElementById('dino-name').value,
        type: document.getElementById('dino-type').value,
        age: document.getElementById('dino-age').value,
        owner: document.getElementById('dino-owner').value,
        adventures: [],
        health: 100,
        imageUrl: document.getElementById('dino-image').value        
    }
    dinos.push(brandnewDino);
    document.getElementById('new-dino-form').reset();
    document.getElementById('collapseOne').classList.remove('show');
    printDinos(dinos);
};
const init = () => {
    document.getElementById('submit-new-dino').addEventListener('click', newDino);
    printDinos(dinos);
};



init();
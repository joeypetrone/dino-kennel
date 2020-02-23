// Dinos Array
const dinos = [{
    id: 'dino1',
    name: 'Rex',
    type: 'T Rex',
    age: 100,
    owner: 'Zoe',
    adventures: [],
    health: 30,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61fC04pumjL._AC_SL1001_.jpg'
    },
    {
    id: 'dino2',
    name: 'Birdy',
    type: 'Bird Thing',
    age: 1,
    owner: 'Luke',
    adventures: [],
    health: 30,
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/4/2019/07/dino_dps_03-7b541f7.jpg?quality=45&resize=960,413'
    },
    {
    id: 'dino3',
    name: 'William',
    type: 'Not Sure',
    age: 55,
    owner: 'Mary',
    adventures: [],
    health: 30,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR241PyLQR8L218X_Cv6Y41hqC1twa871J5sYKXn8cfodBa7cmv'
    }
];

// Print To DOM
const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

const viewSingleDino = (e) => {
    const dinoId = e.target.closest('.card').id;
    const selectedDino = dinos.find((x) => dinoId === x.id);
    let domString = '';
    domString += '<div class="container rounded bg-light pt-2 pb-3">';
    domString += '   <button id="close-single-view" class="btn btn-outline-dark single-dino float-right"><i class="fas fa-times-circle"></i></button>';
    domString += '   <div class="row">';
    domString += '       <div class="col-6">';
    domString += `               <img class="img-fluid" src="${selectedDino.imageUrl}" alt=""/>`;
    domString += '       </div>';
    domString += '       <div class="col-6">';
    domString += `           <h2>${selectedDino.name}</h2>`;
    domString += `           <p>Type: ${selectedDino.type}</p>`;
    domString += `           <p>Age: ${selectedDino.age}</p>`;
    domString += `           <p>Owner: ${selectedDino.owner}</p>`;
    domString += '           <div class="progress">';
    domString += `              <div class="progress-bar bg-danger" role="progressbar" style="width: ${selectedDino.health}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="${selectedDino.health}"></div>`;
    domString += '           </div>';
    domString += '       </div>'
    domString += '   </div>'
    domString += '</div>';

    printToDom('kennel', '');
    printToDom('hospital', '');
    printToDom('single-view', domString);
    document.getElementById('close-single-view').addEventListener('click', closeSingleViewEvent);    
}

const singleDinoAddEvents = () => {
    const dinoViewButtons = document.getElementsByClassName('single-dino');
    for (let i = 0; i < dinoViewButtons.length; i++) {
        dinoViewButtons[i].addEventListener('click', viewSingleDino);
    }
};

const closeSingleViewEvent = () => {
    printToDom('single-view', '');
    printDinos(dinos);
    hospitalDomStringBuilder(hospitalDinos);
};

const dinoHealth = (e) => {
    const dinoId = e.target.closest('.card').id;
    const dinoPosition = dinos.findIndex((p) => p.id === dinoId); 
    if (dinos[dinoPosition].health < 100) {
        dinos[dinoPosition].health += 1;
        printDinos(dinos);
    }
};

const petEvents = () => {
    const dinoPetButtons = document.getElementsByClassName('dino-photo');
    for (let i = 0; i < dinoPetButtons.length; i++) {
        dinoPetButtons[i].addEventListener('mouseleave', dinoHealth);
    }
};

const deleteDinoEvent = (e) => {
    const dinoId = e.target.closest('.card').id;
    const dinoPosition = dinos.findIndex((p) => p.id === dinoId); 
    dinos.splice(dinoPosition, 1);
    printDinos(dinos);
};

const deleteEvents = () => {
    const dinoDeleteButtons = document.getElementsByClassName('delete-dino');
    for (let i = 0; i < dinoDeleteButtons.length; i++) {
        dinoDeleteButtons[i].addEventListener('click', deleteDinoEvent);
    }
};

const feedMe = (e) => {
    const dinoId = e.target.closest('.card').id;
    const dinoPosition = dinos.findIndex((p) => p.id === dinoId);
    if (dinos[dinoPosition].health + 10 < 100) {
        dinos[dinoPosition].health += 10;
        printDinos(dinos);
    } else if (dinos[dinoPosition].health < 100) {
        dinos[dinoPosition].health = 100;
        printDinos(dinos); 
    }
};

const feedEvents = () => {
    const dinoFeedButtons = document.getElementsByClassName('feed-button');
    for (let i = 0; i < dinoFeedButtons.length; i++) {
        dinoFeedButtons[i].addEventListener('click', feedMe);
    }
};

const printDinos = (dinoArray) => {
    let domString = '';
    for (let i = 0; i < dinoArray.length; i++) {
        domString += '<div class="col-4 dino-card mb-3">';
        domString += `  <div id="${dinoArray[i].id}" class="card">`;
        domString += `      <img class="card-img-top dino-photo" src="${dinoArray[i].imageUrl}" alt="Dino Card">`;
        domString += '      <div class="card-body text-center">';
        domString += `          <h5 class="card-title">${dinoArray[i].name}</h5>`;
        domString += '          <div class="progress m-3">';
        domString += `              <div class="progress-bar bg-danger" role="progressbar" style="width: ${dinoArray[i].health}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="${dinoArray[i].health}"></div>`;
        domString += '          </div>';
        domString += '          <button class="btn btn-outline-dark feed-button"><i class="fas fa-drumstick-bite"></i></button>'
        domString += '          <button class="btn btn-outline-dark single-dino"><i class="fas fa-eye"></i></button>'
        domString += '          <button class="btn btn-outline-danger delete-dino"><i class="fas fa-trash-alt"></i></button>'
        domString += '      </div>';
        domString += '  </div>';
        domString += '</div>';
    }
    printToDom('kennel', domString);
    singleDinoAddEvents();
    petEvents();
    deleteEvents();
    feedEvents();
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

const hospitalDomStringBuilder = (dino) => {
    let domString = '';

        domString += '<div class="card bg-white m-3">';
        domString += '<div class="card-header text-danger">';
        domString += '  <h2><i class="fas fa-plus-square p-1"></i>Hospital</h2>';
        domString += '</div>';
        domString += '<div class="d-flex justify-content-center flex-wrap">';

    for (let i = 0; i < dino.length; i++) {
        domString += '<div class="col-4 hospital-card mb-3 p-2">';
        domString += `  <div id="${dino[i].id}" class="card">`;
        domString += `      <img class="card-img-top dino-photo" src="${dino[i].imageUrl}" alt="Dino Card">`;
        domString += '      <div class="card-body text-center">';
        domString += `          <h5 class="card-title">${dino[i].name}</h5>`;
        domString += '          <div class="progress m-3">';
        domString += `              <div class="progress-bar bg-danger" role="progressbar" style="width: ${dino[i].health}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="${dino[i].health}"></div>`;
        domString += '          </div>';
        domString += '          <button class="btn btn-outline-dark feed-button"><i class="fas fa-drumstick-bite"></i></button>'
        domString += '          <button class="btn btn-outline-dark single-dino"><i class="fas fa-eye"></i></button>'
        domString += '          <button class="btn btn-outline-danger delete-dino"><i class="fas fa-trash-alt"></i></button>'
        domString += '      </div>';
        domString += '  </div>';
        domString += '</div>';
    }
        domString += '</div>';
        domString += '</div>';
    printToDom('hospital', domString);
    //singleDinoAddEvents();
    //petEvents();
    //deleteEvents();
    //feedEvents();
};

const findHospitalDinos = () => {
    let hospitalDinos = [];
    hospitalDinos = dinos.filter((x) => x.health < 40);
    hospitalDomStringBuilder(hospitalDinos);
};


const init = () => {
    document.getElementById('submit-new-dino').addEventListener('click', newDino);
    printDinos(dinos);
    findHospitalDinos();
};

init();
const containerMain = document.querySelector('#container-main-image');
const mainImage = document.querySelector('#main-image');
const containerMiniaturas = document.querySelector('#container-miniaturas');
const imgMiniatura = document.querySelector('#miniatura');
const url = document.querySelector('#url');
const btnAdd = document.querySelector('#btn-add');
const btnRemove = document.querySelector('#btn-remove');

const images = [
    {
        url: "https://images.unsplash.com/photo-1744649781353-8a1b70c37a77?q=80&w=1217&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        url: "https://images.unsplash.com/photo-1667684550725-71e60ab8368e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        url: "https://images.unsplash.com/photo-1738996727252-e67972e93c9f?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

const imagesSalvasJSON = localStorage.getItem('galeriaImagens');
let imagesGallery = [];
if (imagesSalvasJSON) {
    imagesGallery = JSON.parse(imagesSalvasJSON)
} else {
    imagesGallery = images;
}

if (imagesGallery.length > 0) {
    // Alterando a imagem principal dinamicamente. 
    mainImage.setAttribute('src', imagesGallery[0].url);
}

// Iterando sobre cada imagem do array images
for (let miniatura of imagesGallery) {
    console.log(miniatura.url);
    // Criando um novo elemnto img
    let imgCreate = document.createElement('img');
    // Setando o atributo src do novo elemento img
    imgCreate.setAttribute('src', miniatura.url);
    // Setando o atributo alt
    imgCreate.setAttribute('alt', 'Miniatura da galeria');
    // Adicionado a classe miniatura ao novo elemento img
    imgCreate.classList.add('miniatura');

    // Escutador de evento de clique na imagem
    imgCreate.addEventListener('click', (e) => {
        // console.log(e.target);
        // Cada imagem miniatura clicada 
        let urlClickMiniatura = e.target.src;
        // Setando o atributo src da imagem principal para a imagem miniatura clicada 
        mainImage.setAttribute('src', urlClickMiniatura)
    })

    // Adicionado o novo elemento imagem ao final do container miniaturas
    containerMiniaturas.appendChild(imgCreate);
}

// Evento de clique para add miniatura
btnAdd.addEventListener('click', (e) => {
    if (!url.value) return alert("Por favor preencha o campo URL!");

    addMiniatura();
});

    // Evento de clique para remover miniatura
    btnRemove.addEventListener('click', (e) => {
        removeMiniatura()
    });

// Função para dicionar miniatura 
function addMiniatura() {
    let urlValue = url.value;

    let newImg = document.createElement('img');
    newImg.setAttribute('src', urlValue);
    newImg.classList.add('miniatura');

    newImg.addEventListener('click', (e) => {
        let clickNewImg = e.target.src;
        mainImage.setAttribute('src', clickNewImg);
    });

    containerMiniaturas.appendChild(newImg);
    imagesGallery.push({ url: urlValue });
    const imagensAtualizadasJSON = JSON.stringify(imagesGallery);
    localStorage.setItem('galeriaImagens', imagensAtualizadasJSON);


    url.value = "";
};

// Função para remover a última imagem com o botão remover
function removeMiniatura() {
    // Verifica se o container miniaturas tem algum filho 
    if (containerMiniaturas.children.length > 0) {
        // Pega o último filho 
        let lastChild = containerMiniaturas.lastElementChild
        // Remove o último filho 
        containerMiniaturas.removeChild(lastChild);
        imagesGallery.pop();
        const imagensDeletadasJSON = JSON.stringify(imagesGallery);
        localStorage.setItem('galeriaImagens', imagensDeletadasJSON)
    }
}
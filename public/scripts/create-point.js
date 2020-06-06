
const urlGetUF      =  "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

function populateUFs()
{

    const ufSelect = document.querySelector("select[name=uf]");

    fetch(urlGetUF).then( (res) =>
    {
        return res.json().then( (states) => 
        {

            for (const state of states)
            {
               ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }

        });
    });

}

function getCities(event)
{

    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("[name=state]");
    const ufValue    = event.target.value;
    const url        = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    // armazena o nome do estado
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value           = event.target.options[indexOfSelectedState].text;

    // inicializa a cidade
    citySelect.innerHTML = "<option value>Selecione a cidade</option>";    
    citySelect.disable   = true;

    fetch(url).then( (res) =>
    {
        return res.json().then( (cities) => 
        {

            for (const city of cities)
            {
               citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;               
            }

            citySelect.disabled = false;

        });
    });

}


// evento a ser executado quando o usuário alterar a UF
// para pesquisar as cidades da UF selecionada
document.querySelector("select[name=uf]").addEventListener("change", getCities);


// preenche as UFs
populateUFs();


// itens de coleta
const itensToCollect = document.querySelectorAll(".items-grid li");
for (const item of itensToCollect)
{
    item.addEventListener("click", handleSelectedItem);
}

// array para armazenar os itens selecionados
let selectedItems = [];

const collectedItems = document.querySelector("input[name=items]");

function handleSelectedItem(event)
{   

    // referencia o objeto 'li' clicado
    const itemLi = event.target;

    // adiciona ou remove uma classe 
    itemLi.classList.toggle("selected");

    // armazena o id do item clicado na lista (dataset id)
    const itemId =  itemLi.dataset.id;    

    // verifica se o item clicado já está na lista de itens selecionados
    const alreadySelected = selectedItems.findIndex( (item) =>
    {
        // pesquisa o item no array
        const itemFound = (item == itemId);
        return itemFound;
    });

    // verifica se o item está na lista
    // o índice tem que ser diferente de -1
    if (alreadySelected >= 0)
    {

        // se tiver selecionado, remove da seleção

        // remove da seleção
        const filteredItens = selectedItems.filter( (item) =>
        {
            // quando a variável for 'false', o item é removido do array
            const itemIsDifferent = (item != itemId);
            return itemIsDifferent;
        });

        selectedItems = filteredItens;

    }
    else
    {

        // se não tiver selecionado, adiciona a seleção
        selectedItems.push(itemId);

    }

    console.log(selectedItems);

    // coloca a seleção no campo escondido no html
    collectedItems.value = selectedItems;

}


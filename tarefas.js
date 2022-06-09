class Tarefa {
    constructor(nome, categoria, realizada) {
        this.nome = nome;
        this.categoria = categoria;
        this.realizada = realizada;
    }

    adicionaNaPagina(containerEl) {
        const tarefaEl = document.createElement('li');
        const listaTarefasEl = document.querySelector('#lista-tarefas');

        tarefaEl.classList.add('item-tarefa');
        let classCategoria = `categoria-${containerEl.categoria}`
        tarefaEl.classList.add(classCategoria);
        tarefaEl.innerHTML = containerEl.nome;

        if (containerEl.realizada) {
            tarefaEl.classList.add('marcado');
        }else{
            //Faça com que um click em uma .item-tarefa coloque/remova a classe marcado e a
            //defina como realizada (true/false).
            tarefaEl.addEventListener('click', function () {
                if (!tarefaEl.classList.contains('retido-no-filtro'))
                    tarefaEl.classList.toggle('marcado');
            });
        }
        listaTarefasEl.appendChild(tarefaEl);
    }
};

let tarefas = [];
tarefas.push(new Tarefa("Comprar leite", "compras", false));
tarefas.push(new Tarefa("Escutar chimbinha", "lazer", true));
tarefas.push(new Tarefa("Trabalho WEB", "estudos", false));
tarefas.push(new Tarefa("Ver Série", "lazer", false));

// Adiciona tarefas na página
for (let tarefa of tarefas) {
    tarefa.adicionaNaPagina(tarefa);
}

// Adiciona evento de clique no botão de adicionar tarefa
const botaoIncluirTarefa = document.querySelector('#incluir-nova-tarefa');
const inputTarefa = document.querySelector('#nova-tarefa-nome');
const inputCategoria = document.querySelector('#nova-tarefa-categoria');

function eventoAdicionaTarefa() {
    if (inputTarefa.value != '') {
        const tarefa = new Tarefa(inputTarefa.value, inputCategoria.value, false);
        tarefa.adicionaNaPagina(tarefa);
        inputTarefa.value = '';
        inputTarefa.focus();        
    }
};

//ao pressionar enter, adicionar uma nova tarefa na página
inputTarefa.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {        
        eventoAdicionaTarefa();
    }
});

//ao clicar no botão #incluir-nova-tarefa, adicionar uma nova tarefa na página
botaoIncluirTarefa.addEventListener('click', function () {
    eventoAdicionaTarefa();
});

//ao usar select #filtro-de-categoria, filtrar por categoria
const filtroCategoria = document.querySelector('#filtro-de-categoria');
filtroCategoria.addEventListener('change', function () {
    const categoriaSelecionada = filtroCategoria.value;
    const tarefasEl = document.querySelectorAll('.item-tarefa');

    for (let tarefaEl of tarefasEl) {
        tarefaEl.classList.remove('retido-no-filtro');
    }

    tarefasEl.forEach(function (tarefaEl) {
        if (!tarefaEl.classList.contains(`categoria-${categoriaSelecionada}`)) {
            tarefaEl.classList.add('retido-no-filtro');
        }
        if (categoriaSelecionada == '') {
            tarefaEl.classList.remove('retido-no-filtro');
        }
    });
});
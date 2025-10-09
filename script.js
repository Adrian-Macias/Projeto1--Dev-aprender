const formularioTarefas = document.querySelector('#form-tarefas');
const campoTarefa = document.querySelector('#nova-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const botoesAdicionar = document.querySelectorAll('.formulario button[type="button"]');
const inputsListas = document.querySelectorAll('.formulario input[data-lista]');
const botaoAviso = document.querySelector('#botao-aviso');
const feedback = document.querySelector('#feedback');

function criarItemTarefa(texto) {
  const li = document.createElement('li');
  li.className = 'item-tarefa';

  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const spanTexto = document.createElement('span');
  spanTexto.textContent = texto;

  const botaoRemover = document.createElement('button');
  botaoRemover.type = 'button';
  botaoRemover.textContent = 'Remover';

  label.append(checkbox, spanTexto);
  li.append(label, botaoRemover);

  checkbox.addEventListener('change', () => {
    li.classList.toggle('concluida', checkbox.checked);
  });

  botaoRemover.addEventListener('click', () => {
    li.remove();
  });

  return li;
}

formularioTarefas.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valor = campoTarefa.value.trim();
  if (!valor) {
    campoTarefa.focus();
    return;
  }

  const item = criarItemTarefa(valor);
  listaTarefas.appendChild(item);
  campoTarefa.value = '';
  campoTarefa.focus();
});

botoesAdicionar.forEach((botao, indice) => {
  botao.addEventListener('click', () => {
    const input = inputsListas[indice];
    if (!input) return;

    const valor = input.value.trim();
    if (!valor) {
      input.focus();
      return;
    }

    const lista = document.querySelector(`#${input.dataset.lista}`);
    if (!lista) return;

    const li = document.createElement('li');
    li.textContent = valor;
    lista.appendChild(li);

    input.value = '';
    input.focus();
  });
});

if (botaoAviso) {
  botaoAviso.addEventListener('click', () => {
    const nome = document.querySelector('#nome').value.trim();
    const mensagem = document.querySelector('#mensagem').value.trim();

    if (!mensagem) {
      feedback.textContent = 'Escreva uma mensagem antes de copiar.';
      return;
    }

    const textoCopiado = nome ? `${nome}: ${mensagem}` : mensagem;

    navigator.clipboard
      .writeText(textoCopiado)
      .then(() => {
        feedback.textContent = 'Mensagem copiada! Compartilhe com o time.';
        setTimeout(() => {
          feedback.textContent = '';
        }, 2500);
      })
      .catch(() => {
        feedback.textContent = 'Não foi possível copiar automaticamente. Selecione e copie manualmente.';
      });
  });
}

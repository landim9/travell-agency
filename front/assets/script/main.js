const uri = "http://localhost:3000/destinos";
const tableBody = document.getElementById("dados");


  // READ - Destinos

  fetch(uri)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao obter destinos: " + res.status);
    }
    return res.json();
  })
  .then((destinos) => {
    const cardsContainer = document.getElementById("cards-container");

    destinos.forEach((cli) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <div class="modal oculto" id="prof${cli.id}">
        <div class="janela">
          <div class="modalCabecalho">
            <h3>Alterar dados do ponto turistico Id: ${cli.id}</h3>
            <button onclick="hideModal('prof${cli.id}')" >X</button>
          </div>
        <form action="" id="editar">

                  <div class="input-group">
                    <input required="" type="text" name="cidade" autocomplete="off" class="input" value="${cli.cidade}">
                    <label class="user-label">Cidade</label>
                  </div>

                  <div class="input-group">
                    <input required="" type="text" name="valor" autocomplete="off" class="input" value="${cli.valor}">
                    <label class="user-label">Valor</label>
                  </div>

                  <div class="input-group">
                    <input required="" type="text" name="data" autocomplete="off" class="input" value="${cli.data}">
                    <label class="user-label">Data</label>
                  </div>

                  <button type="submit" value="Alterar ponto turistico" onclick="update(${cli.id})">Alterar</button>
        </form>
        </div>
        </div>

        <div class="modal oculto" id="profs${cli.id}">
        <div class="janela">
          <div class="modalCabecalho">
            <h3>Excluir dados do professor Id: ${cli.id}</h3>
            <button onclick="hideModal('profs${cli.id}')" >X</button>
          </div>
          <form action="">
            <div class="deletes">
              <div class="delete">
                <label for="">Nome: ${cli.cidade}</label>
              </div>
            </div>
            <input type="hidden" name="id" value="${cli.id}">
            <button type="submit" onclick="del(${cli.id})">Deletar</button>
          </form>
        </div>
      </div>
      </div>

        <div class="card2" id="card-info">
        <h3>Destinos</h3>
        <p id="id">ID: ${cli.id}</p>
        <p>Cidade: ${cli.cidade}</p>
        <p>Valor: ${cli.valor}</p>
        <p>Data: ${cli.data}</p>

        <div class="deletes">
        <button onclick="showModal('prof${cli.id}')" style="width: fit-content;">Editar</button>
    
        <button onclick="showModal('profs${cli.id}')" style="width: fit-content;">Deletar</button>
         </div>

      `;
      cardsContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Erro ao obter destinos:", error);
    mensagens("Erro ao obter destinos!");
  });









// CREATE - destinos
const criarForm = document.getElementById("criar");

criarForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    cidade: criarForm.cidade.value,
    valor: criarForm.valor.value,
    data: criarForm.data.value,
    
  };

  fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao cadastrar cliente: " + res.status);
    }
    return res.json();
  })
  .then((res) => {
    mensagens("Cliente cadastrado com sucesso!");
    
  })
  .catch((error) => {
    console.error("Erro ao cadastrar cliente:", error);
    mensagens("Erro ao cadastrar cliente!");
  });
  window.location.reload();
});

// UPDATE - destinos
function update(id) {
  const nome = nome.value; // substitua com o valor do nome
  const valor = valor.value; // substitua com o valor do valor
  const date = data.value; // substitua com o valor da data

  const data = {
    nome: nome,
    valor: valor,
    date: date
  };

  fetch(`${uri}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao atualizar cliente: " + res.status);
    }
    return res;
  })
  .then(() => {
    mensagens("Cliente atualizado com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao atualizar cliente:", error);
    mensagens("Erro ao atualizar cliente!");
  });
  window.location.reload();
}

// DELETE - destinos
async function del(id) {
  try {
      const response = await fetch(`${uri}/${id}`, {
          method: 'DELETE'
      });
      console.dir(response)
      if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText} ao excluir o item com ID ${id}`);
      }
      loadItens();
  } catch (error) {
      console.error('Erro:', error);
  }
}







// OPEN MODAL 

function showModal(id) {
  let modal 

  document.getElementById(id).classList.remove("oculto");

  modal.querySelector('.janela').style.animation = 'openModal 0.5s forwards';

  setTimeout(() => {
      dialog.style.animation = 'none';
  }, 500);
}


function hideModal(id) {
  let modal

  document.getElementById(id).classList.add("oculto");

  modal.style.animation = 'closeModal 0.5s forwards';

   
  setTimeout(() => {
      dialog.style.animation = 'none';
      dialog.classList.add('oculto');
  }, 500);
}

const dialog = document.querySelectorAll('.dialog');

dialog.forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
        if(event.target.classList.contains('contactDialog')) {
            closeDialog('contact');
        }else if(event.target.classList.contains('matriculaDialog')) {
            closeDialog('matricula');
        }
    });
})


function openDialog(e) {

    let dialog

    if(e == 'contact') {
        dialog = document.querySelector('.contactDialog');
    }else {
        dialog = document.querySelector('.matriculaDialog');
    }

    dialog.classList.remove('hidden');

    dialog.querySelector('div').style.animation = 'openModal 0.5s forwards';

    setTimeout(() => {
        dialog.style.animation = 'none';
    }, 500);
}

function closeDialog(e) {
    let dialog

    if(e == 'contact') {
        dialog = document.querySelector('.contactDialog');
    } else {
        dialog = document.querySelector('.matriculaDialog');
    }

    dialog.style.animation = 'closeModal 0.5s forwards';


    setTimeout(() => {
        dialog.style.animation = 'none';
        dialog.classList.add('hidden');
    }, 500);
}
const uri = "http://localhost:3000/destinos";
const uriTuristico = "http://localhost:3000/pontosturisticos";
const msgs = document.getElementById('msgs');
const tableBody = document.getElementById("dados");


// READ - destinos
fetch(uriTuristico + '/' + id)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao obter destinos: " + res.status);
    }
    return res.json();
  })
  .then((turistico) => {
    turistico.forEach((cli) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${cli.id}</td>
      <td>${cli.id_destinos}</td>
      <td>${cli.nome}</td>
      <td>${cli.endereco}</td>
      <td>${cli.telefone}</td>
      <td>${cli.valor}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error("Erro ao obter destinos:", error);
    mensagens("Erro ao obter destinos!");
  });


// CARD
  fetch(uri)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao obter destinos: " + res.status);
    }
    return res.json();
  })
  .then((destinos) => {
    // Suponha que o card tenha id "card"
    const card = document.getElementById("card");

    // Suponha que os elementos no card tenham id correspondente aos campos dos destinos
    const idElement = document.getElementById("id");
    const cidadeElement = document.getElementById("cidade");
    const valorElement = document.getElementById("valor");
    const dataElement = document.getElementById("data");

    destinos.forEach((cli) => {
      // Atualiza o conteúdo dos elementos do card com os dados dos destinos
      idElement.innerHTML = ` ${cli.id}`;
      cidadeElement.innerHTML = ` ${cli.cidade}`;
      valorElement.innerHTML = ` ${cli.valor}`;
      dataElement.innerHTML = ` ${cli.data}`;
    });
  })
  .catch((error) => {
    console.error("Erro ao obter destinos:", error);
    mensagens("Erro ao obter destinos!");
  });


  // CREATE CARDS

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
      // Cria um elemento div para o card
      const card = document.createElement("div");
      card.classList.add("card");

      // Adiciona o conteúdo do card
      card.innerHTML = `
        <div class="card2" id="card-info">
        <h3>Destinos</h3>
        <p>ID: ${cli.id}</p>
        <p>Cidade: ${cli.cidade}</p>
        <p>Valor: ${cli.valor}</p>
        <p>Data: ${cli.data}</p>
        <div class="card-buttons">
        <button onclick="openDialog('contact')"><ion-icon class="icon" name="trash-outline"></ion-icon></button>
        <button onclick="openDialog('contact')"><ion-icon class="icon" name="create-outline"></ion-icon></button>
        </div>
        </div>
      `;

      // Adiciona o card ao container de cards
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
    id: criarForm.id.valueOf,
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
  .then((_res) => {
    mensagens("Cliente cadastrado com sucesso!");
    window.location.reload();
  })
  .catch((error) => {
    console.error("Erro ao cadastrar cliente:", error);
    mensagens("Erro ao cadastrar cliente!");
  });
});

// UPDATE - destinos
function update(btn) {
  const row = btn.closest('tr');
  const cells = row.cells;
  const cpf = cells[0].innerText;
  const nome = cells[1].innerText;

  const data = {
    cpf: cpf,
    nome: nome,
  };

  fetch(uri, {
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
}

// DELETE - destinos
function del(cpf) {
  fetch(uri + '/' + cpf, {
    method: 'DELETE'
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao excluir cliente: " + res.status);
    }
    return res;
  })
  .then(() => {
    mensagens("Cliente excluído com sucesso!");
    window.location.reload();
  })
  .catch((error) => {
    console.error("Erro ao excluir cliente:", error);
    mensagens("Erro ao excluir cliente!");
  });
}



//Mostrar mensagens do sistema
function mensagens(msg, confirma) {
  var mensagemElement = document.querySelector('#msg');
  var cancelaElement = document.querySelector('#cancela');
  var confirmaElement = document.querySelector('#confirma');

  if (mensagemElement) {
      mensagemElement.textContent = msg;
  }

  if (cancelaElement) {
      cancelaElement.classList.remove('oculto');
  }

  if (confirmaElement) {
      if (confirma !== undefined) {
          confirmaElement.classList.remove('oculto');
          confirmaElement.addEventListener("click", function() {
              confirmar(confirma);
          });
      } else {
          confirmaElement.classList.add('oculto');
      }
  }
}


document.getElementById('openModalBtn').addEventListener('click', function() {
  var errorMessages = ["Error 1: Connection lost", "Error 2: Invalid input"];
  var errorModal = document.getElementById('errorModal');
  var errorMessagesContainer = document.getElementById('errorMessages');
  
  // Clear previous error messages
  errorMessagesContainer.innerHTML = '';
  
  // Populate error messages
  errorMessages.forEach(function(message) {
    var errorMessageNode = document.createElement('p');
    errorMessageNode.textContent = message;
    errorMessagesContainer.appendChild(errorMessageNode);
  });
  
  // Display modal
  errorModal.style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('errorModal').style.display = 'none';
});


//Tornar as células da linha tabela editáveis
function edit(btn) {
  let linha = btn.parentNode.parentNode;
  let celulas = linha.cells;
  for (let i = 0; i < celulas.length; i++) { // Começar o loop de i = 0 para editar todas as células
      celulas[i].setAttribute('contenteditable', 'true');
  }
  btn.innerHTML = '<ion-icon class="icon" name="checkmark-outline"></ion-icon>';
  btn.setAttribute('onclick', 'update(this)');
}


// OPEN MODAL 

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

    dialog.querySelector('div').style.animation = 'openDialog 0.5s forwards';

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

    dialog.style.animation = 'closeDialog 0.5s forwards';


    setTimeout(() => {
        dialog.style.animation = 'none';
        dialog.classList.add('hidden');
    }, 500);
}
const uriTuristico = "http://localhost:3000/pontosturisticos";
const tableBody = document.getElementById("dados");

  fetch(uriTuristico)
   .then((res) => {
      if (!res.ok) {
        throw new Error(`Erro ao obter destinos: ${res.status}`);
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
    <td>
      <button onclick="showModal('prof${cli.id}')" style="width: fit-content;">*</button>
      <div class="modal oculto" id="prof${cli.id}">
        <div class="janela">
          <div class="modalCabecalho">
            <h3>Alterar dados do ponto turistico Id: ${cli.id}</h3>
            <button onclick="hideModal('prof${cli.id}')">X</button>
          </div>
        <form action="">

                <div class="input-group">
                    <input required="" type="text" name="id_destinos" autocomplete="off" class="input" value"${cli.id_destinos}"> 
                    <label class="user-label">Id do destino</label>
                  </div>

                  <div class="input-group">
                    <input required="" type="text" name="nome" autocomplete="off" class="input" value="${cli.nome}">
                    <label class="user-label">Nome</label>
                  </div>

                  <div class="input-group">
                    <input required="" type="text" name="endereco" autocomplete="off" class="input" value="${cli.endereco}">
                    <label class="user-label">Endereço</label>
                  </div>

                  <div class="input-group">
                    <input required="" type="text" name="telefone" autocomplete="off" class="input" value="${cli.telefone}">
                    <label class="user-label">Telefone</label>
                  </div>

                  <div class="input-group">
                    <input required="" type="text" name="valor" autocomplete="off" class="input" value="${cli.valor}">
                    <label class="user-label">Valor</label>
                  </div>

                  <button type="submit" value="Alterar ponto turistico" onclick="update(id)">Alterar</button>
        </form>
        </div>
        </div>
    </td>
    <td>
      <button onclick="showModal('profs${cli.id}')" style="width: fit-content;">*</button>
      <div class="modal oculto" id="profs${cli.id}">
        <div class="janela">
          <div class="modalCabecalho">
            <h3>Excluir dados do professor Id: ${cli.id}</h3>
            <button onclick="hideModal('profs${cli.id}')">X</button>
          </div>
          <form action="/professor/${cli.id}?_method=DELETE" method="POST">
            <div class="deletes">
              <div class="delete">
                <label for="">Nome: ${cli.nome}</label>
              </div>
              <div class="delete2">
                <label>Especialidade: ${cli.especialidade}</label>
              </div>
            </div>
            <input type="hidden" name="id" value="${cli.id}">
            <input type="submit" value="Deletar">
          </form>
        </div>
      </div>
    </td>
        `;
        tableBody.appendChild(row);
      });
    })
   .catch((error) => {
      console.error("Erro ao obter destinos:", error);
      alert("Erro ao obter destinos!");
    });



    const modal = document.querySelectorAll('.modal');

    modal.forEach((modal) => {
        modal.addEventListener('click', (event) => {
            (event.target.classList.contains('modal')) 
                closemodal('contact');     
        });
    })



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


      function update(btn) {
        const row = btn.closest('tr');
        const [cpfCell, nomeCell, enderecoCell, telefoneCell, valorCell] = row.cells;
      
        const data = {
          id_destinos: cpfCell.innerText.trim(),
          nome: nomeCell.innerText.trim(),
          endereco: enderecoCell.innerText.trim(),
          telefone: telefoneCell.innerText.trim(),
          valor: valorCell.innerText.trim(),
        };
      
        fetch(uri, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
       .then(checkStatus)
       .then(() => mensagens("Cliente atualizado com sucesso!"))
       .catch(error => {
          console.error("Erro ao atualizar cliente:", error);
          mensagens("Erro ao atualizar cliente!");
        });
      }
      
      function checkStatus(response) {
        if (!response.ok) {
          throw new Error(`Erro ao atualizar cliente: ${response.status}`);
        }
        return response;
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

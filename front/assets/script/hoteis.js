const uri = "http://localhost:3000/hoteis";


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
       <td><button onclick="openDialog('contact')">*</button></td>
       <td><button onclick="openDialog('matricula')">*</button></td>
     `;
     tableBody.appendChild(row);
   });
 })
.catch((error) => {
   console.error("Erro ao obter destinos:", error);
   alert("Erro ao obter destinos!");
 });
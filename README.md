
# Seidor_API

## Descrição do Projeto
<p>API desenvolvida em Node.js visando fornecer funcionalidades relacionadas a locação de carro proposta pela empresa Seidor.</p>

<br/>
### Requisitos.
<ul>
    <li>
        <a href="https://nodejs.org/en/" target="_blank" >Node.js - v14.15.4 ou superior  </a>
    </li>
    <li>
        <a href="https://www.npmjs.com/" target="_blank" >Node Package Manager (npm) - 6.14.17 ou superior</a>
    </li>
    <li>
        <a href="https://docs.docker.com/compose/install/" target="_blank" >Docker Compose</a>
    </li>
</ul>

### Inicializar a aplicação
Para a execução do projeto de maneira local deve ser executado os seguintes passos.
<br/>
<ul>
    <li><b>Inicializar a aplicação: </b>
    <br/>
    Para inicializar a aplicação é necessário entrar na pasta do projeto e rodar os comando:
    <br/>
    <code>npm i</code> - para baixar as dependências do projeto<br>
    <code>npm run migration:run</code><br>
    <code>sudo docker-compose up</code><br>
    <code>npm run dev</code><br>
    </li>

</ul>

### Execução dos testes
Para a execução dos testes deverá ser executado o seguinte comando: <code> npm run test</code>.
<br/>

<p>Após a finalização desse processo você terá a aplicação rodando localmente na porta <code>3000</code>, mais especificamente: <code>http://localhost:3000/</code></p>
<br/>

<p><b>OBS:</b> Você DEVE utilizar um software como <a href="https://www.postman.com/" target="_blank">Postman</a> para disparar requisições para a API.</p>
<br/>


## Detalhamento das rotas

Dentro da aplicação veremos três grupos de rotas:
Rotas relacionadas as operações realizadas com carro (CarRegistrationRoutes);
rotas relacionadas as operações realizadas com o motorista (DriverRegistrationRoutes); e
rotas relacionadas as operaçoes de locações (RentACarRoutes)

As rotas referentes a <strong>carro (CarRegistrationRoutes)</strong>, englobam cadastro, exclusão, atualização e visualização; são elas:

<code>POST /api/v1/car/register </code>-> devemos informar no corpo (body) da requisição as seguintes informações para que seja criado um carro no sistema:
{"color", "licensePlate" e "brand"}. Todas as informações DEVEM ser string e a única restrição é que a licensePlate DEVE CONTER 7 caracteres.

<code>PUT /api/v1/car/update/:id</code> -> aqui devemos informar o id do carro cadastrado na rota /register e no corpo da requisição devemos enviar
um objeto que contenha as mesmas informações da rota mencionada acima -> {"color", "licensePlate" e "brand"} .

<code> DELETE /api/v1/car/delete/:id</code> -> aqui devemos informar o id do carro para remover o mesmo do sistema.

<code> GET /api/v1/car/:id</code> -> aqui devemos informar o id do carro para listar um carro especifico se presente no sistema.

<code> GET /api/v1/cars</code> -> Por padrão serão listados todos os carros, se existentes no banco de dados. Existe a opção de filtrar um carro por
"color" ou "brand" bastando apenas enviar por query params.

As rotas referentes a <strong>motorista (DriverRegistrationRoutes)</strong> são similares a do grupo de carro:

<code>POST /api/v1/driver/register </code>-> devemos informar no corpo (body) da requisição a seguinte informação para que seja criado um motorista no sistema:
{"name"}.

<code>PUT /api/v1/driver/update/:id</code> -> aqui devemos informar o id do motorista cadastrado na rota /register e no corpo da requisição devemos enviar
um objeto que contenha as mesmas informações da rota mencionada acima -> {"name"} .

<code> DELETE /api/v1/driver/delete/:id</code> -> aqui devemos informar o id do motorista para remover o mesmo do sistema.

<code> GET /api/v1/driver/:id</code> -> aqui devemos informar o id do motorista para listar o mesmo se estiver presente no sistema.

<code> GET /api/v1/drivers</code> -> Por padrão serão listados todos os motoristas, se existentes no banco de dados. Existe a opção de filtrar um motorista por
"name" bastando apenas enviar por query params.

As rotas referentes as operações de <strong>alugel (CarRentRoutes)</strong> de carros são:

<code>POST /api/v1/rent/start/:driverId/:carId</code> -> conclui aluguel do veiculo selecionado para o motorista informado, se estiver dentro dos critérios.
Motorista sem reserva existente e carro disponivel.

<code>PUT /api/v1/rent/finalize/:driverId/carId</code> -> aluguel será encerrado; carro e motorista disponiveis para nova locação

<code>GET /api/v1/rents</code> -> lista todas as locações ativas e inativas

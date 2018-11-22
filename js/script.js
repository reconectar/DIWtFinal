/* 1.0 */



// Caso exista no Local Storage, recupera os dados salvos
var dbj = JSON.parse(localStorage.getItem('dbj'));
if (!dbj) {
    dbj = dbjfake;
}

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

function insertJogo(jogo) {
    // Calcula novo Id a partir do último código existente no array
    let novoId = dbj.data[dbj.data.length - 1].id + 1;
    let novoJogo = {
        "id": novoId,
        "nome": jogo.nome,
        "release": jogo.release,
        "developer": jogo.developer,
        "platform": jogo.platform,
        "genre": jogo.genre,
        "gamemode": jogo.gamemode,
        "cover": jogo.cover

    };

    // Insere o novo objeto no array
    dbj.data.push(novoJogo);
    displayMessage("Jogo inserido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('dbj', JSON.stringify(dbj));
}

function updateJogo(id, jogo) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = dbj.data.map(obj => obj.id).indexOf(id);

    // Altera os dados do objeto no array
    dbj.data[index].nome = jogo.nome,
        dbj.data[index].release = jogo.release,
        dbj.data[index].developer = jogo.developer,
        dbj.data[index].platform = jogo.platform,
        dbj.data[index].genre = jogo.genre,
        dbj.data[index].gamemode = jogo.gamemode,
        dbj.data[index].cover = jogo.cover

    displayMessage("Jogo alterado com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('dbj', JSON.stringify(dbj));
}

function deleteJogo(id) {
    // Filtra o array removendo o elemento com o id passado
    dbj.data = dbj.data.filter(function (element) {
        return element.id != id
    });

    displayMessage("Jogo removido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('dbj', JSON.stringify(dbj));

    // Reexibe os jogos
    exibeJogos();

    // Limpa o formulario
    $("#form-jogo")[0].reset();
}


function exibeJogos() {
    // Remove todas as linhas do corpo da tabela
    $("#table-jogos").html("");

    // Popula a tabela com os registros do banco de dados
    for (i = 0; i < dbj.data.length; i++) {
        let jogo = dbj.data[i];
        $("#table-jogos").append(`<tr><td scope="row" hidden>${jogo.id}</td><td>${jogo.nome}</td><td hidden>${jogo.release}</td><td hidden>${jogo.developer}</td><td hidden>${jogo.platform}</td><td>${jogo.genre}</td><td hidden>${jogo.gamemode}</td><td><img src="${jogo.cover}"></td><td><a href="#" onclick="openModal2(${jogo.id})">Visualizar</a> | <a href="#" onclick="openModal()">Alterar</a> | <a onclick="deleteJogo(${jogo.id})" value="Excluir" href="#" id="btnDelete">Excluir</a></td></tr>`);
    }
}

function init() {


    // Adiciona funções para tratar os eventos 
    $("#btnInsert").click(function () {
        // Verfica se o formulário está preenchido corretamente
        if (!$('#form-jogo')[0].checkValidity()) {
            displayMessage("Preencha o formulário corretamente.");
            return;
        }

        // Obtem os valores dos campos do formulário
        let campoNome = $("#inputNome").val();
        let campoRelease = $("#inputRelease").val();
        let campoDeveloper = $('#inputDeveloper').val();
        let campoPlatform = $('#inputPlatform').val();
        let campoGenre = $('#inputGenre').val();
        let campoGamemode = $('#inputGamemode').val();
        let campoCover = $('#inputCover').val();
        let jogo = {
            nome: campoNome,
            release: campoRelease,
            developer: campoDeveloper,
            platform: campoPlatform,
            genre: campoGenre,
            gamemode: campoGamemode,
            cover: campoCover
        };

        insertJogo(jogo);

        // Reexibe os jogos
        exibeJogos();

        // Fecha o modal para visualização da mensagem
        closeModal();

        // Limpa o formulario
        $("#form-jogo")[0].reset();
    });

    // Intercepta o click do botão Alterar
    $("#btnUpdate").click(function () {
        // Obtem os valores dos campos do formulário
        let campoId = $("#inputId").val();
        if (campoId == "") {
            displayMessage("Selecione um jogo para ser alterado.");
            return;
        }
        let campoNome = $("#inputNome").val();
        let campoRelease = $("#inputRelease").val();
        let campoDeveloper = $('#inputDeveloper').val();
        let campoPlatform = $('#inputPlatform').val();
        let campoGenre = $('#inputGenre').val();
        let campoGamemode = $('#inputGamemode').val();
        let campoCover = $('#inputCover').val();
        let jogo = {
            nome: campoNome,
            release: campoRelease,
            developer: campoDeveloper,
            platform: campoPlatform,
            genre: campoGenre,
            gamemode: campoGamemode,
            cover: campoCover
        };

        updateJogo(parseInt(campoId), jogo);

        // Reexibe os jogos
        exibeJogos();

        // Limpa o formulario
        $("#form-jogo")[0].reset();

        // Fecha o modal para visualização da mensagem
        closeModal();
    });

    // Intercepta o click do botão limpar formulário
    $("#btnClear").click(function () {
        $("#form-jogo")[0].reset();
    });

    //Intercepta o botao que abre o modal
    $("#openBtn").click(function () {
        $("#form-jogo")[0].reset();
        showBtnInsert();
        hideBtnUpdate();
    });

    // Intercepta o click do botâo resetar LocalStorage
    $("#btnClearStorage").click(function () {
        window.localStorage.removeItem('dbj');
        location.reload();
    });

    // Oculta a mensagem de aviso após alguns segundos
    $('#msg').bind("DOMSubtreeModified", function () {
        window.setTimeout(function () {
            $(".alert").fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 2000);
    });

    // Preenche o formulário quando o usuario clicar em uma linha da tabela 
    $("#grid-jogos").on("click", "tr", function (e) {
        let linhaJogo = this;
        $("#inputId").val(linhaJogo.childNodes[0].firstChild.nodeValue);
        $("#inputNome").val(linhaJogo.childNodes[1].firstChild.nodeValue);
        $("#inputRelease").val(linhaJogo.childNodes[2].firstChild.nodeValue);
        $("#inputDeveloper").val(linhaJogo.childNodes[3].firstChild.nodeValue);
        $("#inputPlatform").val(linhaJogo.childNodes[4].firstChild.nodeValue);
        $("#inputGenre").val(linhaJogo.childNodes[5].firstChild.nodeValue);
        $("#inputGamemode").val(linhaJogo.childNodes[6].firstChild.nodeValue);
        $("#inputCover").val(linhaJogo.childNodes[7].firstChild.getAttribute('src'));
        hideBtnInsert();
        showBtnUpdate();
    });

    exibeJogos();
}

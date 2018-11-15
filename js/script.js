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
}


function exibeJogos() {
    // Remove todas as linhas do corpo da tabela
    $("#table-jogos").html("");

    // Popula a tabela com os registros do banco de dados
    for (i = 0; i < dbj.data.length; i++) {
        let jogo = dbj.data[i];
        $("#table-jogos").append(`<tr><td scope="row">${jogo.id}</td><td>${jogo.nome}</td><td>${jogo.release}</td><td>${jogo.developer}</td><td>${jogo.platform}</td><td>${jogo.genre}</td><td>${jogo.gamemode}</td><td><img src="${jogo.cover}"></td></tr>`);
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
    });

    // Intercepta o click do botão Excluir
    $("#btnDelete").click(function () {
        let campoId = $("#inputId").val();
        if (campoId == "") {
            displayMessage("Selecione um jogo a ser excluído.");
            return;
        }
        deleteJogo(parseInt(campoId));

        // Reexibe os jogos
        exibeJogos();

        // Limpa o formulario
        $("#form-jogo")[0].reset();
    });

    // Intercepta o click do botão Listar Jogos
    $("#btnClear").click(function () {
        $("#form-jogo")[0].reset();
    });

    $("#btnClearStorage").click(function () {
        window.localStorage.removeItem('dbj');
    });

    // Oculta a mensagem de aviso após alguns segundos
    $('#msg').bind("DOMSubtreeModified", function () {
        window.setTimeout(function () {
            $(".alert").fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 5000);
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
        $("#inputCover").val(linhaJogo.childNodes[7].firstChild.nodeValue);
    });

    exibeJogos();
}

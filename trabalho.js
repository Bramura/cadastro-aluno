class Aluno {
    constructor(nomeCompleto, nomeMae, dataNascimento, cpf, curso, bairro, cidade) {
        this.nomeCompleto = nomeCompleto;
        this.nomeMae = nomeMae;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.curso = curso;
        this.bairro = bairro;
        this.cidade = cidade;
    }
}

class GerenciadorAlunos {
    constructor() {
        this.alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    }

    salvarNoLocalStorage() {
        localStorage.setItem('alunos', JSON.stringify(this.alunos));
    }

    inserir(aluno) {
        const existe = this.alunos.some(a => a.cpf === aluno.cpf);
        if (existe) {
            alert('CPF já cadastrado! Não é possível inserir duplicado.');
        } else {
            this.alunos.push(aluno);
            this.salvarNoLocalStorage();
            alert('Aluno cadastrado com sucesso!');
        }
    }

    alterar(cpf, alunoAtualizado) {
        const index = this.alunos.findIndex(aluno => aluno.cpf === cpf);
        if (index !== -1) {
            this.alunos[index] = alunoAtualizado;
            this.salvarNoLocalStorage();
            alert('Cadastro alterado com sucesso!');
        } else {
            alert('Aluno não encontrado!');
        }
    }

    excluir(cpf) {
        const index = this.alunos.findIndex(aluno => aluno.cpf === cpf);
        if (index !== -1) {
            // Remove o cadastro do array
            this.alunos.splice(index, 1);
            this.salvarNoLocalStorage();
            alert('Cadastro excluído com sucesso!');
        } else {
            alert('Aluno não encontrado para exclusão!');
        }
    }

    consultar(cpf) {
        return this.alunos.find(aluno => aluno.cpf === cpf) || null;
    }

    listar() {
        return this.alunos;
    }
}

const gerenciador = new GerenciadorAlunos();

function limparCampos() {
    document.getElementById('nomeCompleto').value = '';
    document.getElementById('nomeMae').value = '';
    document.getElementById('dataNascimento').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('curso').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
}

function inserirAluno() {
    const aluno = new Aluno(
        document.getElementById('nomeCompleto').value,
        document.getElementById('nomeMae').value,
        document.getElementById('dataNascimento').value,
        document.getElementById('cpf').value,
        document.getElementById('curso').value,
        document.getElementById('bairro').value,
        document.getElementById('cidade').value
    );
    gerenciador.inserir(aluno);
    limparCampos();
}

function consultarAluno() {
    const cpf = document.getElementById('cpf').value;
    if (!cpf) {
        alert('Digite o CPF do aluno que deseja consultar.');
        return;
    }

    const aluno = gerenciador.consultar(cpf);
    if (aluno) {
        document.getElementById('nomeCompleto').value = aluno.nomeCompleto;
        document.getElementById('nomeMae').value = aluno.nomeMae;
        document.getElementById('dataNascimento').value = aluno.dataNascimento;
        document.getElementById('curso').value = aluno.curso;
        document.getElementById('bairro').value = aluno.bairro;
        document.getElementById('cidade').value = aluno.cidade;
        alert('Consulta realizada com sucesso!');
    } else {
        alert('Aluno não encontrado!');
        limparCampos();
    }
}

function alterarAluno() {
    const cpf = document.getElementById('cpf').value;
    if (!cpf) {
        alert('Digite o CPF do aluno para alterar.');
        return;
    }

    const aluno = gerenciador.consultar(cpf);
    if (aluno) {
        document.getElementById('nomeCompleto').value = aluno.nomeCompleto;
        document.getElementById('nomeMae').value = aluno.nomeMae;
        document.getElementById('dataNascimento').value = aluno.dataNascimento;
        document.getElementById('curso').value = aluno.curso;
        document.getElementById('bairro').value = aluno.bairro;
        document.getElementById('cidade').value = aluno.cidade;
        document.getElementById('btnSalvarAlteracao').style.display = 'inline';
    } else {
        alert('Aluno não encontrado!');
        limparCampos();
    }
}

function salvarAlteracao() {
    const cpf = document.getElementById('cpf').value;
    const alunoAtualizado = new Aluno(
        document.getElementById('nomeCompleto').value,
        document.getElementById('nomeMae').value,
        document.getElementById('dataNascimento').value,
        cpf,
        document.getElementById('curso').value,
        document.getElementById('bairro').value,
        document.getElementById('cidade').value
    );
    gerenciador.alterar(cpf, alunoAtualizado);
    document.getElementById('btnSalvarAlteracao').style.display = 'none';
    limparCampos();
}

function excluirAluno() {
    const cpf = document.getElementById('cpf').value;
    if (!cpf) {
        alert('Digite o CPF do aluno para excluir.');
        return;
    }

    if (gerenciador.consultar(cpf)) {
        if (confirm('Tem certeza de que deseja excluir este cadastro?')) {
            gerenciador.excluir(cpf);
            limparCampos();
        }
    } else {
        alert('Aluno não encontrado!');
    }
}

function listarAlunos() {
    const alunos = gerenciador.alunos;
    const lista = document.getElementById('listaAlunos');
    lista.innerHTML = ''; // Limpa a lista antes de exibir os alunos

    if (alunos.length === 0) {
        lista.innerHTML = '<p>Nenhum aluno cadastrado.</p>';
        return;
    }

    const tabela = document.createElement('table');
    tabela.border = '1';
    tabela.style.width = '100%';

    // Cabeçalho da tabela
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Nome Completo</th>
            <th>Nome da Mãe</th>
            <th>Data de Nascimento</th>
            <th>CPF</th>
            <th>Curso</th>
            <th>Bairro</th>
            <th>Cidade</th>
        </tr>
    `;
    tabela.appendChild(thead);

    // Corpo da tabela
    const tbody = document.createElement('tbody');
    alunos.forEach(aluno => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${aluno.nomeCompleto}</td>
        <td>${aluno.nomeMae}</td>
        <td>${aluno.dataNascimento}</td>
        <td>${aluno.cpf}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.bairro}</td>
        <td>${aluno.cidade}</td>
    `;
        tbody.appendChild(tr);
    });

    tabela.appendChild(tbody);

    lista.appendChild(tabela);
}

window.onload = function () {

};
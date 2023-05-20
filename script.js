class Pokemon{

    constructor(){
        this.id = 1;
        this.nome = '';
        this.evolui = 0;
        this.tipo = '';

        this.editID = null;


        this.arrayPokemons = [];
    }

    salvar(){
        let pokemon = this.lerDados();

        if(this.validaCampos(pokemon)){
            if(this.editID == null){
                this.adicionar(pokemon);
            }else{
                this.atualizar(this.editID, pokemon);
            }

        }
        
        this.listaTabela();

        this.cancelar();
    }

    cancelar(){
        document.getElementById('nome').value = ''; 
        document.getElementById('tipo').value = ''; 
        document.getElementById('evolui').value = ''; 


        document.getElementById('btn-1').innerText = 'Salvar';
        this.editID = null;
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');

        tbody.innerText = '';

        for(let i = 0; i < this.arrayPokemons.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell(); 
            let td_nome = tr.insertCell(); 
            let td_evolui = tr.insertCell(); 
            let td_tipo = tr.insertCell(); 
            let td_acoes = tr.insertCell(); 

            td_id.innerText = this.arrayPokemons[i].id;
            td_nome.innerText = this.arrayPokemons[i].nome;
            td_tipo.innerText = this.arrayPokemons[i].tipo;
            td_evolui.innerText = this.arrayPokemons[i].evolui;


            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edit.png';
            imgEdit.classList.add('btn')
            imgEdit.setAttribute('onClick', 'pokemon.prepararEdit('+ JSON.stringify(this.arrayPokemons[i]) +')')
            td_acoes.appendChild(imgEdit);

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delete.png';
            imgDelete.classList.add('btn')
            imgDelete.setAttribute('onClick', 'pokemon.deletar('+ this.arrayPokemons[i].id +')')
            td_acoes.appendChild(imgDelete);

        }
    }

    adicionar(pokemon){
        this.arrayPokemons.push(pokemon);
        this.id++

        

        var listaPokemons = JSON.parse(localStorage.getItem('listaPokemons') || '[]');
        listaPokemons.push(pokemon);
        localStorage.setItem('listaPokemons', JSON.stringify(listaPokemons));
    }

    atualizar(id, pokemon){
        for(let i = 0; i < this.arrayPokemons.length; i++){
            if(this.arrayPokemons[i].id == id){
                this.arrayPokemons[i].nome = pokemon.nome;
                this.arrayPokemons[i].tipo = pokemon.tipo;
                this.arrayPokemons[i].evolui = pokemon.evolui;
            }
        }
    }

    prepararEdit(dados){
        this.editID = dados.id;

        document.getElementById('nome').value = dados.nome;
        document.getElementById('tipo').value = dados.tipo;
        document.getElementById('evolui').value = dados.evolui;  

        document.getElementById('btn-1').innerText = 'Atualizar'
    }

    lerDados(){
        let pokemon = {}

        pokemon.id = this.id;
        pokemon.nome = document.getElementById('nome').value;
        pokemon.tipo = document.getElementById('tipo').value;
        pokemon.evolui = document.getElementById('evolui').value;

        return pokemon;
    }

    validaCampos(pokemon){

        let msg = '';

        if(pokemon.nome == ''){
            msg += '- Informe o nome do Pokemon! \n';
        }

        if(pokemon.tipo == ''){
            msg += '- Informe o tipo do Pokemon! \n';
        }

        if(pokemon.evolui == ''){
            msg += '- Informe quantas vezes o Pokemon evolui! \n';
        }

        if(msg !== ''){
            alert(msg);
            return false;
        }

        return true;

    }

    deletar(id){

        if(confirm('Deseja realmente deletar o pokémon do ID ' + id)){
                let tbody = document.getElementById('tbody');



                for(let i = 0; i < this.arrayPokemons.length; i++){
                    if(this.arrayPokemons[i].id == id){
                        this.arrayPokemons.splice(i, 1);
                        tbody.deleteRow(i);
                    }
            }
        }
    }

}

var pokemon = new Pokemon();
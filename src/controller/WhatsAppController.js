class WhatsAppController {

    constructor(){

        console.log('WhastController Ok');

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();

    }

    loadElements(){// Transforma todos os elementos 'id' do html em camelCase

        this.el = {};

        document.querySelectorAll('[id]').forEach(element=>{

            this.el[Format.getCamelCase(element.id)] = element;

        });

    }

    /* Cria um novo método para objetos sem precisar usar 
    uma biblioteca como jQuery para encurtar o código
    
    O return this é para poder aninhar vários metodos um depois do outro
    
    Element = pai de todos*/
    elementsPrototype(){

        Element.prototype.hide = function(){
            this.style.display = 'none';
            return this;
        }

        Element.prototype.show = function(){
            this.style.display = 'block';
            return this;
        }

        Element.prototype.toggle = function(){
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        }

        // Metodo on para múltiplos eventos
        Element.prototype.on = function(events, fn){
            events.split(' ').forEach(event=>{
                this.addEventListener(event, fn);
            });
            return this;
        }

        Element.prototype.css = function(styles){
            for (let name in styles) {
                this.style[name] = styles[name];
            }
            return this;
        }

        Element.prototype.addClass = function(name){
            this.classList.add(name);
            return this;
        }

        Element.prototype.removeClass = function(name){
            this.classList.remove(name);
            return this;
        }

        Element.prototype.toggleClass = function(name){
            this.classList.toggle(name);
            return this;
        }

        Element.prototype.hasClass = function(name){
            return this.classList.contains(name);
        }

        /** Classe do formulario html
        Carrega o FormData 
        */ 
        HTMLFormElement.prototype.getForm = function () {
            return new FormData(this);
        }

        // Gera o mesmo formulario preenchido, mas no formato JSON
        HTMLFormElement.prototype.toJSON = function() {
            
            let json = {};

            this.getForm().forEach((value, key)=>{

                json[key] = value;

            });

            return json;

        }

    }

    initEvents(){//Inicializa os eventos

        this.el.myPhoto.on('click', e=>{

            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(()=>{// Animação ao clicar no icone (deslizar)
                this.el.panelEditProfile.addClass('open');
            }, 300);
            

        });

        // Será feito pelo e-mail cadastrado, não pelo numero do telefone
        this.el.btnNewContact.on('click', e=>{

            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(()=>{
                this.el.panelAddContact.addClass('open');
            }, 300);

        });

        this.el.btnClosePanelEditProfile.on('click', e=>{

            this.el.panelEditProfile.removeClass('open');

        });

        this.el.btnClosePanelAddContact.on('click', e=>{

            this.el.panelAddContact.removeClass('open');

        });

        // Alterar foto
        this.el.photoContainerEditProfile.on('click', e=>{

            this.el.inputProfilePhoto.click();

        });

        // Nome contato
        this.el.inputNamePanelEditProfile.on('keypress', e=>{

            if (e.key === 'Enter') {

                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();

            }

        });

        this.el.btnSavePanelEditProfile.on('click', e=>{

            console.log(this.el.inputNamePanelEditProfile.innerHTML);

        });

        /* FormData trata os campos do form e os recupera automaticamente com base no name.
        Equivalente a selecionar o form com querySelector, que procura todos os campos do
        formulario e faz um append em cada campo correspondente.
        Com o id do formulario dentro do FormData, ele já faz isso.
        Deixa o codigo mais enxuto e mais rapido
        */
        this.el.formPanelAddContact.on('submit', e=>{

            e.preventDefault();

            let formData = getForm(this.el.formPanelAddContact);

        });

    }

    closeAllLeftPanel(){

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();

    }

}
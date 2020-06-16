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

    /**
     * Cria um novo método para objetos sem precisar usar 
       uma biblioteca como jQuery para encurtar o código
        
       O return this é para poder aninhar vários metodos um depois do outro
        
       Element = pai de todos
     */
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
         * Carrega o FormData 
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

        // Abrir caixa de conversa
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{

            item.on('click', e=>{

                this.el.home.hide();
                this.el.main.css({
                    display: 'flex'
                });

            });

        });

        // Menu anexar
        this.el.btnAttach.on('click', e=>{

            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            /**
             * Bind para dizer que o this continuara a fazer parte do meu escopo,
             caso contrário, dara um erro, pois saira do el do construtor e o this
             sera do proprio document do dom
             */
            document.addEventListener('click', this.closeMenuAttach.bind(this));

        });

        this.el.btnAttachPhoto.on('click', e=>{

            this.el.inputPhoto.click();

        });

        this.el.inputPhoto.on('change', e=>{

            console.log(this.el.inputPhoto.files);

            [...this.el.inputPhoto.files].forEach(file=>{

                console.log(file);

            });

        });

        this.el.btnAttachCamera.on('click', e=>{

            this.closeAllMainPanel();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height': 'calc(100% - 120px)'
            });

        });

        this.el.btnClosePanelCamera.on('click', e=>{

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });

        this.el.btnTakePicture.on('click', e=>{

            console.log('take picture');

        });

        this.el.btnAttachDocument.on('click', e=>{

            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                'height': 'calc(100% - 120px)'
            });

        });

        this.el.btnClosePanelDocumentPreview.on('click', e=>{

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });

        this.el.btnSendDocument.on('click', e=>{

            console.log('send document');

        });

        this.el.btnAttachContact.on('click', e=>{

            this.el.modalContacts.show();

        });

        this.el.btnCloseModalContacts.on('click', e=>{

            this.el.modalContacts.hide();

        });

        this.el.btnSendMicrophone.on('click', e=>{

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this.startRecordMicrophoneTime();

        });

        this.el.btnCancelMicrophone.on('click', e=>{

            this.closeRecordMicrophone();

        });

        this.el.btnFinishMicrophone.on('click', e=>{

            this.closeRecordMicrophone();

        });

        /**
         * Enviar mensagem ao pressionar Enter, além de clicar em enviar
         */
        this.el.inputText.on('keypress', e=>{

            if (e.key === 'Enter' && !e.ctrlKey) {

                e.preventDefault();
                this.el.btnSend.click();

            }

        });

        /**
         * Ao escrever tira o placeholder, ao limpar, volta o placeholder.
         * E ao escrever substitui o microfone pela seta de envio, ao limpar
         * volta o microfone 
         */
        this.el.inputText.on('keyup', e=>{

            if (this.el.inputText.innerHTML.length) {

                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();

            } else {

                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();

            }

        });

        this.el.btnSend.on('click', e=>{

            console.log(this.el.inputText.innerHTML);

        });

        this.el.btnEmojis.on('click', e=>{

            this.el.panelEmojis.toggleClass('open');

        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji=>{

            emoji.on('click', e=>{

                console.log(emoji.dataset.unicode);

                /**
                 * cloneNode, clona o elemento com suas propriedades.
                 * 
                 * Como o emoji é um elemento unicode, vai trazer o css, informaçoes
                 * que estão dentro dele pra dentro do obj e inseri-lo aonde precisa 
                 * no campo de mensagem
                 */
                let img = this.el.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(name=>{
                    img.classList.add(name);
                });

                this.el.inputText.appendChild(img);

                this.el.inputText.dispatchEvent(new Event('keyup'));

            });

        });

    }

    startRecordMicrophoneTime(){// Timer de gravação

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(()=>{

            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);

        }, 100);

    }

    closeRecordMicrophone(){

        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        // Interrompe o timer de gravação pelo id correspondente
        clearInterval(this._recordMicrophoneInterval);

    }

    closeAllMainPanel(){

        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');

    }

    closeMenuAttach(e){

        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');

    }

    closeAllLeftPanel(){

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();

    }

}
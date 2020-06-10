class WhatsAppController {

    constructor(){

        console.log('WhastController Ok');

        this.loadElements();

    }

    loadElements(){// Transforma todos os elementos 'id' do html em camelCase

        this.el = {};

        document.querySelectorAll('[id]').forEach(element=>{

            this.el[Format.getCamelCase(element.id)] = element;

        });

    }


}
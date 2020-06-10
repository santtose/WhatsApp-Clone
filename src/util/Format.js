class Format {

    /* Esse metodo cria altomaticamento os atributos
    para cada Id dentro do html, tirando assim a necessidade
    de fazer uma nova seleção para cada id existente ou novo.
    Ver exemplo no console com app.el*/
    static getCamelCase(text){

        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"></div>`;

        // Traz um array com todas as chaves que encontrar dentro de um obj
        return Object.keys(div.firstChild.dataset)[0];

    }

}
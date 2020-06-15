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

    /**
    Metodo que formata o time
     */
    static toTime(duration){

        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
         
    }

}
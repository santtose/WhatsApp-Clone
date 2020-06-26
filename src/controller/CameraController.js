export class CameraController {
   
    constructor(videoEl){

        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({ video: true }).then(stream=>{

            /**
             * createObjectURL() cria arquivos do tipo binario
             * 
             * O video só consegue ler links, por isso a criação de uma URL para 
             * o video conseguir ler, ou seja, convertemos o stream em URL para
             * o video saber ler.     
             */
            this._videoEl.src = stream;
            this._videoEl.play();

        }).catch(err=>{
            console.error(err);
        }); 

    }

}
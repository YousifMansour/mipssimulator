export class Console {
    textarea: HTMLTextAreaElement;

    constructor() {
        this.textarea = <HTMLTextAreaElement>document.getElementById("console");
    }

    putError(error: string) {
        this.textarea.style.color = 'red';
        // if(this.textarea.style.color == 'green') this.textarea.value = "";
        this.textarea.value = error + "\n";
    }

    putMessege(message: string){
        this.textarea.style.color = 'lightgreen';
        this.textarea.value = message + "\n";
    }

    clear(){
        this.putMessege("");
    }
}

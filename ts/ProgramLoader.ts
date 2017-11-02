export class ProgramLoader {
    textArea: HTMLTextAreaElement;
    programs: string[];

    constructor(textArea: HTMLTextAreaElement) {
        this.textArea = textArea;
        this.loadProram(4);
    }

    loadProram(id: number) {
        if (1 == 1) return;
        var program: string = this.programs[id];
        this.textArea.value = program;
    }
}

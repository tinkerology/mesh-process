export class StatusLogger {
    private countSoFar: number;
    private threshold: number;

    constructor(threshold: number) {
        this.countSoFar = 0;
        this.threshold = threshold;
    }

    count(): void {
        this.countSoFar++;
        if (this.countSoFar % this.threshold === 0) {
            console.log('. ', this.countSoFar);
        }
    }
}
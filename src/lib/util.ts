export class Util {
    // From https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
    static round(n: number, digits: number): number {
        const places = Math.pow(10, digits);
        return Math.round(n * places) / places;
    }

    static degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    static cosDegreesRounded(degrees: number): number {
        const cos = Math.cos(Util.degreesToRadians(degrees));
        return Util.round(cos, 10);
    }

    static sinDegreesRounded(degrees: number): number {
        const sin = Math.sin(Util.degreesToRadians(degrees));
        return Util.round(sin, 10);
    }
}

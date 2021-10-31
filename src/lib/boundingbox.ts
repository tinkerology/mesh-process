
export class BoundingBox {
    minx:number;
    miny:number;
    minz:number;
    maxx:number;
    maxy:number;
    maxz:number;

    constructor(minx=Number.MIN_SAFE_INTEGER,
        miny = Number.MIN_SAFE_INTEGER,
        minz = Number.MIN_SAFE_INTEGER,
        maxx = Number.MAX_SAFE_INTEGER,
        maxy = Number.MAX_SAFE_INTEGER,
        maxz = Number.MAX_SAFE_INTEGER) {
        this.minx = minx;
        this.miny = miny;
        this.minz = minz;
        this.maxx = maxx;
        this.maxy = maxy;
        this.maxz = maxz;
    }

    isInside(x:number, y:number, z:number) : boolean {
        if ( x > this.minx && y > this.miny && z > this.minz &&
            x < this.maxx && y < this.maxy && z < this.maxz ) {
           return true;
       }
       return false;
    }

    expand(x:number, y:number, z:number) : BoundingBox {
        const expandedBB : BoundingBox = new BoundingBox();
        if ( x < this.minx ) {
            this.minx = x;
        }
        if ( y < this.miny ) {
            this.miny = y;
        }
        if ( z < this.minz ) {
            this.minz = z;
        }
        if ( x > this.maxx ) {
            this.maxx = x;
        }
        if ( y > this.maxy ) {
            this.maxy = y;
        }
        if ( z > this.maxz ) {
            this.maxz = z;
        }
        return expandedBB;
   }
}

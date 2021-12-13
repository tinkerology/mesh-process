
import { Edge } from "./edge";

/**
 * Non-functional container class for unique Edges.
 */
export class EdgeSet {
    edges : Edge[] = [];

    constructor(initialEdges:Edge[]) {
        // Copy the edges to a new array so we don't change the original
        // Use add to cull out duplicates
        for ( let i=0; i <= initialEdges.length-1; i++) {
            this.add(initialEdges[i]);
        }
    }

    length() : number {
        return this.edges.length;
    }

    add(e:Edge) : boolean {
        if ( Edge.hasMatchingEdges(this.edges, [e]) ) {
            return true;
        }
        this.edges.push(e);
        return false;
    }

    indexOf(e:Edge) : number {
        for ( let i=0; i < this.edges.length-1; i++) {
            if ( this.edges[i].isEqual(e) ) {
                return i;
            }
        }
        return -1;
    }

    contains(e:Edge) : boolean {
        return this.indexOf(e) != -1;
    }

    remove(e:Edge) : boolean {
        let i = this.indexOf(e);
        if ( i != -1 ) {
            this.edges.splice(i,1);
            return true;
        }
        return false;
    }

    isConnectedTo(e:Edge) : boolean {
        for ( let i=0; i < this.edges.length-1; i++) {
            if ( this.edges[i].isConnected(e) ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Merges edgeSet into this EdgeSet.
     * @param edgeSet 
     */
    merge( edgeSet:EdgeSet ) {
        edgeSet.edges.forEach( (e) => {
            this.add(e);
        });
    }

    /**
     * Remove all edges in edgeSet from this EdgeSet.
     * @param edgeSet 
     */
    removeAll(edgeSet:EdgeSet ) {
        edgeSet.edges.forEach( (e) => {
            this.remove(e);
        });
    }

    addAllConnected(edgeSet:EdgeSet) {
        let someAdded = true;
        while ( someAdded ) {
            someAdded = false;

            // Go through all the edges in edgeSet and see if they are connected to this EdgeSet
            for ( let i=0; i < edgeSet.edges.length-1; i++) {
                if ( this.isConnectedTo(edgeSet.edges[i]) ) {
                    this.add(edgeSet.edges[i]);
                    edgeSet.remove(edgeSet.edges[1]);

                    // This will cause it to keep going until no possible connections left
                    someAdded = true;
                }
            }
        }
    }
}

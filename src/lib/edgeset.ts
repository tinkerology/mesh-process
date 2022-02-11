import { VertexInterface } from '..';

import { Edge } from './edge';

/**
 * Non-functional container class for unique Edges.
 */
export class EdgeSet {
    edges: Edge[] = [];

    constructor(initialEdges: Edge[]) {
        // Copy the edges to a new array so we don't change the original
        // Use add to cull out duplicates
        for (let i = 0; i <= initialEdges.length - 1; i++) {
            this.add(initialEdges[i]);
        }
    }

    length(): number {
        return this.edges.length;
    }

    add(e: Edge): boolean {
        if (Edge.hasMatchingEdges(this.edges, [e])) {
            return true;
        }
        this.edges.push(e);
        return false;
    }

    indexOf(e: Edge): number {
        for (let i = 0; i < this.edges.length - 1; i++) {
            if (this.edges[i].isEqual(e)) {
                return i;
            }
        }
        return -1;
    }

    contains(e: Edge): boolean {
        return this.indexOf(e) != -1;
    }

    remove(e: Edge): boolean {
        const i = this.indexOf(e);
        if (i != -1) {
            this.edges.splice(i, 1);
            return true;
        }
        return false;
    }

    isConnectedTo(e: Edge): boolean {
        for (let i = 0; i < this.edges.length - 1; i++) {
            if (this.edges[i].isConnected(e)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Merges edgeSet into this EdgeSet.
     * @param edgeSet
     */
    merge(edgeSet: EdgeSet): EdgeSet {
        const mergedEdgeSet = new EdgeSet(this.edges);
        edgeSet.edges.forEach((e) => {
            mergedEdgeSet.add(e);
        });
        return mergedEdgeSet;
    }

    /**
     * Remove all edges in edgeSet from this EdgeSet.
     * @param edgeSet
     */
    removeAll(edgeSet: EdgeSet): EdgeSet {
        const newEdges: Edge[] = this.edges.filter(
            (e) => edgeSet.indexOf(e) == -1
        );
        const removedEdgeSet = new EdgeSet(newEdges);
        return removedEdgeSet;
    }

    /**
     * Method to add all connected edges from the
     * specified EdgeSet into the current one.
     * @param edgeSet
     */
    addAllConnected(edgeSet: EdgeSet): EdgeSet {
        const result = new EdgeSet(this.edges);
        let origEdgeSet = new EdgeSet(edgeSet.edges);
        let someAdded = true;
        while (someAdded) {
            someAdded = false;

            // Go through all the edges in edgeSet and see if they are connected to this EdgeSet
            for (let i = 0; i < origEdgeSet.edges.length - 1; i++) {
                if (result.isConnectedTo(origEdgeSet.edges[i])) {
                    result.add(origEdgeSet.edges[i]);

                    // This will cause it to keep going until no possible connections left
                    someAdded = true;
                }
            }
            const beforeLength = origEdgeSet.length();
            origEdgeSet = origEdgeSet.removeAll(result);
            const afterLength = origEdgeSet.length();

            // See if anything was reall added
            if (beforeLength == afterLength) {
                someAdded = false;
            }
        }

        return result;
    }

    sort(): EdgeSet {
        const sortedEdges: Edge[] = this.edges.sort((edge1, edge2) => {
            if (edge2.v1.isEqual(edge2.v2)) {
                return 1;
            }

            if (edge1.v2.isEqual(edge2.v1)) {
                return -1;
            }

            return 0;
        });
        return new EdgeSet(sortedEdges);
    }

    toVertices(): VertexInterface[] {
        const vertices: VertexInterface[] = [];
        this.edges.forEach((e) => {
            if (!vertices.includes(e.v1)) {
                vertices.push(e.v1);
            }
            if (!vertices.includes(e.v2)) {
                vertices.push(e.v2);
            }
        });
        const uniqVertices = vertices.filter(
            (vertex, i, arr) =>
                arr.findIndex(
                    (v) =>
                        v.x === vertex.x && v.y === vertex.y && v.z === vertex.z
                ) === i
        );
        return uniqVertices;
    }
}

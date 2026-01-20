/**
 * Interface to mark items with one or more keys. This can
 * be used to mark items to avoid looping or modifying an item
 * multiple times.
 */
export interface Markable {
    isMarked(key: string): boolean;

    mark(key: string): boolean;

    clearMark(key: string): boolean;

    clearAllMarks(): void;

    getMarks(): string[];
}

export class MarkManager {
    marks: Set<string> = new Set<string>();

    isMarked(key: string): boolean {
        if (this.marks.has(key)) {
            return true;
        }
        return false;
    }

    mark(key: string): boolean {
        if (this.marks.has(key)) {
            return true;
        }
        this.marks.add(key);
        return false;
    }

    clearMark(key: string): boolean {
        if (this.marks.has(key)) {
            this.marks.delete(key);
            return true;
        }
        return false;
    }

    clearAllMarks(): void {
        this.marks.clear();
    }

    getMarks(): string[] {
        return Array.from(this.marks.keys());
    }
}

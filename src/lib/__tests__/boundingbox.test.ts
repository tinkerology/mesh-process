import { BoundingBox } from '../boundingbox';

test('constructor', () => {
    const bb1 = new BoundingBox(0, 1, 2, 10, 11, 12);

    // Make sure all the reciprocal cases work
    expect(bb1.minx).toBe(0);
    expect(bb1.miny).toBe(1);
    expect(bb1.minz).toBe(2);
    expect(bb1.maxx).toBe(10);
    expect(bb1.maxy).toBe(11);
    expect(bb1.maxz).toBe(12);
});

test('isInsideTrue', () => {
    const bb1 = new BoundingBox(0, 1, 2, 10, 11, 12);

    // Make sure all the reciprocal cases work
    expect(bb1.isInside(3, 3, 3)).toBe(true);
    expect(bb1.isInside(4, 4, 4)).toBe(true);
    expect(bb1.isInside(5, 5, 5)).toBe(true);
    expect(bb1.isInside(6, 6, 6)).toBe(true);
    expect(bb1.isInside(7, 7, 7)).toBe(true);
});

test('isInsideFalse', () => {
    const bb1 = new BoundingBox(0, 1, 2, 10, 11, 12);

    // Make sure all the reciprocal cases work
    expect(bb1.isInside(25, 5, 5)).toBe(false);
    expect(bb1.isInside(5, 25, 5)).toBe(false);
    expect(bb1.isInside(5, 5, 25)).toBe(false);
});

test('expandMax', () => {
    const bb1 = new BoundingBox(0, 1, 2, 10, 11, 12);
    bb1.expand(20, 21, 22);

    // Make sure all the reciprocal cases work
    expect(bb1.minx).toBe(0);
    expect(bb1.miny).toBe(1);
    expect(bb1.minz).toBe(2);
    expect(bb1.maxx).toBe(20);
    expect(bb1.maxy).toBe(21);
    expect(bb1.maxz).toBe(22);
});

test('expandMin', () => {
    const bb1 = new BoundingBox(0, 1, 2, 10, 11, 12);
    bb1.expand(-20, -21, -22);

    // Make sure all the reciprocal cases work
    expect(bb1.minx).toBe(-20);
    expect(bb1.miny).toBe(-21);
    expect(bb1.minz).toBe(-22);
    expect(bb1.maxx).toBe(10);
    expect(bb1.maxy).toBe(11);
    expect(bb1.maxz).toBe(12);
});

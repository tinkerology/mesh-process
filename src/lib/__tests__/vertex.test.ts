import { BoundingBox } from '../boundingbox';
import { Util } from '../util';
import { Vertex, VertexInterface } from '../vertex';

test('constructor', () => {
    const v1: VertexInterface = new Vertex(1, 2, 3);
    expect(v1.x).toBe(1);
    expect(v1.y).toBe(2);
    expect(v1.z).toBe(3);
});

test('toString', () => {
    const v1: VertexInterface = new Vertex(1, 2, 3);
    expect(v1.toString()).toBe('Vertex 1, 2, 3');
});

test('clone', () => {
    const v1: VertexInterface = new Vertex(1, 2, 3);
    const v2: VertexInterface = v1.clone();
    expect(v2.x).toBe(1);
    expect(v2.y).toBe(2);
    expect(v2.z).toBe(3);
});

test('isEqual', () => {
    const v1: VertexInterface = new Vertex(1, 2, 3);
    const v2: VertexInterface = new Vertex(1, 2, 3);
    const v3: VertexInterface = new Vertex(2, 2, 3);
    expect(v1.isEqual(v2)).toBe(true);
    expect(v2.isEqual(v1)).toBe(true);
    expect(v1.isEqual(v1)).toBe(true);
    expect(v1.isEqual(v3)).toBe(false);
    expect(v3.isEqual(v1)).toBe(false);
});

test('isInside', () => {
    const v1: VertexInterface = new Vertex(1, 2, 3);
    const v2: VertexInterface = new Vertex(-1, -2, -3);
    const v3: VertexInterface = new Vertex(0, 0, 0);
    const v4: VertexInterface = new Vertex(20, 20, 20);
    expect(v1.isInside(new BoundingBox(0, 0, 0, 10, 10, 10))).toBe(true);
    expect(v1.isInside(new BoundingBox(0, 0, 0, 1, 1, 1))).toBe(false);
    expect(v2.isInside(new BoundingBox(-10, -10, -100, 0, 0, 0))).toBe(true);
    expect(v3.isInside(new BoundingBox(0, 0, 0, 10, 10, 10))).toBe(false);
    expect(v4.isInside(new BoundingBox(0, 0, 0, 21, 30, 40))).toBe(true);
});

test('distance', () => {
    const v1: VertexInterface = new Vertex(10, 0, 0);
    const v2: VertexInterface = new Vertex(0, 0, 0);
    const v3: VertexInterface = new Vertex(-10, 0, 0);
    const v4: VertexInterface = new Vertex(20, 20, 20);
    expect(v1.distance(v2)).toBe(10);
    expect(v1.distance(v3)).toBe(20);
    expect(v2.distance(v4)).toBe(Math.sqrt(20 * 20 + 20 * 20 + 20 * 20));
});

test('scale', () => {
    const v1: VertexInterface = new Vertex(10, 0, 0);
    const v2: VertexInterface = new Vertex(0, 0, 0);
    const v3: VertexInterface = new Vertex(-10, 0, 0);
    const v4: VertexInterface = new Vertex(20, 20, 20);
    expect(v1.scale(new Vertex(2, 2, 2))).toStrictEqual(new Vertex(20, 0, 0));
    expect(v2.scale(new Vertex(2, 2, 2))).toStrictEqual(new Vertex(0, 0, 0));
    expect(v3.scale(new Vertex(2, 2, 2))).toStrictEqual(new Vertex(-20, 0, 0));
    expect(v4.scale(new Vertex(1, 2, 3))).toStrictEqual(new Vertex(20, 40, 60));
    expect(v4.scale(new Vertex(-1, -2, -3))).toStrictEqual(
        new Vertex(-20, -40, -60)
    );
});

test('add', () => {
    const v1: VertexInterface = new Vertex(10, 0, 0);
    const v2: VertexInterface = new Vertex(0, 0, 0);
    const v3: VertexInterface = new Vertex(-10, 0, 0);
    const v4: VertexInterface = new Vertex(20, 20, 20);
    expect(v1.add(new Vertex(2, 2, 2))).toStrictEqual(new Vertex(12, 2, 2));
    expect(v2.add(new Vertex(2, 2, 2))).toStrictEqual(new Vertex(2, 2, 2));
    expect(v3.add(new Vertex(2, 2, 2))).toStrictEqual(new Vertex(-8, 2, 2));
    expect(v4.add(new Vertex(1, 2, 3))).toStrictEqual(new Vertex(21, 22, 23));
    expect(v4.add(new Vertex(-1, -2, -3))).toStrictEqual(
        new Vertex(19, 18, 17)
    );
});

test('mirror', () => {
    const v1: VertexInterface = new Vertex(10, 20, 30);
    const v2: VertexInterface = new Vertex(0, 0, 0);
    const v3: VertexInterface = new Vertex(-10, 0, 0);
    // let v4:VertexInterface = new Vertex(20,20,20);
    expect(v1.mirror(true, true, true)).toStrictEqual(
        new Vertex(-10, -20, -30)
    );
    expect(v1.mirror(true, true, false)).toStrictEqual(
        new Vertex(-10, -20, 30)
    );
    expect(v1.mirror(true, false, false)).toStrictEqual(
        new Vertex(-10, 20, 30)
    );
    expect(v1.mirror(false, false, false)).toStrictEqual(
        new Vertex(10, 20, 30)
    );

    expect(v2.mirror(true, true, true)).toStrictEqual(new Vertex(-0, -0, -0));
    expect(v2.mirror(false, false, false)).toStrictEqual(new Vertex(0, 0, 0));

    expect(v3.mirror(true, true, true)).toStrictEqual(new Vertex(10, -0, -0));
    expect(v3.mirror(false, false, false)).toStrictEqual(new Vertex(-10, 0, 0));
});

test('dot', () => {
    const v1: VertexInterface = new Vertex(10, 0, 0);
    const v2: VertexInterface = new Vertex(0, 10, 0);
    const v3: VertexInterface = new Vertex(0, 0, 10);
    expect(v1.dot(v2)).toBe(0);
    expect(v2.dot(v1)).toBe(0);
    expect(v1.dot(v3)).toBe(0);
    expect(v2.dot(v3)).toBe(0);

    const v4: VertexInterface = new Vertex(10, 10, 0);
    const v5: VertexInterface = new Vertex(10, 0, 0);
    expect(v4.dot(v5)).toBe(100);
});

test('cross', () => {
    const v1: VertexInterface = new Vertex(10, 0, 0);
    const v2: VertexInterface = new Vertex(0, 10, 0);
    const v3: VertexInterface = new Vertex(0, 0, 10);
    expect(v1.cross(v2)).toStrictEqual(new Vertex(0, 0, 100));
    expect(v1.cross(v3)).toStrictEqual(new Vertex(0, -100, 0));
    expect(v2.cross(v3)).toStrictEqual(new Vertex(100, 0, 0));
});

test('rotate', () => {
    // Simple 90 degree rotations from X axis
    const v1: VertexInterface = new Vertex(10, 0, 0);
    expect(v1.rotate(90, 0, 0)).toStrictEqual(new Vertex(10, 0, 0));
    expect(v1.rotate(0, 90, 0)).toStrictEqual(new Vertex(0, 0, -10));
    expect(v1.rotate(0, 0, 90)).toStrictEqual(new Vertex(0, 10, 0));
    expect(v1.rotate(90, 90, 90)).toStrictEqual(new Vertex(0, 0, -10));

    // Test rounded numbers since floating point is not precise
    expect(v1.rotate(0, 0, 45).round(5)).toStrictEqual(
        new Vertex(
            Util.round(Math.sqrt((10 * 10) / 2), 5),
            Util.round(Math.sqrt((10 * 10) / 2), 5),
            0
        )
    );

    // Simple 90 degree rotations from Y axis
    const v2: VertexInterface = new Vertex(0, 10, 0);
    expect(v2.rotate(90, 0, 0)).toStrictEqual(new Vertex(0, 0, 10));
    expect(v2.rotate(0, 90, 0)).toStrictEqual(new Vertex(0, 10, 0));
    expect(v2.rotate(0, 0, 90)).toStrictEqual(new Vertex(-10, 0, 0));

    // let v3:VertexInterface = new Vertex(0,0,10);
});

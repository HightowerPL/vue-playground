interface Point {
    id: string;
    x: number;
    y: number;
}

interface Play {
    id: string;
    position: { x: number; y: number };
    text?: string;
    type?: 'shot' | 'rebound' | 'assist';
    player?: string | number;
    time?: number;

}

export type { Point, Play };
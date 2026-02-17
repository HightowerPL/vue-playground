export interface Play {
    id: string;
    position: { x: number; y: number };
    text?: string;
    type?: 'shot' | 'rebound' | 'assist';
    player?: string | number;
    time?: number;
}

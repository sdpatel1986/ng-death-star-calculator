import { Planet } from './planet';

export interface Person {
    name: string;
    height: number;
    mass: number;
    gender: 'male' | 'female';
    homeworld: number;
}
import { User } from './user';

export class Task {
    id: number;
    description: string;
    state: string;
    user : User = new User();
}
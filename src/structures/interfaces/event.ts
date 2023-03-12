import { ClientEvents } from 'discord.js';

export interface EventOptions {
    name: string;
    emiter: keyof ClientEvents;
    disable?: boolean;
}

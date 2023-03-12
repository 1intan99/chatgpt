import { PermissionsString } from 'discord.js';

export interface CommandOptions {
  name: string;
  aliases: string[];
  userPermissions?: PermissionsString[];
  botPermissions?: PermissionsString[];
  description?: string[];
  developer?: boolean;
  cooldown?: number;
  disable?: boolean;
}

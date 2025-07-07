import { ChatMessage } from '@Types/shared/types';

export type { ChatMessage } from '@Types/shared/types';
export type RequestBody = {
    email: string;
    subject: string;
    message: string | ChatMessage[];
};

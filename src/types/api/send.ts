import { CHAT_MESSAGE_T } from '@Types/shared/types';

export type { CHAT_MESSAGE_T } from '@Types/shared/types';
export type REQUEST_BODY_T = {
    email: string;
    subject: string;
    message: string | CHAT_MESSAGE_T[];
};

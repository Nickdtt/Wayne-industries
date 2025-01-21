import {z} from 'zod';

export const userSchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
});
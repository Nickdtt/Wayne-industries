import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { userSchema } from "./zod/zod_schemas";
import { generateToken } from "./security";
import { get } from "http";





const prisma = new PrismaClient();

export const disconnect = async () => {
    await prisma.$disconnect();
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

export const addSeguranca = async (req: Request, res: Response) => {
    try {
        const {nome, quantidade, preco} = req.body;
        const novoItem = await prisma.seguranca.create({
            data: {
                nome,
                quantidade,
                preco
            }
        });
        res.status(201).json(novoItem);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const addVeiculos = async (req: Request, res: Response) => {
    try {
        const {nome, quantidade, preco} = req.body;
        const novoItem = await prisma.veiculos.create({
            data: {
                nome,
                quantidade,
                preco
            }
        });
        res.status(201).json(novoItem)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}
export const addArmamentos = async (req: Request, res: Response) => {
    try {
        const {nome, quantidade, preco} = req.body;
        const novoItem = await prisma.armamento.create({
            data: {
                nome,
                quantidade,
                preco
            }
        });
        res.status(201).json(novoItem)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const getSeguranca = async (req: Request, res: Response) => {
    try {
        const seguranca = await prisma.seguranca.findMany();
        res.json(seguranca);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

export const getVeiculos = async (req: Request, res: Response) => {
    try {
        const veiculos = await prisma.veiculos.findMany();
        res.json(veiculos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

export const getArmamentos = async (req: Request, res: Response) => {
    try {
        const armamentos = await prisma.armamento.findMany();
        res.json(armamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

//hashing and verifying password

export const passwordHash = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const passwordVerify = async (password: string, hashedPassword: string) => {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
};

//cadastro de usuário

export const registerUser = async (req: Request, res: Response) => {
    try{
        const validateUser = userSchema.parse(req.body);
        const {nome, email, senha} = validateUser;

        const hashedPassword = await passwordHash(senha);

        const newUser = await prisma.user.create({
            data: {
                nome,
                email,
                senha: hashedPassword
            }
        });
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    };
} ;

//informacoes gerais para o dashboard

export const getMenuItems = async (req: Request, res: Response) => {
    try {
        const geral = await prisma.geral.findMany();
        res.json(geral);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

//login

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const {email, senha} = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
          
        }
        
        const isPassworValid = await passwordVerify(senha, user.senha);

        if (!isPassworValid) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = generateToken(user.email);

        const redirectUrl = user.admin? '/dashboard' : '/logado';

        res.status(200).json({ 
            access_token: token,
            token_type: 'bearer',
            redirectUrl: redirectUrl
         });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
    
};
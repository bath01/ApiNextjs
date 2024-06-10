import prisma from "@/lib/prismaClient";
import bcrypt from "bcrypt";

export const createUser = async (data) => {
  try {
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Vérification de l'existence de l'e-mail
    if (data.email !== undefined) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingEmail) {
        throw new Error("Email is already in use");
      }
    }

    // Vérification de l'existence du nom d'utilisateur
    if (data.username !== undefined) {
      const existingUsername = await prisma.user.findUnique({
        where: { username: data.username },
      });

      if (existingUsername) {
        throw new Error("Username is already in use");
      }
    }

    // Création de l'utilisateur dans la base de données
    const result = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
      },
    });

    // Retour du résultat de la création de l'utilisateur
    return result;
  } catch (error) {
    // Gestion des erreurs et renvoi d'une erreur générique
    throw new Error(error.message);
  }
};


export const getUserbyEmail = async (email) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

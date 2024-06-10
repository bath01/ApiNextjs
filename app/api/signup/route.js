import z from "zod";
import { NextResponse } from "next/server";
import { createUser } from "@/utils/dbUtils/user"; // Assurez-vous que le chemin est correct

const createUserSchema = z
  .object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
  })
  .strict();

function validateUserSchema(data) {
  try {
    const parseData = createUserSchema.parse(data);
    return parseData;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const POST = async (request) => {
  try {
    const json = await request.json();

    const validatedUser = validateUserSchema(json);

    // Affichez les données validées à des fins de débogage
    console.log("Validated User:", validatedUser);

    // Assurez-vous que la fonction createUser est correctement définie
    const createUserResult = await createUser(validatedUser);

    // Affichez le résultat de la création de l'utilisateur à des fins de débogage
    console.log("Create User Result:", createUserResult);

    return NextResponse(createUserResult, { status: 200 });
  } catch (error) {
    // Journalisez l'erreur pour le débogage
    console.error("Error:", error);

    return NextResponse(error.message, { status: 500 });
  }
};

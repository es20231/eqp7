import { randomBytes } from "crypto";
import { ZodError, ZodSchema } from "zod";

const generateRandomId = () => randomBytes(16).toString("hex");

const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

const handleZodParse = (object: object, schema: ZodSchema) => {
  try {
    const payload = schema.parse(object);
    return { ok: true, payload };
  } catch (error) {
    if (error instanceof ZodError) {
      return { ok: false, payload: error.issues };
    } else {
      console.log(error);
      return { ok: false, payload: "Internal Server Error" };
    }
  }
};

export { delay, generateRandomId, handleZodParse };

"use server";

import { parseWithZod } from "@conform-to/zod";
import { loginSchema } from "./schema";

export async function login(_prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log("success", submission.value);
}
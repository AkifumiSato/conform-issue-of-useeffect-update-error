"use client";

import { useForm } from "@conform-to/react";
import { useEffect } from "react";
import { useFormState } from 'react-dom';
import { parseWithZod } from "@conform-to/zod";
import { loginSchema } from "./schema";
import { login } from "./action";
import { useHydrated } from "./utils";

export function LoginForm() {
  const [lastResult, action] = useFormState(login, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
  });
  const hydrated = useHydrated()

  useEffect(() => {
    // force update
    console.log({ hydrated })
    if (hydrated) {
      form.update({ name: fields.email.name, value: "test" });
    }
  }, [hydrated]);

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      <div>
        <label>Email</label>
        <input type="email" name={fields.email.name} />
        <div>{fields.email.errors}</div>
      </div>
      <div>
        <label>Password</label>
        <input type="password" name={fields.password.name} />
        <div>{fields.password.errors}</div>
      </div>
      <label>
        <div>
          <span>Remember me</span>
          <input type="checkbox" name={fields.remember.name} />
        </div>
      </label>
      <button>Login</button>
    </form>
  );
}
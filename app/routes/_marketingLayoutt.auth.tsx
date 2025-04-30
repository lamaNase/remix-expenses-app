import "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";
import { validateCredentials } from "~/data/validation.server";
import { login, signup } from "~/data/auth.server";

export default function Authentication() {
    return (
        <AuthForm />
    );
}

export async function action(request) {
    const searchPArams = new URL(request.request.url).searchParams;
    const mode = searchPArams.get("mode") || "login";

    const formData = await request.request.formData();
    const credantials = Object.fromEntries(formData);

    try {
        validateCredentials(credantials);
    } catch (error) {
        return error;
    }

    try {
        if (mode == "login") {
            return await login(credantials.email, credantials.password);
        } else {
            return await signup(credantials.email, credantials.password);
        }
    } catch (error){
        return error;
    }
}

export function meta() {
    return [{
      title: "Login or Sign Up",
      description: "Access your account or create a new one to start managing your expenses securely."
    }];
}

export function headers(receivedHeaders) {
    return {
      'Cache-Control': receivedHeaders.parentHeaders.get("Cache-Control")
    };
}

export const handle = {disabled: true};
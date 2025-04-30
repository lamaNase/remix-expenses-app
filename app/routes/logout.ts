import { distroyUserSession } from "~/data/auth.server";

export async function action(request) {
    if(request.request.method !== "POST"){
        throw {mesage: "Invalid request method"};
    }

    return await distroyUserSession(request.request);
}
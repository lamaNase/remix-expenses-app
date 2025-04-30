import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";
import "~/styles/marketing.css";

export default function MarketingLayout() {
    return (
        <>
            < MainHeader />
            < Outlet />
        </>
    );
}

export async function loader(request) {
    return await getUserFromSession(request.request);
}

export function headers() {
    return {
      'Cache-Control': 'max-age-3600'
    };
}
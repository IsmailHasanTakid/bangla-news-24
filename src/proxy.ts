import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        const signupUrl = new URL("/signup", request.url);

        signupUrl.searchParams.set(
            "callbackUrl",
            request.nextUrl.pathname + request.nextUrl.search
        );

        return NextResponse.redirect(signupUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/details/:path*", "/profile/:path*", "/weather/charts/:path*"],
};
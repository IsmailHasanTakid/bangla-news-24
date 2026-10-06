import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";


export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });
    if (!session) {
        return NextResponse.redirect(new URL("/signup", request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/details/:path*", "/profile/:path*"],
};
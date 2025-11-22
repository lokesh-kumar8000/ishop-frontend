import { NextResponse } from "next/server";

function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin")) {
    const admin_token = req.cookies.get("admin_token");
    console.log(admin_token, "admin_token");
    if (!admin_token) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }
  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: ["/admin/:path*"],
};

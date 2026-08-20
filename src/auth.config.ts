import type { NextAuthConfig } from "next-auth"

export default {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
      const isLoginRoute = request.nextUrl.pathname === "/admin/login"
      if (isLoginRoute) return true
      if (isAdminRoute) return !!auth?.user
      return true
    },
  },
} satisfies NextAuthConfig

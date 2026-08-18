import type React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
	robots: { index: false, follow: false },
};

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	return (
		<div className="min-h-screen bg-[#19191c] text-gray-200 font-aeonik">
			{session?.user && (
				<header className="border-b border-[#ffffff0f] bg-[#19191c]">
					<div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
						<Link href="/admin" className="text-lg font-bold text-gray-100">
							Painel <span className="text-rose-500">Gwapo</span>
						</Link>
						<div className="flex items-center gap-4">
							<Link
								href="/projetos"
								target="_blank"
								className="text-sm font-medium text-gray-400 transition-colors hover:text-gray-100"
							>
								Ver site
							</Link>
							<span className="text-sm text-gray-400">{session.user.email}</span>
							<form
								action={async () => {
									"use server";
									await signOut({ redirectTo: "/admin/login" });
								}}
							>
								<button
									type="submit"
									className="rounded-full border border-[#ffffff1f] px-4 py-1.5 text-sm font-medium text-gray-200 transition-colors hover:bg-white/5"
								>
									Sair
								</button>
							</form>
						</div>
					</div>
				</header>
			)}
			<main className="mx-auto max-w-5xl px-5 py-10">{children}</main>
		</div>
	);
}

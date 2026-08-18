import type React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { LogOut } from "lucide-react";
import { auth, signOut } from "@/auth";
import { AdminNav } from "./admin-nav";
import Image from "next/image";

export const metadata: Metadata = {
	robots: { index: false, follow: false },
};

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session?.user) {
		return <div className="min-h-screen bg-[#0f0f11] text-gray-200 font-aeonik">{children}</div>;
	}

	return (
		<div className="min-h-screen bg-[#0f0f11] text-gray-200 font-aeonik">
			<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
				<div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-rose-500/10 blur-[120px]" />
				<div className="absolute top-1/3 right-0 h-[300px] w-[300px] rounded-full bg-rose-500/5 blur-[100px]" />
			</div>

			{/* Mobile top bar */}
			<header className="sticky top-0 z-30 border-b border-white/5 bg-[#0f0f11]/90 backdrop-blur-md md:hidden">
				<div className="flex items-center justify-between gap-4 px-5 py-4">
					<Link href="/admin" className="flex items-center space-x-3">
						<Image
							src="/logos-svg/5.svg"
							alt="Gwapo"
							width={144}
							height={144}
							className="w-36 h-fit object-contain rounded"
						/>
					</Link>
					<form
						action={async () => {
							"use server";
							await signOut({ redirectTo: "/admin/login" });
						}}
					>
						<button
							type="submit"
							className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors hover:bg-white/5"
						>
							Sair
						</button>
					</form>
				</div>
				<div className="px-5 pb-4">
					<AdminNav variant="mobile" />
				</div>
			</header>

			<div className="relative z-10 mx-auto flex max-w-[1400px]">
				{/* Desktop sidebar */}
				<aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/5 px-4 py-6 md:flex">
					<Link href="/admin" className="flex items-center space-x-3 border-b border-white/5">
						<Image
							src="/logos-svg/5.svg"
							alt="Gwapo"
							width={144}
							height={144}
							className="w-36 h-36 object-contain rounded"
						/>
					</Link>

					<div className="mt-8 flex-1">
						<AdminNav />
					</div>

					<div className="flex flex-col gap-3 border-t border-white/5 pt-4">
						<div className="flex items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2.5">
							<span className="truncate text-xs text-gray-400">{session.user.email}</span>
							<form
								action={async () => {
									"use server";
									await signOut({ redirectTo: "/admin/login" });
								}}
							>
								<button
									type="submit"
									aria-label="Sair"
									className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-gray-100"
								>
									<LogOut className="h-4 w-4" />
								</button>
							</form>
						</div>
					</div>
				</aside>

				<main className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-10">{children}</main>
			</div>
		</div>
	);
}

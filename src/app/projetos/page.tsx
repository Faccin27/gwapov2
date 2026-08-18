import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { getProjects } from "@/lib/projects-db";
import { ProjectsGrid } from "./projects-grid";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
	const projects = await getProjects();

	return (
		<div className="min-h-screen bg-[#19191c] text-gray-200">
			<Header />

			<div className="animate-lighting absolute -top-12 left-0 z-0 h-screen w-[200vw] -translate-x-[25%] translate-y-8 rotate-12 overflow-hidden blur-3xl md:w-full bg-[image:radial-gradient(ellipse_390px_50px_at_10%_30%,_rgba(254,_149,_103,_0.5)_0%,_rgba(254,_149,_103,_0)_70%),_radial-gradient(ellipse_1100px_170px_at_15%_40%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%),_radial-gradient(ellipse_1200px_180px_at_30%_30%,_rgba(253,_54,_110,_0.4)_0%,_rgba(253,_54,_110,_0)_70%)] bg-position-[0%_0%] pointer-events-none" />

			<div className="w-[300px] h-[400px] absolute bottom-[-40dvh] right-[1%] bg-rose-500/20 blur-[80px] z-0" />

			<div className="max-w-7xl mx-auto px-6 pt-40 md:pt-48 pb-12">
				<h1 className="text-3xl font-bold text-foreground mb-8">
					Todos os Projetos<span className="text-rose-500">_</span>
				</h1>

				<ProjectsGrid projects={projects} />
			</div>

			<Footer />
		</div>
	);
}

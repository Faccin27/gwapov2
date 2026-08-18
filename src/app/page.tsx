import { getSiteContent } from "@/lib/site-content";
import { Footer } from "@/components/footer";
import HomeClient from "@/components/home-client";

export const revalidate = 300;

export default async function Home() {
	const content = await getSiteContent();

	return (
		<HomeClient
			heroContent={{
				badge: content.heroBadge,
				title: content.heroTitle,
				description: content.heroDescription,
				primaryButtonText: content.heroPrimaryButtonText,
				primaryButtonLink: content.heroPrimaryButtonLink,
				secondaryButtonText: content.heroSecondaryButtonText,
			}}
			footer={<Footer />}
		/>
	);
}

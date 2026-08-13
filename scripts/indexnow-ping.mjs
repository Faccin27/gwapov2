// Pings IndexNow (Bing/Yandex/Naver) with the site's current URLs.
// Run manually after a deploy with meaningful content changes: node scripts/indexnow-ping.mjs
const key = "bd0711fb3271f58ea9822ec04f8987e8";
const host = "www.gwapo.com.br";
const urlList = [
	"https://www.gwapo.com.br/",
	"https://www.gwapo.com.br/producoes",
	"https://www.gwapo.com.br/servicos",
	"https://www.gwapo.com.br/projetos",
	"https://www.gwapo.com.br/contato",
];

const res = await fetch("https://api.indexnow.org/indexnow", {
	method: "POST",
	headers: { "Content-Type": "application/json; charset=utf-8" },
	body: JSON.stringify({
		host,
		key,
		keyLocation: `https://${host}/${key}.txt`,
		urlList,
	}),
});

console.log(`IndexNow ping: ${res.status} ${res.statusText}`);

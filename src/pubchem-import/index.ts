import fetch from "node-fetch";
import { RateLimiter } from "limiter";
import { RawCompound } from "./types";
import getNecessaryData from "./parseData.js";

const _parseInt = (x: string) => parseInt(x);

const [startId, endId, compoundId] = process.argv.slice(2).map(_parseInt);
const API_URL = "https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/";

async function fetchJson(compoundId: number): Promise<RawCompound> {
	return (await (await fetch(API_URL + compoundId + "/JSON")).json()) as Promise<RawCompound>;
}

async function init() {
	const ids: number[] = [];

	for (let i = compoundId; i < compoundId + (endId - startId + 1); i++) {
		ids.push(i);
	}

	if (ids.length === 0) {
		return;
	}

	const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 250 });

	async function throttleRequest(id: number) {
		await limiter.removeTokens(1);

		if (id === undefined) {
			return;
		}
		const result = await fetchJson(id);
		return getNecessaryData(result.Record);
	}

	ids.forEach(async (id) => {
		await throttleRequest(id).then((e) => {
			//eslint-disable-next-line
			console.log(e?.RecordTitle);
		});
	});
}

init();

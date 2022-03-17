/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { PrismaClient, Elements, Isotopes } from '@prisma/client';
import { readFileSync } from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const elements = readFile<Elements[]>('elements');
const isotopes = readFile<Isotopes[]>('isotopes');

function readFile<T>(fileName: string): T {
	const filePath = path.resolve(`prisma/data/${fileName}.json`);
	const data = readFileSync(filePath, 'utf-8');
	const json = JSON.parse(data);
	transform(json);
	return json;
}
function transform(json: any) {
	for (const i in json) {
		for (const k of Object.keys(json[i])) {
			if (k.indexOf('-') === -1) continue;

			const oldKey = k;
			const newKey = k.replace('-', '_');
			const value = json[i][oldKey];

			json[i][newKey] = value;
			delete json[i][oldKey];
		}
	}
}

async function importIsotopes() {
	console.info(`Importing Isotopes...`);
	for (const i of isotopes) {
		await prisma.isotopes.create({
			data: i
		});
		console.info('.');
	}
	console.info(`${isotopes.length} Isotopes imported`);
}

async function importElements() {
	console.info(`Importing Elements...`);
	for (const e of elements) {
		await prisma.elements.create({
			data: e
		});
		console.info('.');
	}
	console.info(`${elements.length} Elements imported.`);
}

async function main() {
	console.info(`Start seeding...`);
	await importElements();
	await importIsotopes();
	console.info(`Seeding finished.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

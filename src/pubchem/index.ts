import PubChemService from './service';
import { PrismaClient } from '@prisma/client';
import { notEmpty, parseIntMap } from './utils';
import { AxiosError } from 'axios';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const [from, to] = process.argv.slice(2).map(parseIntMap);

export default async function init(from: number, to: number) {
	const service = new PubChemService();
	const prisma = new PrismaClient();
	const compounds = service.getCompounds(from, to);
	const failIds: number[] = [];
	await compounds
		.then(async (_res) => {
			const res = _res.filter(notEmpty);
			await prisma.compounds.createMany({
				data: [
					...res.map((compound) => {
						return { ...compound };
					})
				],
				skipDuplicates: true
			});
		})
		.catch((error: AxiosError | PrismaClientKnownRequestError) => {
			if (error && 'config' in error && error.config && error.config.url) {
				const splitted = error.config.url.split('/');
				const id = parseInt(splitted[splitted.length - 2]);

				failIds.push(id);
			}
		});
}

init(from, to);

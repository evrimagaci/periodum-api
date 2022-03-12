import { AxiosResponse } from 'axios';
import { readFileSync } from 'fs';
import path from 'path';

export const getCompoundById = (): AxiosResponse => {
	//FIX: If parameter (id: number) set it combines with URL and path.
	return getCompound(222);
};

function getCompound(id: number) {
	const filePath = path.resolve(`tests/pubchem/fixtures/${id}.json`);
	const data = readFileSync(filePath, 'utf8');
	return { data: JSON.parse(data) } as AxiosResponse;
}

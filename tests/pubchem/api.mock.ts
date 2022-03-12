import { AxiosResponse } from 'axios';
import { readFileSync } from 'fs';
import path from 'path';

export const getCompoundById = (): AxiosResponse => {
	const filePath = path.resolve(`tests/pubchem/fixtures/222.json`);
	const data = readFileSync(filePath, 'utf8');
	return { data: JSON.parse(data) } as AxiosResponse;
};

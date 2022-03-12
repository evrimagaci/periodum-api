import axios, { AxiosResponse } from 'axios';

class PubChemApi {
	private apiUrl =
		'https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound';

	async getCompoundById(id: number): Promise<AxiosResponse> {
		const url = `${this.apiUrl}/${id}/JSON`;
		return await axios.get(url);
	}
}

export default PubChemApi;

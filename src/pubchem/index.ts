import PubChemService from './service';

const _parseInt = (x: string) => parseInt(x);

const [from, to] = process.argv.slice(2).map(_parseInt);

export default async function init(from: number, to: number) {
	const service = new PubChemService();
	service.getCompounds(from, to).then((res) => {
		//eslint-disable-next-line
		console.log(res);
	});
}

init(from, to);

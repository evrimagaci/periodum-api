import PubChemService from './service';
import { PrismaClient } from '@prisma/client';
const _parseInt = (x: string) => parseInt(x);

const [from, to] = process.argv.slice(2).map(_parseInt);

function notEmpty<T>(value: T | void): value is T {
	return value ? true : false;
}

export default async function init(from: number, to: number) {
	const service = new PubChemService();
	const prisma = new PrismaClient();
	await service.getCompounds(from, to).then(async (_res) => {
		//TODO I will move this create logic into a seperate file

		//eslint-disable-next-line
		const res = _res.filter(notEmpty);
		// console.log(res);
		await prisma.compounds.createMany({
			data: [
				...res.map((x) => {
					// Use this line after fixing the TODO in schema.prisma
					// return {...x};

					return {
						id: x.RecordNumber,
						RecordNumber: x.RecordNumber,
						RecordTitle: x.RecordTitle,
						IUPACName: x.IUPACName,
						InChI: x.InChI,
						InChIKey: x.InChIKey,
						CanonicalSMILES: x.CanonicalSMILES,
						ICSCNumber: x.ICSCNumber,
						RTECSNumber: x.RTECSNumber,
						UNII: x.UNII,
						FEMANumber: x.FEMANumber,
						DSSToxSubstanceID: x.DSSToxSubstanceID,
						NCIThesaurusCode: x.NCIThesaurusCode,
						MolecularWeight: x.MolecularWeight,
						CompoundIsCanonicalized: x.CompoundIsCanonicalized,
						XLogP3: x.XLogP3,
						HydrogenBondDonorCount: x.HydrogenBondDonorCount,
						HydrogenBondAcceptorCount: x.HydrogenBondAcceptorCount,
						RotatableBondCount: x.RotatableBondCount,
						ExactMass: x.ExactMass,
						MonoisotopicMass: x.MonoisotopicMass,
						TopologicalPolarSurfaceArea: x.TopologicalPolarSurfaceArea,
						HeavyAtomCount: x.HeavyAtomCount,
						FormalCharge: x.FormalCharge,
						Complexity: x.Complexity,
						IsotopeAtomCount: x.IsotopeAtomCount,
						DefinedAtomStereocenterCount: x.DefinedAtomStereocenterCount,
						UndefinedAtomStereocenterCount: x.UndefinedAtomStereocenterCount,
						DefinedBondStereocenterCount: x.DefinedBondStereocenterCount,
						UndefinedBondStereocenterCount: x.UndefinedBondStereocenterCount,
						CovalentlyBondedUnitCount: x.CovalentlyBondedUnitCount,
						Taste: x.Taste,
						LogP: x.LogP,
						HenrysLawConstant: x.HenrysLawConstant,
						AtmosphericOHRateConstant: x.AtmosphericOHRateConstant,
						StabilityShelfLife: x.StabilityShelfLife,
						Viscosity: x.Viscosity,
						HeatofCombustion: x.HeatofCombustion,
						HeatofVaporization: x.HeatofVaporization,
						pH: x.pH,
						SurfaceTension: x.SurfaceTension,
						IonizationPotential: x.IonizationPotential,
						Polymerization: x.Polymerization,
						RefractiveIndex: x.RefractiveIndex,
						FoodAdditiveClasses: x.FoodAdditiveClasses,
						AgrochemicalCategory: x.AgrochemicalCategory
					};
				})
			],
			skipDuplicates: true
		});

		// await prisma.compounds
		// 	.findMany({
		// 		where: {
		// 			id: {
		// 				in: res.map((x) => x.RecordNumber)
		// 			}
		// 		}
		// 	})
		// 	.then((_res) => {
		// 		console.log(_res);
		// 	});
	});
}

init(from, to);

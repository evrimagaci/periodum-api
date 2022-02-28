import { PubChemCompound } from './types';
import type { BaseSection, DataKeys, Markup, Value } from './types';
type ObjectOfAny = { [key: string]: any };
type Resolver = (
	data: Record<string, unknown>
) => Record<string, unknown> | Record<string, unknown>[];

const NoData = 'N/A';
const dataPaths: {
	name: string;
	sectionPath: string[];
	dataPath: DataKeys[];
	resolver?: Resolver;
}[] = [
	{
		name: 'ChemicalSafety',
		sectionPath: ['Chemical Safety'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'Markup'],
		resolver: (data: Markup) => {
			return { Extra: data.Extra, Type: data.Type, URL: data.URL };
		}
	},
	{
		name: 'RecordDescription',
		sectionPath: ['Names and Identifiers', 'Record Description'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'IUPACName',
		sectionPath: [
			'Names and Identifiers',
			'Computed Descriptors',
			'IUPAC Name'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'InChI',
		sectionPath: ['Names and Identifiers', 'Computed Descriptors', 'InChI'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'InChIKey',
		sectionPath: ['Names and Identifiers', 'Computed Descriptors', 'InChI Key'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'CanonicalSMILES',
		sectionPath: [
			'Names and Identifiers',
			'Computed Descriptors',
			'Canonical SMILES'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'MolecularFormula',
		sectionPath: ['Names and Identifiers', 'Molecular Formula'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},

	{
		name: 'CAS',
		sectionPath: ['Names and Identifiers', 'Other Identifiers', 'CAS'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'RelatedCAS',
		sectionPath: ['Names and Identifiers', 'Other Identifiers', 'Related CAS'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'EuropeanCommunityNumber',
		sectionPath: [
			'Names and Identifiers',
			'Other Identifiers',
			'European Community (EC) Number'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'ICSCNumber',
		sectionPath: ['Names and Identifiers', 'Other Identifiers', 'ICSC Number'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'RTECSNumber',
		sectionPath: ['Names and Identifiers', 'Other Identifiers', 'RTECS Number'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'UNNumber',
		sectionPath: ['Names and Identifiers', 'Other Identifiers', 'UN Number'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'UNII',
		sectionPath: ['Names and Identifiers', 'Other Identifiers', 'UNII'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'FEMANumber',
		sectionPath: ['Names and Identifiers', 'Other Identifiers', 'FEMA Number'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'DSSToxSubstanceID',
		sectionPath: [
			'Names and Identifiers',
			'Other Identifiers',
			'DSSTox Substance ID'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'Wikipedia',
		sectionPath: ['Names and Identifiers', 'Other Identifiers', 'Wikipedia'],
		dataPath: ['Information', 'URL']
	},
	{
		name: 'NCIThesaurusCode',
		sectionPath: [
			'Names and Identifiers',
			'Other Identifiers',
			'NCI Thesaurus Code'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},

	{
		name: 'MolecularWeight',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Molecular Weight'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'CompoundIsCanonicalized',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Compound Is Canonicalized'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'XLogP3',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'XLogP3'
		],
		dataPath: ['Information', 'Value', 'Number']
	},

	{
		name: 'HydrogenBondDonorCount',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Hydrogen Bond Donor Count'
		],
		dataPath: ['Information', 'Value', 'Number']
	},
	{
		name: 'HydrogenBondAcceptorCount',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Hydrogen Bond Acceptor Count'
		],
		dataPath: ['Information', 'Value', 'Number']
	},
	{
		name: 'RotatableBondCount',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Rotatable Bond Count'
		],
		dataPath: ['Information', 'Value', 'Number']
	},
	{
		name: 'ExactMass',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Exact Mass'
		],
		dataPath: ['Information', 'Value'],
		resolver: (data: Value) => {
			return {
				String: extractFromArrayIfOneItem(
					resolveData(data, ['StringWithMarkup', 'String'])
				),
				Unit: extractFromArrayIfOneItem(resolveData(data, ['Unit']))
			};
		}
	},
	{
		name: 'MonoisotopicMass',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Monoisotopic Mass'
		],
		dataPath: ['Information', 'Value'],
		resolver: (data: Value) => {
			return {
				String: extractFromArrayIfOneItem(
					resolveData(data, ['StringWithMarkup', 'String'])
				),
				Unit: extractFromArrayIfOneItem(resolveData(data, ['Unit']))
			};
		}
	},
	{
		name: 'TopologicalPolarSurfaceArea',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Topological Polar Surface Area'
		],
		dataPath: ['Information', 'Value'],
		resolver: (data: Value) => {
			return {
				Number: extractFromArrayIfOneItem(resolveData(data, ['Number'])),
				Unit: extractFromArrayIfOneItem(resolveData(data, ['Unit']))
			};
		}
	},
	{
		name: 'HeavyAtomCount',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Heavy Atom Count'
		],
		dataPath: ['Information', 'Value', 'Number']
	},
	{
		name: 'FormalCharge',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Formal Charge'
		],
		dataPath: ['Information', 'Value', 'Number']
	},
	{
		name: 'Complexity',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Complexity'
		],
		dataPath: ['Information', 'Value', 'Number']
	},

	{
		name: 'IsotopeAtomCount',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Isotope Atom Count'
		],
		dataPath: ['Information', 'Value', 'Number']
	},
	{
		name: 'DefinedAtomStereocenterCount',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Defined Atom Stereocenter Count'
		],
		dataPath: ['Information', 'Value', 'Number']
	},
	{
		name: 'UndefinedAtomStereocenterCount',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Undefined Atom Stereocenter Count'
		],
		dataPath: ['Information', 'Value', 'Number']
	},
	{
		name: 'DefinedBondStereocenterCount',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Defined Bond Stereocenter Count'
		],
		dataPath: ['Information', 'Value', 'Number']
	},
	{
		name: 'UndefinedBondStereocenterCount',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Undefined Bond Stereocenter Count'
		],
		dataPath: ['Information', 'Value', 'Number']
	},
	{
		name: 'Covalently-BondedUnitCount',
		sectionPath: [
			'Chemical and Physical Properties',
			'Computed Properties',
			'Covalently-Bonded Unit Count'
		],
		dataPath: ['Information', 'Value', 'Number']
	},

	{
		name: 'PhysicalDescription',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Physical Description'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'ColorForm',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Color/Form'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'Odor',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Odor'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'Taste',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Taste'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'BoilingPoint',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Boiling Point'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'MeltingPoint',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Melting Point'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'FlashPoint',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Flash Point'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'Solubility',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Solubility'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'Density',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Density'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'VaporDensity',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Vapor Density'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'VaporPressure',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Vapor Pressure'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'LogP',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'LogP'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'HenrysLawConstant',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Henrys Law Constant'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'AtmosphericOHRateConstant',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Atmospheric OH Rate Constant'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'Stability/ShelfLife',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Stability/Shelf Life'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'AutoignitionTemperature',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Autoignition Temperature'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'Decomposition',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Decomposition'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'Viscosity',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Viscosity'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'Corrosivity',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Corrosivity'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'HeatofCombustion',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Heat of Combustion'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'HeatofVaporization',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Heat of Vaporization'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'pH',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'pH'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'SurfaceTension',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Surface Tension'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'IonizationPotential',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Ionization Potential'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'Polymerization',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Polymerization'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'OdorThreshold',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Odor Threshold'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'RefractiveIndex',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Refractive Index'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'DissociationConstants',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Dissociation Constants'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'KovatsRetentionIndex',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Kovats Retention Index'
		],
		dataPath: ['Information', 'Value', 'Number']
	},
	{
		name: 'OtherExperimentalProperties',
		sectionPath: [
			'Chemical and Physical Properties',
			'Experimental Properties',
			'Other Experimental Properties'
		],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'FoodAdditiveClasses',
		sectionPath: ['Food Additives and Ingredients', 'Food Additive Classes'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	},
	{
		name: 'AgrochemicalCategory',
		sectionPath: ['Agrochemical Information', 'Agrochemical Category'],
		dataPath: ['Information', 'Value', 'StringWithMarkup', 'String']
	}
];

const findSection =
	(parentSection: BaseSection<string> | PubChemCompound) =>
	(targetSectionHeading: string) =>
		parentSection.Section?.find((x) => x.TOCHeading === targetSectionHeading);

const getFromObject = (
	obj: ObjectOfAny | ObjectOfAny[],
	path: string
): Record<string, unknown> | Record<string, unknown>[] => {
	if (Array.isArray(obj)) {
		return [...new Set(obj.map((x) => getFromObject(x, path)).flat())].filter(
			(x) => x !== undefined
		);
	}
	return obj[path];
};

const resolveData = (
	parent: ObjectOfAny,
	dataPath: string[]
): ObjectOfAny | ObjectOfAny[] | typeof NoData => {
	if (dataPath.length === 0) {
		return parent;
	}
	const [head, ...tail] = dataPath;
	const next = getFromObject(parent, head);
	if (
		!next ||
		(Array.isArray(next) && extractFromArrayIfOneItem(next) === undefined)
	) {
		return NoData;
	} else {
		return resolveData(next, tail);
	}
};

const extractFromArrayIfOneItem = (val: unknown) => {
	if (val && Array.isArray(val) && val.length === 1) {
		return val[0];
	}
	return val;
};

export default function getNecessaryData(
	raw: PubChemCompound
): PubChemCompound {
	let res = {} as PubChemCompound;
	res = { ...res, RecordTitle: raw.RecordTitle };
	res = { ...res, RecordNumber: raw.RecordNumber };
	dataPaths.forEach(({ name, sectionPath, dataPath, resolver }) => {
		// if (name === "MeltingPoint") {
		const section = [...sectionPath].reduce((acc, cur, i, arr) => {
			if (Object.keys(acc).length === 0) {
				const foundSection = findSection(raw)(cur);
				if (!foundSection) {
					arr.splice(i, 1);
					return acc;
				}
				return foundSection;
			}
			return findSection(acc)(cur) || acc;
		}, {} as BaseSection<string>);
		let data = extractFromArrayIfOneItem(resolveData(section, dataPath));
		if (resolver && data && data !== NoData) {
			if (Array.isArray(data)) {
				data = data.map(resolver);
			} else {
				data = resolver(data);
			}
		}
		res = { ...res, [name]: data };
		// console.log(data, name);
		// }
	});
	return res;
}

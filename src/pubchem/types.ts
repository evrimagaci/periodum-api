export type DataKeys =
	| keyof BaseSection<string>
	| keyof Information
	| keyof Value
	| keyof StringWithMarkup
	| keyof Markup;

export interface Markup {
	URL?: string;
	Type?: string;
	Extra?: string;
}

export interface StringWithMarkup {
	String: string;
	Markup: Markup;
}

export interface Value {
	Number?: number[];
	Unit?: string;
	StringWithMarkup?: StringWithMarkup[];
}

export interface Information {
	URL?: string;
	Value: {
		Number?: [number];
		Unit?: string;
		StringWithMarkup: [
			{
				String: string;
				Markup: { URL: string; Type: string; Extra: string }[];
			}
		];
	};
}

export interface BaseSection<T, U = string> {
	TOCHeading: T;
	Description: string;
	Information: Information[];
	Section?: BaseSection<U>[];
}
export type RawChemicalSafety = BaseSection<'Chemical Safety'>;

export interface NamesAndIdentifiers
	extends BaseSection<'Names and Identifiers'> {
	Section: [
		BaseSection<'Record Description'>,
		BaseSection<'Computed Descriptors', 'IUPAC Name'>,
		BaseSection<'Computed Descriptors', 'InChI'>,
		BaseSection<'Computed Descriptors', 'InChI Key'>,
		BaseSection<'Computed Descriptors', 'Canonical SMILES'>,
		BaseSection<'Molecular Formula'>,
		BaseSection<'Other Identifiers'>,
		BaseSection<'Other Identifiers', 'CAS'>,
		BaseSection<'Other Identifiers', 'Related CAS'>,
		BaseSection<'Other Identifiers', 'European Community (EC) Number'>,
		BaseSection<'Other Identifiers', 'ICSC Number'>,
		BaseSection<'Other Identifiers', 'RTECS Number'>,
		BaseSection<'Other Identifiers', 'UN Number'>,
		BaseSection<'Other Identifiers', 'UNII'>,
		BaseSection<'Other Identifiers', 'FEMA Number'>,
		BaseSection<'Other Identifiers', 'DSSTox Substance ID'>,
		BaseSection<'Other Identifiers', 'Wikipedia'>,
		BaseSection<'Other Identifiers', 'NCI Thesaurus Code'>
	];
}

export interface ChemicalAndPhysicalProperties
	extends BaseSection<'Chemical and Physical Properties'> {
	Section: [
		BaseSection<'Computed Properties', 'Molecular Weight'>,
		BaseSection<'Computed Properties', 'XLogP3'>,
		BaseSection<'Computed Properties', 'Hydrogen Bond Donor Count'>,
		BaseSection<'Computed Properties', 'Hydrogen Bond Acceptor Count'>,
		BaseSection<'Computed Properties', 'Rotatable Bond Count'>,
		BaseSection<'Computed Properties', 'Exact Mass'>,
		BaseSection<'Computed Properties', 'Monoisotopic Mass'>,
		BaseSection<'Computed Properties', 'Topological Polar Surface Area'>,
		BaseSection<'Computed Properties', 'Heavy Atom Count'>,
		BaseSection<'Computed Properties', 'Formal Charge'>,
		BaseSection<'Computed Properties', 'Complexity'>,
		BaseSection<'Computed Properties', 'Isotope Atom Count'>,
		BaseSection<'Computed Properties', 'Defined Atom Stereocenter Count'>,
		BaseSection<'Computed Properties', 'Undefined Atom Stereocenter Count'>,
		BaseSection<'Computed Properties', 'Defined Bond Stereocenter Count'>,
		BaseSection<'Computed Properties', 'Undefined Bond Stereocenter Count'>,
		BaseSection<'Computed Properties', 'Covalently-Bonded Unit Count'>,
		BaseSection<'Computed Properties', 'Compound Is Canonicalized'>,

		BaseSection<'Experimental Properties', 'Physical Description'>,
		BaseSection<'Experimental Properties', 'Color/Form'>,
		BaseSection<'Experimental Properties', 'Odor'>,
		BaseSection<'Experimental Properties', 'Taste'>,
		BaseSection<'Experimental Properties', 'Boiling Point'>,
		BaseSection<'Experimental Properties', 'Melting Point'>,
		BaseSection<'Experimental Properties', 'Flash Point'>,
		BaseSection<'Experimental Properties', 'Solubility'>,
		BaseSection<'Experimental Properties', 'Density'>,
		BaseSection<'Experimental Properties', 'Vapor Density'>,
		BaseSection<'Experimental Properties', 'Vapor Pressure'>,
		BaseSection<'Experimental Properties', 'LogP'>,
		BaseSection<'Experimental Properties', 'Henrys Law Constant'>,
		BaseSection<'Experimental Properties', 'Atmospheric OH Rate Constant'>,
		BaseSection<'Experimental Properties', 'Stability/Shelf Life'>,
		BaseSection<'Experimental Properties', 'Autoignition Temperature'>,
		BaseSection<'Experimental Properties', 'Decomposition'>,
		BaseSection<'Experimental Properties', 'Viscosity'>,
		BaseSection<'Experimental Properties', 'Corrosivity'>,
		BaseSection<'Experimental Properties', 'Heat of Combustion'>,
		BaseSection<'Experimental Properties', 'Heat of Vaporization'>,
		BaseSection<'Experimental Properties', 'pH'>,
		BaseSection<'Experimental Properties', 'Surface Tension'>,
		BaseSection<'Experimental Properties', 'Ionization Potential'>,
		BaseSection<'Experimental Properties', 'Polymerization'>,
		BaseSection<'Experimental Properties', 'Odor Threshold'>,
		BaseSection<'Experimental Properties', 'Refractive Index'>,
		BaseSection<'Experimental Properties', 'Dissociation Constants'>,
		BaseSection<'Experimental Properties', 'Kovats Retention Index'>,
		BaseSection<'Experimental Properties', 'Other Experimental Properties'>
	];
}

export interface FoodAdditivesAndIngredients
	extends BaseSection<'Food Additives and Ingredients'> {
	Section: [BaseSection<'Food Additive Classes'>];
}

export interface AgrochemicalInformation
	extends BaseSection<'Agrochemical Information'> {
	Section: [BaseSection<'Agrochemical Category'>];
}

export interface PubChemCompound {
	RecordNumber: number;
	RecordTitle: string;
	Section: [
		RawChemicalSafety,
		NamesAndIdentifiers,
		ChemicalAndPhysicalProperties,
		FoodAdditivesAndIngredients,
		AgrochemicalInformation
	];
	id?: number;
}

export interface RawCompound {
	Record: PubChemCompound;
}

// Parsed Compound types
//TODO this part was prepared for compound 222. This will probably won't work for other compounds. Update data types for all possible results from Pubchem API
interface ChemicalSafety {
	Extra: string;
	Type: string;
	URL: string;
}

export interface ParsedCompound {
	id: number;
	RecordNumber: number;
	RecordTitle: string;
	ChemicalSafety: ChemicalSafety[];
	RecordDescription: string[];
	IUPACName: string;
	InChI: string;
	InChIKey: string;
	CanonicalSMILES: string;
	MolecularFormula: string[];
	CAS: string[];
	RelatedCAS: string[];
	EuropeanCommunityNumber: string[];
	ICSCNumber: string;
	RTECSNumber: string;
	UNNumber: string[];
	UNII: string;
	FEMANumber: number;
	DSSToxSubstanceID: string;
	Wikipedia: string[];
	NCIThesaurusCode: string;
	MolecularWeight: number;
	CompoundIsCanonicalized: string;
	XLogP3: number;
	HydrogenBondDonorCount: number;
	HydrogenBondAcceptorCount: number;
	RotatableBondCount: number;
	ExactMass: {
		String: string;
		Unit: string;
	};
	MonoisotopicMass: {
		String: string;
		Unit: string;
	};
	TopologicalPolarSurfaceArea: {
		Number: number;
		Unit: string;
	};
	HeavyAtomCount: number;
	FormalCharge: number;
	Complexity: number;
	IsotopeAtomCount: number;
	DefinedAtomStereocenterCount: number;
	UndefinedAtomStereocenterCount: number;
	DefinedBondStereocenterCount: number;
	UndefinedBondStereocenterCount: number;
	CovalentlyBondedUnitCount: number;
	PhysicalDescription: string[];
	ColorForm: string[];
	Odor: string[];
	Taste: string;
	BoilingPoint: string[];
	MeltingPoint: string[];
	FlashPoint: string[];
	Solubility: string[];
	Density: string[];
	VaporDensity: string[];
	VaporPressure: string[];
	LogP: string;
	HenrysLawConstant: string;
	AtmosphericOHRateConstant: string;
	StabilityShelfLife: string;
	AutoignitionTemperature: string[];
	Decomposition: string[];
	Viscosity: string;
	Corrosivity: string[];
	HeatofCombustion: string;
	HeatofVaporization: string;
	pH: string;
	SurfaceTension: string;
	IonizationPotential: string;
	Polymerization: string;
	OdorThreshold: string[];
	RefractiveIndex: string;
	DissociationConstants: string;
	KovatsRetentionIndex: string[];
	OtherExperimentalProperties: string[];
	FoodAdditiveClasses: string;
	AgrochemicalCategory: string;
}

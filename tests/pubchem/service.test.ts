import * as mockedAPI from './api.mock';
import PubChemService from '../../src/pubchem/service';
import { ParsedCompound /*RawCompound*/ } from '../../src/pubchem/types';

jest.mock('axios', () => {
	return {
		__esModule: true,
		default: {
			get: mockedAPI.getCompoundById
		}
	};
});

const service = new PubChemService();

describe('PubChem API Tests', () => {
	// let rawData: RawCompound;
	let parsedData: ParsedCompound;
	beforeAll(async () => {
		// rawData = await service.getRawCompoundById(222);
		parsedData = await service.getParsedCompoundById(222);
		// console.log(parsedData);
	});

	describe('should parse RawCompound properly', () => {
		it('should parse Record Number properly', () => {
			expect(parsedData.RecordNumber).toBe(222);
		});

		it('should parse Record Title properly', () => {
			expect(parsedData.RecordTitle).toBe('Ammonia');
		});

		it('should parse Record Description properly', () => {
			expect(parsedData.RecordDescription).toEqual([
				'Ammonia solutions (containing more than 35% but not more than 50% ammonia) appears as a clear colorless liquid consisting of ammonia dissolved in water. Corrosive to tissue and metals. Although ammonia is lighter than air, the vapors from a leak will initially hug the ground. Long term exposure to low concentrations or short term exposure to high concentrations may result in adverse health conditions from inhalation. Prolonged exposure of containers to fire or heat may result in their violent rupturing and rocketing.',
				'Ammonia, anhydrous appears as a clear colorless gas with a strong odor. Shipped as a liquid under its own vapor pressure. Density (liquid) 6 lb / gal. Contact with the unconfined liquid can cause frostbite. Gas generally regarded as nonflammable but does burn within certain vapor concentration limits and with strong ignition. Fire hazard increases in the presence of oil or other combustible materials. Although gas is lighter than air, vapors from a leak initially hug the ground. Prolonged exposure of containers to fire or heat may cause violent rupturing and rocketing. Long-term inhalation of low concentrations of the vapors or short-term inhalation of high concentrations has adverse health effects. Used as a fertilizer, as a refrigerant, and in the manufacture of other chemicals.   Rate of onset: Immediate  Persistence: Minutes  Odor threshold: 17 ppm  Source/use/other hazard: Explosives manufacture; pesticides; detergents industry.',
				'Ammonia, solution, with more than 10% but not more than 35% ammonia appears as a colorless aqueous liquid solution with a strong odor of ammonia. Both liquid and vapors extremely irritating, especially to the eyes.',
				'Ammonia occurs naturally and is produced by human activity. It is an important source of nitrogen which is needed by plants and animals. Bacteria found in the intestines can produce ammonia. Ammonia is a colorless gas with a very distinct odor. This odor is familiar to many people because ammonia is used in smelling salts, many household and industrial cleaners, and window-cleaning products. Ammonia gas can be dissolved in water. This kind of ammonia is called liquid ammonia or aqueous ammonia. Once exposed to open air, liquid ammonia quickly turns into a gas. Ammonia is applied directly into soil on farm fields, and is used to make fertilizers for farm crops, lawns, and plants. Many household and industrial cleaners contain ammonia.',
				'Ammonia is an azane that consists of a single nitrogen atom covelently bonded to three hydrogen atoms. It has a role as a nucleophilic reagent, a neurotoxin, a metabolite, an EC 3.5.1.4 (amidase) inhibitor, a refrigerant and a mouse metabolite. It is an azane, a mononuclear parent hydride and a gas molecular entity. It is a conjugate base of an ammonium. It is a conjugate acid of an azanide.',
				'Ammonia is a natural product found in Cannabis sativa, Iochroma fuchsioides, and other organisms with data available.',
				'Ammonia is an inorganic compound composed of a single nitrogen atom covalently bonded to three hydrogen atoms that is an amidase inhibitor and neurotoxin. It is both manufactured and produced naturally from bacterial processes and the breakdown of organic matter. Ammonia is used in many industrial processes, and as a fertilizer and refrigerant. It is characterized as a colorless gas or compressed liquid with a pungent odor and exposure occurs by inhalation, ingestion, or contact.',
				'A colorless alkaline gas. It is formed in the body during decomposition of organic materials during a large number of metabolically important reactions. Note that the aqueous form of ammonia is referred to as AMMONIUM HYDROXIDE.'
			]);
		});

		it('should parse Checmical Safety properly', () => {
			expect(parsedData.ChemicalSafety).toEqual([
				{
					Extra: 'Corrosive',
					Type: 'Icon',
					URL: 'https://pubchem.ncbi.nlm.nih.gov/images/ghs/GHS05.svg'
				},
				{
					Extra: 'Acute Toxic',
					Type: 'Icon',
					URL: 'https://pubchem.ncbi.nlm.nih.gov/images/ghs/GHS06.svg'
				},
				{
					Extra: 'Environmental Hazard',
					Type: 'Icon',
					URL: 'https://pubchem.ncbi.nlm.nih.gov/images/ghs/GHS09.svg'
				}
			]);
		});

		it('should parse IUPACName properly', () => {
			expect(parsedData.IUPACName).toBe('azane');
		});

		it('should parse InChI properly', () => {
			expect(parsedData.InChI).toBe('InChI=1S/H3N/h1H3');
		});

		it('should parse InChIKey properly', () => {
			expect(parsedData.InChIKey).toBe('QGZKDVFQNNGYKY-UHFFFAOYSA-N');
		});

		it('should parse CanonicalSMILES properly', () => {
			expect(parsedData.CanonicalSMILES).toBe('N');
		});

		it('should parse MolecularFormula properly', () => {
			expect(parsedData.MolecularFormula).toEqual(['H3N', 'NH3']);
		});

		it('should parse CAS properly', () => {
			expect(parsedData.CAS).toEqual(['7664-41-7', '69718-51-0']);
		});

		it('should parse RelatedCAS properly', () => {
			expect(parsedData.RelatedCAS).toEqual([
				'71187-51-4',
				'71187-52-5',
				'63016-67-1',
				'71187-50-3'
			]);
		});

		it('should parse EuropeanCommunityNumber properly', () => {
			expect(parsedData.EuropeanCommunityNumber).toEqual([
				'231-635-3',
				'921-643-1',
				'921-933-8'
			]);
		});

		it('should parse ICSCNumber properly', () => {
			expect(parsedData.ICSCNumber).toBe('0414');
		});

		it('should parse RTECSNumber properly', () => {
			expect(parsedData.RTECSNumber).toBe('BO0875000');
		});

		it('should parse UNNumber properly', () => {
			expect(parsedData.UNNumber).toEqual(['2073', '1005', '2672']);
		});

		it('should parse UNII properly', () => {
			expect(parsedData.UNII).toBe('5138Q19F1X');
		});

		it('should parse FEMANumber properly', () => {
			expect(parsedData.FEMANumber).toBe('4494');
		});

		it('should parse DSSToxSubstanceID properly', () => {
			expect(parsedData.DSSToxSubstanceID).toBe('DTXSID0023872');
		});

		it('should parse Wikipedia properly', () => {
			expect(parsedData.Wikipedia).toEqual([
				'https://en.wikipedia.org/wiki/Ammonia',
				'https://en.wikipedia.org/wiki/Imidogen',
				'https://en.wikipedia.org/wiki/Ammonia_solution'
			]);
		});

		it('should parse NCIThesaurusCode properly', () => {
			expect(parsedData.NCIThesaurusCode).toBe('C76698');
		});

		it('should parse MolecularWeight properly', () => {
			expect(parsedData.MolecularWeight).toBe('17.031');
		});

		it('should parse CompoundIsCanonicalized properly', () => {
			expect(parsedData.CompoundIsCanonicalized).toBe('Yes');
		});

		it('should parse XLogP3 properly', () => {
			expect(parsedData.XLogP3).toBe(-0.7);
		});

		it('should parse HydrogenBondDonorCount properly', () => {
			expect(parsedData.HydrogenBondDonorCount).toBe(1);
		});

		it('should parse HydrogenBondAcceptorCount properly', () => {
			expect(parsedData.HydrogenBondAcceptorCount).toBe(1);
		});

		it('should parse RotatableBondCount properly', () => {
			expect(parsedData.RotatableBondCount).toBe(0);
		});

		it('should parse ExactMass properly', () => {
			expect(parsedData.ExactMass).toEqual({
				String: '17.026549100',
				Unit: 'g/mol'
			});
		});

		it('should parse MonoisotopicMass properly', () => {
			expect(parsedData.MonoisotopicMass).toEqual({
				String: '17.026549100',
				Unit: 'g/mol'
			});
		});

		it('should parse TopologicalPolarSurfaceArea properly', () => {
			expect(parsedData.TopologicalPolarSurfaceArea).toEqual({
				Number: 1,
				Unit: 'Å²'
			});
		});

		it('should parse HeavyAtomCount properly', () => {
			expect(parsedData.HeavyAtomCount).toBe(1);
		});

		it('should parse FormalCharge properly', () => {
			expect(parsedData.FormalCharge).toBe(0);
		});

		it('should parse Complexity properly', () => {
			expect(parsedData.Complexity).toBe(0);
		});

		it('should parse IsotopeAtomCount properly', () => {
			expect(parsedData.IsotopeAtomCount).toBe(0);
		});

		it('should parse DefinedAtomStereocenterCount properly', () => {
			expect(parsedData.DefinedAtomStereocenterCount).toBe(0);
		});

		it('should parse UndefinedAtomStereocenterCount properly', () => {
			expect(parsedData.UndefinedAtomStereocenterCount).toBe(0);
		});

		it('should parse DefinedBondStereocenterCount properly', () => {
			expect(parsedData.DefinedBondStereocenterCount).toBe(0);
		});

		it('should parse UndefinedBondStereocenterCount properly', () => {
			expect(parsedData.UndefinedBondStereocenterCount).toBe(0);
		});

		it('should parse Covalently-BondedUnitCount properly', () => {
			expect(parsedData['Covalently-BondedUnitCount']).toBe(1);
		});

		it('should parse PhysicalDescription properly', () => {
			expect(parsedData.PhysicalDescription).toEqual([
				'Ammonia solutions (containing more than 35% but not more than 50% ammonia) appears as a clear colorless liquid consisting of ammonia dissolved in water. Corrosive to tissue and metals. Although ammonia is lighter than air, the vapors from a leak will initially hug the ground. Long term exposure to low concentrations or short term exposure to high concentrations may result in adverse health conditions from inhalation. Prolonged exposure of containers to fire or heat may result in their violent rupturing and rocketing.',
				'Ammonia, anhydrous appears as a clear colorless gas with a strong odor. Shipped as a liquid under its own vapor pressure. Density (liquid) 6 lb / gal. Contact with the unconfined liquid can cause frostbite. Gas generally regarded as nonflammable but does burn within certain vapor concentration limits and with strong ignition. Fire hazard increases in the presence of oil or other combustible materials. Although gas is lighter than air, vapors from a leak initially hug the ground. Prolonged exposure of containers to fire or heat may cause violent rupturing and rocketing. Long-term inhalation of low concentrations of the vapors or short-term inhalation of high concentrations has adverse health effects. Used as a fertilizer, as a refrigerant, and in the manufacture of other chemicals.   Rate of onset: Immediate  Persistence: Minutes  Odor threshold: 17 ppm  Source/use/other hazard: Explosives manufacture; pesticides; detergents industry.',
				'Ammonia, solution, with more than 10% but not more than 35% ammonia appears as a colorless aqueous liquid solution with a strong odor of ammonia. Both liquid and vapors extremely irritating, especially to the eyes.',
				'GasVapor; GasVapor, Liquid; Liquid; WetSolid',
				'Liquid',
				'COLOURLESS GAS OR COMPRESSED LIQUEFIED GAS WITH PUNGENT ODOUR.',
				'Colorless gas with a pungent, suffocating odor. Often used in aqueous solution.',
				'Colorless gas with a pungent, suffocating odor. [Note: Shipped as a liquefied compressed gas. Easily liquefied under pressure.]',
				'Clear, colorless, gas. Clear, colorless liquid under pressure.'
			]);
		});

		it('should parse ColorForm properly', () => {
			expect(parsedData.ColorForm).toEqual([
				'Colorless gas',
				'Colorless gas or compressed liquid (compressed under its own pressure)'
			]);
		});

		it('should parse Odor properly', () => {
			expect(parsedData.Odor).toEqual([
				'Sharp, cloying, repellent',
				'Pungent, suffocating odor',
				'Sharp, intensely irritating odor',
				'Very pungent odor (characteristic of drying urine).'
			]);
		});

		it('should parse Taste properly', () => {
			expect(parsedData.Taste).toBe('N/A');
		});

		it('should parse BoilingPoint properly', () => {
			expect(parsedData.BoilingPoint).toEqual([
				'-28.03 °F at 760 mm Hg (EPA, 1998)',
				'-33.35 °C at 760 mm Hg',
				'-33 °C',
				'-28°F'
			]);
		});

		it('should parse MeltingPoint properly', () => {
			expect(parsedData.MeltingPoint).toEqual([
				'-107.9 °F (EPA, 1998)',
				'-77.7 °C',
				'-77.7°C',
				'-78 °C',
				'-107.9°F',
				'-108°F'
			]);
		});

		it('should parse FlashPoint properly', () => {
			expect(parsedData.FlashPoint).toEqual([
				'132 °C (270 °F) - closed cup',
				'NA (Gas)'
			]);
		});

		it('should parse Solubility properly', () => {
			expect(parsedData.Solubility).toEqual([
				'In water, 4.82X10+5 mg/L at 24 °C',
				'In water, 47% at 0 °C; 38% at 15 °C; 34% at 20 °C; 31% at 25 °C; 28% at 30 °C; 18% at 50 °C',
				'Soluble in water forming alkaline solutions; soluble in oxygenated solvents.',
				'15% in 95% alcohol at 20 °C; 11% in alcohol at 30 °C',
				'For more Solubility (Complete) data for Ammonia (7 total), please visit the HSDB record page.',
				'482 mg/mL at 24 °C',
				'Solubility in water, g/100ml at 20 °C: 54',
				'34%'
			]);
		});

		it('should parse Density properly', () => {
			expect(parsedData.Density).toEqual([
				'0.6818 at -28.03 °F (EPA, 1998)',
				'0.696 g/L (liquid)',
				'Density of liquid: 0.6818 at -33.35 °C, 1 atm; 0.6585 at -15 °C, 2.332 atm; 0.6386 at 0 °C, 4.238 atm; 0.6175 at 15 °C, 7.188 atm; 0.5875 at 35 °C, 13.321 atm',
				'Density of aqueous solutions at 20 °C/4 °C: 0.9939 (1%), 0.9811 (4%), 0.9651 (8%), 0.9362 (16%), 0.9229 (20%), 0.9101 (24%), 0.8980 (28%)',
				'Density: 0.7710 g/L (gas); 0.89801 g/L at 20 °C (28% aqueous solution)',
				'Relative density (water = 1): 0.7 (-33 °C)',
				'0.6818 at -28.03°F',
				'0.60(relative gas density)'
			]);
		});

		it('should parse VaporDensity properly', () => {
			expect(parsedData.VaporDensity).toEqual([
				'0.6 (EPA, 1998) (Relative to Air)',
				'0.5967 (Air = 1)',
				'Relative vapor density  (air = 1): 0.60',
				'0.6'
			]);
		});

		it('should parse VaporPressure properly', () => {
			expect(parsedData.VaporPressure).toEqual([
				'400 mm Hg at -49.72 °F (EPA, 1998)',
				'Vapor pressure: 1 Pa at -139 °C, 10 Pa at -127 °C, 100 Pa at -112 °C; 1 kPa at -94.5 °C (solids); 10 kPa at -71.3 °C, 100 kPa at -33.6 °C (liquid)',
				'7500 mm Hg at 25 °C',
				'Vapor pressure, kPa at 26 °C: 1013',
				'8.5 atm'
			]);
		});

		it('should parse LogP properly', () => {
			expect(parsedData.LogP).toBe(
				'log Kow = -2.66 /estimate for ammonium hydroxide which is the form of ammonia in water/'
			);
		});

		it('should parse HenrysLawConstant properly', () => {
			expect(parsedData.HenrysLawConstant).toBe(
				"Henry's Law constant = 1.61X10-5 atm cu-m/mole at 25 °C"
			);
		});

		it('should parse AtmosphericOHRateConstant properly', () => {
			expect(parsedData.AtmosphericOHRateConstant).toBe('N/A');
		});

		it('should parse Stability/ShelfLife properly', () => {
			expect(parsedData['Stability/ShelfLife']).toBe(
				'Stable under recommended storage conditions.'
			);
		});

		it('should parse AutoignitionTemperature properly', () => {
			expect(parsedData.AutoignitionTemperature).toEqual([
				'1204 °F (USCG, 1999)',
				'1204 °F (651 °C)',
				'630 °C'
			]);
		});

		it('should parse Decomposition properly', () => {
			expect(parsedData.Decomposition).toEqual([
				'Hazardous decomposition products formed under fire conditions. - Nitrogen oxides (NOx)',
				'Emits toxic fumes of ammonia and nitrous oxide  when exposed to heat.',
				'When ammonia is heated to decomposition, it emits toxic fumes and nitrogen oxides.'
			]);
		});

		it('should parse Viscosity properly', () => {
			expect(parsedData.Viscosity).toBe(
				'0.475, 0.317, 0.276 and 0.255 cP at -69, -50, -40 and -33.5 °C, respectively'
			);
		});

		it('should parse Corrosivity properly', () => {
			expect(parsedData.Corrosivity).toEqual([
				'Corrosive gas',
				'Corrosive to copper and galvanized surfaces'
			]);
		});

		it('should parse HeatofCombustion properly', () => {
			expect(parsedData.HeatofCombustion).toBe('382.8 kJ/mol (gas)');
		});

		it('should parse HeatofVaporization properly', () => {
			expect(parsedData.HeatofVaporization).toBe('5.581 kcal/mol');
		});

		it('should parse pH properly', () => {
			expect(parsedData.pH).toBe(
				'pH of 1.0N aqueous solution 11.6; 0.1N aqueous solution 11.1; 0.01N aqueous solution 10.6'
			);
		});

		it('should parse SurfaceTension properly', () => {
			expect(parsedData.SurfaceTension).toBe(
				'23.4 dynes/cm at 11.1 °C; 18.1 dynes/cm at 34.1 °C'
			);
		});

		it('should parse IonizationPotential properly', () => {
			expect(parsedData.IonizationPotential).toBe('10.18 eV');
		});

		it('should parse Polymerization properly', () => {
			expect(parsedData.Polymerization).toBe('N/A');
		});

		it('should parse OdorThreshold properly', () => {
			expect(parsedData.OdorThreshold).toEqual([
				'Water: 1.5 mg/L; air: 5.2 uL/L; odor safety class C; C = < 50% of distracted persons perceive warning of TLV.',
				'Odor recognition of pure ammonia in air is 4.68 x 10+1 ppm.',
				'Sharp, cloying, repellent; low threshold = 0.0266 mg/cu m; high threshold = 39.60 mg/cu m; irritating concn = 72.00 mg/cu m.',
				'Low threshold = 0.0266 mg/cu m; High threshold = 39.6 mg/cu m; Irritating concentration = 72 mg/cu m.'
			]);
		});

		it('should parse RefractiveIndex properly', () => {
			expect(parsedData.RefractiveIndex).toBe(
				'Index of refraction: 1.3944 at -77 °C/D; 1.3327 at 20 °C/D'
			);
		});

		it('should parse DissociationConstants properly', () => {
			expect(parsedData.DissociationConstants).toBe(
				'Aqueous ammonia: pKb 4.767, Kb 1.710X10-5 at 20 °C; pKb 4.751, Kb 1.774X10-5 at 25 °C; pKb 4.740, Kb 1.820X10-5 at 30 °C'
			);
		});

		it('should parse KovatsRetentionIndex properly', () => {
			expect(parsedData.KovatsRetentionIndex).toEqual([118, 131]);
		});

		it('should parse OtherExperimentalProperties properly', () => {
			expect(parsedData.OtherExperimentalProperties).toEqual([
				'Critical molar volume: 69.8 cu cm/mol',
				'Specific heat, J/kg-K: 2097.2 at 0 °C; 2226.2 at 100 °C; 2105.6 at 200 °C',
				'Specific gravity: 0.690 at -40 °C; 0.639 at 0 °C; 0.580 at 40 °C',
				'Dipole moment, gas: 4.9x10-30 C m; 1.47 D',
				'For more Other Experimental Properties (Complete) data for Ammonia (12 total), please visit the HSDB record page.'
			]);
		});

		it('should parse FoodAdditiveClasses properly', () => {
			expect(parsedData.FoodAdditiveClasses).toBe('Flavoring Agents');
		});

		it('should parse AgrochemicalCategory properly', () => {
			expect(parsedData.AgrochemicalCategory).toBe('Microbiocide');
		});
	});
});

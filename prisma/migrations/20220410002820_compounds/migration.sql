-- CreateTable
CREATE TABLE "Compounds" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "record_number" INTEGER NOT NULL,
    "record_title" TEXT NOT NULL,
    "chemical_safety" JSONB[],
    "record_description" TEXT[],
    "iupac_name" TEXT,
    "inchi" TEXT,
    "inchi_key" TEXT,
    "canonical_smiles" TEXT,
    "molecular_formula" TEXT[],
    "cas" TEXT[],
    "related_cas" TEXT[],
    "european_community_number" TEXT[],
    "icsc_number" TEXT,
    "rtecs_number" TEXT[],
    "un_number" TEXT[],
    "unii" TEXT[],
    "fema_number" INTEGER,
    "dss_tox_substance_id" TEXT[],
    "wikipedia" TEXT[],
    "nci_thesaurus_code" TEXT,
    "molecular_weight" DOUBLE PRECISION,
    "compound_is_canonicalized" TEXT,
    "xlogp3" DOUBLE PRECISION,
    "hydrogen_bond_donor_count" INTEGER,
    "hydrogen_bond_acceptor_count" INTEGER,
    "rotatable_bond_count" INTEGER,
    "exact_mass" JSONB,
    "monoisotopic_mass" JSONB,
    "topological_polar_surface_area" JSONB,
    "heavy_atom_count" INTEGER,
    "formal_charge" INTEGER,
    "complexity" DOUBLE PRECISION,
    "isotope_atom_count" INTEGER,
    "defined_atom_stereocenter_count" INTEGER,
    "undefined_atom_stereocenter_count" INTEGER,
    "defined_bond_stereocenter_count" INTEGER,
    "undefined_bond_stereocenter_count" INTEGER,
    "covalently-bonded_unit_count" INTEGER,
    "physical_description" TEXT[],
    "color_form" TEXT[],
    "odor" TEXT[],
    "taste" TEXT[],
    "boiling_point" TEXT[],
    "melting_point" TEXT[],
    "flash_point" TEXT[],
    "solubility" TEXT[],
    "density" TEXT[],
    "vapor_density" TEXT[],
    "vapor_pressure" TEXT[],
    "logp" TEXT[],
    "henrys_law_constant" TEXT[],
    "atmospheric_oh_rate_constant" TEXT,
    "stability_shelf_life" TEXT[],
    "autoignition_temperature" TEXT[],
    "decomposition" TEXT[],
    "viscosity" TEXT[],
    "corrosivity" TEXT[],
    "heat_of_combustion" TEXT,
    "heat_of_vaporization" TEXT,
    "ph" TEXT[],
    "surface_tension" TEXT,
    "ionization_potential" TEXT[],
    "polymerization" TEXT[],
    "odor_threshold" TEXT[],
    "refractive_index" TEXT[],
    "dissociation_constants" TEXT[],
    "kovats_retention_index" DOUBLE PRECISION[],
    "other_experimental_properties" TEXT[],
    "food_additive_classes" TEXT[],
    "agrochemical_category" TEXT[],

    CONSTRAINT "Compounds_pkey" PRIMARY KEY ("id")
);
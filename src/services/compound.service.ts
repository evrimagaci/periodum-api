import { PrismaClient } from '@prisma/client';
import { ParsedCompound } from '../pubchem/types';

class CompoundService {
	prisma: PrismaClient;

	public constructor() {
		this.prisma = new PrismaClient();
	}

	getAll = async () => {
		return this.prisma.compounds.findMany({
			select: {
				id: true,
				RecordTitle: true,
				IUPACName: true
			},
			orderBy: {
				id: 'asc'
			}
		});
	};

	getById = async (id: number) => {
		return this.prisma.compounds.findUnique({
			where: {
				id: Number(id)
			}
		});
	};

	createMany = async (compounds: ParsedCompound[]) => {
		return this.prisma.compounds.createMany({
			data: compounds,
			skipDuplicates: true
		});
	};
}

export default CompoundService;

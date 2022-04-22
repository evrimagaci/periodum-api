import { PrismaClient } from '@prisma/client';
import { ParsedCompound } from '../pubchem/types';

class CompoundService {
	prisma: PrismaClient;

	public constructor() {
		this.prisma = new PrismaClient();
	}

	getLatest = async (pageIndex: number, pageSize: number) => {
		return this.prisma.compounds.findMany({
			select: {
				id: true,
				RecordTitle: true,
				IUPACName: true
			},
			skip: pageIndex * pageSize,
			take: pageSize,
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

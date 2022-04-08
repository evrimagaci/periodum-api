import { PrismaClient } from '@prisma/client';

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
}

export default CompoundService;

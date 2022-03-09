import { PrismaClient } from '@prisma/client';

class ElementService {
	prisma: PrismaClient;

	public constructor() {
		this.prisma = new PrismaClient();
	}

	getAll = async () => {
		return this.prisma.elements.findMany({
			select: {
				number: true,
				name_tr: true,
				ypos: true,
				xpos: true,
				symbol: true,
				atomic_mass: true,
				boil_use: true,
				melt_use: true,
				block: true,
				category: true,
				geochemical_class: true
			}
		});
	};

	getById = async (id: number) => {
		return this.prisma.elements.findUnique({
			where: {
				number: Number(id)
			}
		});
	};
}

export default ElementService;

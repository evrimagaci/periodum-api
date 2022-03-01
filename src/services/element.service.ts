import { PrismaClient } from '@prisma/client';

class ElementService {
	prisma: PrismaClient;

	public constructor() {
		this.prisma = new PrismaClient();
	}

	listAll = async () => {
		return this.prisma.elements.findMany();
	};
}

export default ElementService;

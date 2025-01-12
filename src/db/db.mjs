//create prisma client object
import { PrismaClient } from "@prisma/client/extension";

const DB = PrismaClient();

export default DB;
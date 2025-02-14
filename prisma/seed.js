"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const database_1 = __importDefault(require("../src/database"));
const crypto_1 = require("../src/resources/crypto");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const days = 7;
        yield database_1.default.plano.create({
            data: {
                id: 1,
                nome: 'Plano Teste',
                valor: 0,
                status: 'ATIVO',
                max: days,
            }
        });
        yield database_1.default.user.create({
            data: {
                nome: 'admin',
                email: 'admin@email.com',
                sobrenome: 'Admin',
                cpf: '00000000000',
                senha: (0, crypto_1.encryptPassword)('admin'),
                Empresa: {
                    create: {
                        nome: 'Empresa Teste',
                        cnpj: '12345678901234',
                        status: 'ATIVO',
                        ativo_em: new Date(),
                        ativo_ate: (0, date_fns_1.add)(new Date(), { days }),
                        Session: {
                            create: {
                                data: '{}'
                            }
                        }
                    }
                }
            }
        });
    });
}
main()
    .catch(e => {
    throw e;
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$disconnect();
}));

/*
  Warnings:

  - You are about to drop the column `email_confirmado` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `saldo` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "empresas" ADD COLUMN     "online" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email_confirmado",
DROP COLUMN "saldo";

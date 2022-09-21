/*
  Warnings:

  - You are about to drop the `GoLinkParam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GoLinkParam" DROP CONSTRAINT "GoLinkParam_go_link_id_fkey";

-- DropTable
DROP TABLE "GoLinkParam";

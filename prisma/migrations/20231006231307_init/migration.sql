-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('Alive', 'Deceased');

-- CreateTable
CREATE TABLE "Household" (
    "id" TEXT NOT NULL DEFAULT concat('tnt_', replace(cast(gen_random_uuid() as text), '-', '')),

    CONSTRAINT "Household_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL DEFAULT concat('hse_', replace(cast(gen_random_uuid() as text), '-', '')),

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL DEFAULT concat('adr_', replace(cast(gen_random_uuid() as text), '-', '')),
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "city" TEXT NOT NULL,
    "state_province" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "houseId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL DEFAULT concat('mbr_', replace(cast(gen_random_uuid() as text), '-', '')),
    "email" TEXT,
    "password" TEXT,
    "fullName" TEXT NOT NULL,
    "birthday" TIMESTAMP(3),
    "nickname" TEXT,
    "picture" TEXT,
    "species" TEXT NOT NULL,
    "status" "MemberStatus" NOT NULL,
    "householdId" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relation" (
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "relation" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Relation_sourceId_targetId_relation_key" ON "Relation"("sourceId", "targetId", "relation");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('Pequeno', 'Mediano', 'Grande');

-- CreateEnum
CREATE TYPE "PetEnergy" AS ENUM ('Baixissima', 'Baixa', 'Mediana', 'Alta', 'Altissima');

-- CreateEnum
CREATE TYPE "PetIndependecy" AS ENUM ('Baixo', 'Moderado', 'Alto');

-- CreateEnum
CREATE TYPE "PetEnvironment" AS ENUM ('Pequeno', 'Mediano', 'Grande');

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "responsable_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "size" "PetSize" NOT NULL,
    "energy" "PetEnergy" NOT NULL,
    "independency" "PetIndependecy" NOT NULL,
    "environment" "PetEnvironment" NOT NULL,
    "photos_ids" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoptions" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "requirements" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "adoptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- CreateIndex
CREATE INDEX "organizations_id_idx" ON "organizations"("id");

-- CreateIndex
CREATE INDEX "pets_id_organization_id_idx" ON "pets"("id", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "adoptions_pet_id_key" ON "adoptions"("pet_id");

-- CreateIndex
CREATE INDEX "adoptions_pet_id_organization_id_idx" ON "adoptions"("pet_id", "organization_id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

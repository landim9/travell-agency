-- CreateTable
CREATE TABLE `Destinos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cidade` VARCHAR(255) NOT NULL,
    `valor` VARCHAR(10) NOT NULL,
    `data` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PontosTuristicos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_destinos` INTEGER NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `endereco` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(20) NOT NULL,
    `valor` VARCHAR(10) NULL,

    UNIQUE INDEX `PontosTuristicos_telefone_key`(`telefone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hoteis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_destinos` INTEGER NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `valor` VARCHAR(10) NULL,
    `avaliacao` VARCHAR(10) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `site` VARCHAR(50) NULL,

    UNIQUE INDEX `Hoteis_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PontosTuristicos` ADD CONSTRAINT `PontosTuristicos_id_destinos_fkey` FOREIGN KEY (`id_destinos`) REFERENCES `Destinos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hoteis` ADD CONSTRAINT `Hoteis_id_destinos_fkey` FOREIGN KEY (`id_destinos`) REFERENCES `Destinos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

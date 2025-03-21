-- CreateTable
CREATE TABLE `Estacao` (
    `ID_Estacao` INTEGER NOT NULL AUTO_INCREMENT,
    `UID` VARCHAR(191) NOT NULL,
    `Nome` VARCHAR(191) NOT NULL,
    `Latitude` DOUBLE NOT NULL,
    `Longitude` DOUBLE NOT NULL,
    `Data_Instalacao` DATETIME(3) NOT NULL,
    `Tipo_Estacao` VARCHAR(191) NOT NULL,
    `Indicativo_Ativa` BOOLEAN NOT NULL,

    PRIMARY KEY (`ID_Estacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tipo_Parametro` (
    `ID_Tipo_Parametro` INTEGER NOT NULL AUTO_INCREMENT,
    `Fator` DOUBLE NOT NULL,
    `Offset` DOUBLE NOT NULL,
    `Unidade` VARCHAR(191) NOT NULL,
    `Nome_Tipo_Parametro` VARCHAR(191) NOT NULL,
    `Indicativo_Ativo` BOOLEAN NOT NULL,

    PRIMARY KEY (`ID_Tipo_Parametro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tipo_Alerta` (
    `ID_Tipo_Alerta` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome_Tipo_Alerta` VARCHAR(191) NOT NULL,
    `Valor` DOUBLE NOT NULL,
    `Operador_Condicional` VARCHAR(191) NOT NULL,
    `Indicativo_Ativo` BOOLEAN NOT NULL,

    PRIMARY KEY (`ID_Tipo_Alerta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `ID_Usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome_Usuario` VARCHAR(191) NOT NULL,
    `CPF_Usuario` VARCHAR(191) NOT NULL,
    `Role` VARCHAR(191) NOT NULL,
    `Senha` VARCHAR(191) NOT NULL,
    `Token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_CPF_Usuario_key`(`CPF_Usuario`),
    PRIMARY KEY (`ID_Usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parametro` (
    `ID_Parametro` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Estacao` INTEGER NOT NULL,
    `ID_Tipo_Parametro` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Parametro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parametro_Alerta` (
    `ID_Parametro_Alerta` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Parametro` INTEGER NOT NULL,
    `ID_Tipo_Alerta` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Parametro_Alerta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medida` (
    `ID_Medida` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Parametro` INTEGER NOT NULL,
    `UnixTime` INTEGER NOT NULL,
    `Valor` DOUBLE NOT NULL,

    PRIMARY KEY (`ID_Medida`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ocorrencias` (
    `ID_Ocorrencia` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Parametro_Alerta` INTEGER NOT NULL,
    `ID_Medida` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Ocorrencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Parametro` ADD CONSTRAINT `Parametro_ID_Estacao_fkey` FOREIGN KEY (`ID_Estacao`) REFERENCES `Estacao`(`ID_Estacao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parametro` ADD CONSTRAINT `Parametro_ID_Tipo_Parametro_fkey` FOREIGN KEY (`ID_Tipo_Parametro`) REFERENCES `Tipo_Parametro`(`ID_Tipo_Parametro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parametro_Alerta` ADD CONSTRAINT `Parametro_Alerta_ID_Parametro_fkey` FOREIGN KEY (`ID_Parametro`) REFERENCES `Parametro`(`ID_Parametro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parametro_Alerta` ADD CONSTRAINT `Parametro_Alerta_ID_Tipo_Alerta_fkey` FOREIGN KEY (`ID_Tipo_Alerta`) REFERENCES `Tipo_Alerta`(`ID_Tipo_Alerta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medida` ADD CONSTRAINT `Medida_ID_Parametro_fkey` FOREIGN KEY (`ID_Parametro`) REFERENCES `Parametro`(`ID_Parametro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ocorrencias` ADD CONSTRAINT `Ocorrencias_ID_Parametro_Alerta_fkey` FOREIGN KEY (`ID_Parametro_Alerta`) REFERENCES `Parametro_Alerta`(`ID_Parametro_Alerta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ocorrencias` ADD CONSTRAINT `Ocorrencias_ID_Medida_fkey` FOREIGN KEY (`ID_Medida`) REFERENCES `Medida`(`ID_Medida`) ON DELETE RESTRICT ON UPDATE CASCADE;

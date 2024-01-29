-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Gen 29, 2024 alle 16:06
-- Versione del server: 8.0.30
-- Versione PHP: 8.0.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_unibowebprogramming`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `CATEGORIE`
--

CREATE TABLE `CATEGORIE` (
  `nome` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `COMBINAZIONI`
--

CREATE TABLE `COMBINAZIONI` (
  `categoria` char(20) NOT NULL,
  `linea` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `COMMENTI`
--

CREATE TABLE `COMMENTI` (
  `testo` char(200) NOT NULL,
  `id` int NOT NULL,
  `utente` varchar(40) NOT NULL,
  `id_post` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `CONVERSAZIONI`
--

CREATE TABLE `CONVERSAZIONI` (
  `id_risposta` int NOT NULL,
  `id_commento` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `IMMAGINI`
--

CREATE TABLE `IMMAGINI` (
  `num_img` int NOT NULL,
  `id_post` int NOT NULL,
  `path_img` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `IMMAGINI`
--

INSERT INTO `IMMAGINI` (`num_img`, `id_post`, `path_img`) VALUES
(0, 2, ''),
(1, 2, ''),
(0, 5, ''),
(1, 5, ''),
(0, 6, ''),
(1, 6, '');

-- --------------------------------------------------------

--
-- Struttura della tabella `LINEE`
--

CREATE TABLE `LINEE` (
  `nome` char(20) NOT NULL,
  `marchio` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `MARCHI`
--

CREATE TABLE `MARCHI` (
  `nome` char(20) NOT NULL,
  `anno_nascita` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `OROLOGI`
--

CREATE TABLE `OROLOGI` (
  `referenza` char(15) NOT NULL,
  `sesso` char(1) NOT NULL,
  `dim_cassa` int NOT NULL,
  `spessore` int NOT NULL,
  `dim_ansa` int NOT NULL,
  `linea` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `POST`
--

CREATE TABLE `POST` (
  `id_post` int NOT NULL,
  `descrizione` char(100) NOT NULL,
  `utente` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `POST`
--

INSERT INTO `POST` (`id_post`, `descrizione`, `utente`) VALUES
(1, 'ciao', 'alessandro.martini02@gmail.com'),
(2, 'gthvghghy', 'alessandro.martini02@gmail.com'),
(3, '<gkjrnong', 'alessandro.martini02@gmail.com'),
(4, 'asdfsafdsfd', 'alessandro.martini02@gmail.com'),
(5, 'kmkmlm', 'alessandro.martini02@gmail.com'),
(6, 'jkkjjnnjkjnnjkkjnjn', 'alessandro.martini02@gmail.com');

-- --------------------------------------------------------

--
-- Struttura della tabella `PUBBLICAZIONI`
--

CREATE TABLE `PUBBLICAZIONI` (
  `referenza` char(20) NOT NULL,
  `id_post` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `SEGUITI`
--

CREATE TABLE `SEGUITI` (
  `utente2` varchar(40) NOT NULL,
  `utente1` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `UTENTI`
--

CREATE TABLE `UTENTI` (
  `email` varchar(40) NOT NULL,
  `nome` char(40) NOT NULL,
  `cognome` char(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `UTENTI`
--

INSERT INTO `UTENTI` (`email`, `nome`, `cognome`, `password`) VALUES
('alessandro.martini02@gmail.com', 'Alessandro', 'Martini', '123');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `CATEGORIE`
--
ALTER TABLE `CATEGORIE`
  ADD PRIMARY KEY (`nome`);

--
-- Indici per le tabelle `COMBINAZIONI`
--
ALTER TABLE `COMBINAZIONI`
  ADD PRIMARY KEY (`categoria`,`linea`),
  ADD KEY `FKINC_LIN` (`linea`);

--
-- Indici per le tabelle `COMMENTI`
--
ALTER TABLE `COMMENTI`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKSCRTTURA` (`utente`),
  ADD KEY `FKOPINIONE` (`id_post`);

--
-- Indici per le tabelle `CONVERSAZIONI`
--
ALTER TABLE `CONVERSAZIONI`
  ADD PRIMARY KEY (`id_risposta`,`id_commento`),
  ADD KEY `FKCOMMENTA` (`id_commento`);

--
-- Indici per le tabelle `IMMAGINI`
--
ALTER TABLE `IMMAGINI`
  ADD PRIMARY KEY (`id_post`,`num_img`);

--
-- Indici per le tabelle `LINEE`
--
ALTER TABLE `LINEE`
  ADD PRIMARY KEY (`nome`),
  ADD KEY `FKDESING` (`marchio`);

--
-- Indici per le tabelle `MARCHI`
--
ALTER TABLE `MARCHI`
  ADD PRIMARY KEY (`nome`);

--
-- Indici per le tabelle `OROLOGI`
--
ALTER TABLE `OROLOGI`
  ADD PRIMARY KEY (`referenza`),
  ADD KEY `FKPRODUZIONE` (`linea`);

--
-- Indici per le tabelle `POST`
--
ALTER TABLE `POST`
  ADD PRIMARY KEY (`id_post`),
  ADD KEY `FKCREA` (`utente`);

--
-- Indici per le tabelle `PUBBLICAZIONI`
--
ALTER TABLE `PUBBLICAZIONI`
  ADD PRIMARY KEY (`id_post`,`referenza`),
  ADD KEY `FKPUB_ORO` (`referenza`);

--
-- Indici per le tabelle `SEGUITI`
--
ALTER TABLE `SEGUITI`
  ADD PRIMARY KEY (`utente2`,`utente1`),
  ADD KEY `FKSEGUITO` (`utente1`);

--
-- Indici per le tabelle `UTENTI`
--
ALTER TABLE `UTENTI`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `COMMENTI`
--
ALTER TABLE `COMMENTI`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `POST`
--
ALTER TABLE `POST`
  MODIFY `id_post` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `COMBINAZIONI`
--
ALTER TABLE `COMBINAZIONI`
  ADD CONSTRAINT `FKINC_CAT` FOREIGN KEY (`categoria`) REFERENCES `CATEGORIE` (`nome`),
  ADD CONSTRAINT `FKINC_LIN` FOREIGN KEY (`linea`) REFERENCES `LINEE` (`nome`);

--
-- Limiti per la tabella `COMMENTI`
--
ALTER TABLE `COMMENTI`
  ADD CONSTRAINT `FKOPINIONE` FOREIGN KEY (`id_post`) REFERENCES `POST` (`id_post`),
  ADD CONSTRAINT `FKSCRTTURA` FOREIGN KEY (`utente`) REFERENCES `UTENTI` (`email`);

--
-- Limiti per la tabella `CONVERSAZIONI`
--
ALTER TABLE `CONVERSAZIONI`
  ADD CONSTRAINT `FKCOMMENTA` FOREIGN KEY (`id_commento`) REFERENCES `COMMENTI` (`id`),
  ADD CONSTRAINT `FKRISPOSTA` FOREIGN KEY (`id_risposta`) REFERENCES `COMMENTI` (`id`);

--
-- Limiti per la tabella `IMMAGINI`
--
ALTER TABLE `IMMAGINI`
  ADD CONSTRAINT `FKCONTENIMENTO` FOREIGN KEY (`id_post`) REFERENCES `POST` (`id_post`);

--
-- Limiti per la tabella `LINEE`
--
ALTER TABLE `LINEE`
  ADD CONSTRAINT `FKDESING` FOREIGN KEY (`marchio`) REFERENCES `MARCHI` (`nome`);

--
-- Limiti per la tabella `OROLOGI`
--
ALTER TABLE `OROLOGI`
  ADD CONSTRAINT `FKPRODUZIONE` FOREIGN KEY (`linea`) REFERENCES `LINEE` (`nome`);

--
-- Limiti per la tabella `POST`
--
ALTER TABLE `POST`
  ADD CONSTRAINT `FKCREA` FOREIGN KEY (`utente`) REFERENCES `UTENTI` (`email`);

--
-- Limiti per la tabella `PUBBLICAZIONI`
--
ALTER TABLE `PUBBLICAZIONI`
  ADD CONSTRAINT `FKPUB_ORO` FOREIGN KEY (`referenza`) REFERENCES `OROLOGI` (`referenza`),
  ADD CONSTRAINT `FKPUB_POS` FOREIGN KEY (`id_post`) REFERENCES `POST` (`id_post`);

--
-- Limiti per la tabella `SEGUITI`
--
ALTER TABLE `SEGUITI`
  ADD CONSTRAINT `FKSEGUACE` FOREIGN KEY (`utente2`) REFERENCES `UTENTI` (`email`),
  ADD CONSTRAINT `FKSEGUITO` FOREIGN KEY (`utente1`) REFERENCES `UTENTI` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 14 2021              
-- * Generation date: Mon Jan  8 21:56:07 2024 
-- * LUN file: C:\unibo\Webb\time_counters\backend\timesCounter.lun 
-- * Schema: tramutazione schema logico/1-1-1 
-- ********************************************* 


-- Database Section
-- ________________ 

create database tramutazione schema logico;
use tramutazione schema logico;


-- Tables Section
-- _____________ 

create table CATEGORIE (
     nome char(20) not null,
     constraint IDCATEGORIA_ID primary key (nome))ENGINE=InnoDB;

create table COMBINAZIONI (
     categoria char(20) not null,
     linea char(20) not null,
     constraint IDINCLUSIONE primary key (categoria, linea))ENGINE=InnoDB;

create table COMMENTI (
     testo char(200) not null,
     id int not null,
     utente varchar(40) not null,
     id_post int not null,
     constraint IDCOMMENTO primary key (id))ENGINE=InnoDB;

create table CONVERSAZIONI (
     id_risposta int not null,
     id_commento int not null,
     constraint IDCONVERSAZIONE primary key (id_risposta, id_commento))ENGINE=InnoDB;

create table IMMAGINI (
     id_post int not null,
     ref_img int not null,
     constraint IDIMMAGINE primary key (id_post, ref_img))ENGINE=InnoDB;

create table LINEE (
     nome char(20) not null,
     marchio char(20) not null,
     constraint IDLINEA_ID primary key (nome))ENGINE=InnoDB;

create table MARCHI (
     nome char(20) not null,
     anno_nascita  int not null,
     constraint IDMARCHIO primary key (nome))ENGINE=InnoDB;

create table OROLOGI (
     referenza char(15) not null,
     sesso char(1) not null,
     dim_cassa int not null,
     spessore int not null,
     dim_ansa int not null,
     linea char(20) not null,
     constraint IDOROLOGIO primary key (referenza))ENGINE=InnoDB;

create table POST (
     id_post int not null,
     descrizione char(100) not null,
     utente varchar(40) not null,
     constraint IDPOST_ID primary key (id_post))ENGINE=InnoDB;

create table PUBBLICAZIONI (
     referenza char(20) not null,
     id_post int not null,
     constraint IDPUBBLICAZIONE primary key (id_post, referenza))ENGINE=InnoDB;

create table SEGUITI (
     utente2 varchar(40) not null,
     utente1 varchar(40) not null,
     constraint IDSEGUITO primary key (utente2, utente1))ENGINE=InnoDB;

create table UTENTI (
     email varchar(40) not null,
     nome char(40) not null,
     cognome char(20) not null,
     password varchar(20) not null,
     constraint IDUTENTE primary key (email))ENGINE=InnoDB;


-- Constraints Section
-- ___________________ 

-- Not implemented
-- alter table CATEGORIE add constraint IDCATEGORIA_CHK
--     check(exists(select * from COMBINAZIONI
--                  where COMBINAZIONI.categoria = nome)); 

alter table COMBINAZIONI add constraint FKINC_LIN
     foreign key (linea)
     references LINEE (nome);

alter table COMBINAZIONI add constraint FKINC_CAT
     foreign key (categoria)
     references CATEGORIE (nome);

alter table COMMENTI add constraint FKSCRTTURA
     foreign key (utente)
     references UTENTI (email);

alter table COMMENTI add constraint FKOPINIONE
     foreign key (id_post)
     references POST (id_post);

alter table CONVERSAZIONI add constraint FKCOMMENTA
     foreign key (id_commento)
     references COMMENTI (id);

alter table CONVERSAZIONI add constraint FKRISPOSTA
     foreign key (id_risposta)
     references COMMENTI (id);

alter table IMMAGINI add constraint FKCONTENIMENTO
     foreign key (id_post)
     references POST (id_post);

-- Not implemented
-- alter table LINEE add constraint IDLINEA_CHK
--     check(exists(select * from OROLOGI
--                  where OROLOGI.linea = nome)); 

alter table LINEE add constraint FKDESING
     foreign key (marchio)
     references MARCHI (nome);

alter table OROLOGI add constraint FKPRODUZIONE
     foreign key (linea)
     references LINEE (nome);

-- Not implemented
-- alter table POST add constraint IDPOST_CHK
--     check(exists(select * from IMMAGINI
--                  where IMMAGINI.id_post = id_post)); 

-- Not implemented
-- alter table POST add constraint IDPOST_CHK
--     check(exists(select * from COMMENTI
--                  where COMMENTI.id_post = id_post)); 

alter table POST add constraint FKCREA
     foreign key (utente)
     references UTENTI (email);

alter table PUBBLICAZIONI add constraint FKPUB_POS
     foreign key (id_post)
     references POST (id_post);

alter table PUBBLICAZIONI add constraint FKPUB_ORO
     foreign key (referenza)
     references OROLOGI (referenza);

alter table SEGUITI add constraint FKSEGUITO
     foreign key (utente1)
     references UTENTI (email);

alter table SEGUITI add constraint FKSEGUACE
     foreign key (utente2)
     references UTENTI (email);


-- Index Section
-- _____________ 


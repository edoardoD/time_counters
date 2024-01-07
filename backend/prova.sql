create table CATEGORIA (
     nome char(20) not null,
     constraint IDCATEGORIA_ID primary key (nome))ENGINE=InnoDB;

create table COMBINAZIONI (
     categoria char(20) not null,
     linea char(20) not null,
     constraint IDINCLUSIONE primary key (categoria, linea))ENGINE=InnoDB;

create table COMMENTO (
     testo char(200) not null,
     id int not null,
     utente varchar(40) not null,
     id_post int not null,
     constraint IDCOMMENTO primary key (id))ENGINE=InnoDB;

create table CONVERSAZIONE (
     id_risposta int not null,
     id_commento int not null,
     constraint IDCONVERSAZIONE primary key (id_risposta, id_commento))ENGINE=InnoDB;

create table IMMAGINE (
     id_post int not null,
     ref_img int not null,
     constraint IDIMMAGINE primary key (id_post, ref_img))ENGINE=InnoDB;

create table LINEA (
     nome char(20) not null,
     marchio char(20) not null,
     constraint IDLINEA_ID primary key (nome))ENGINE=InnoDB;

create table MARCHIO (
     nome char(20) not null,
     anno_nascita  int not null,
     constraint IDMARCHIO primary key (nome))ENGINE=InnoDB;

create table OROLOGIO (
     referenza char(1) not null,
     sesso char(1) not null,
     dim_cassa int not null,
     spessore int not null,
     dim_ansa char(1) not null,
     linea char(20) not null,
     constraint IDOROLOGIO primary key (referenza))ENGINE=InnoDB;

create table POST (
     id_post int not null,
     descrizione char(100) not null,
     utente varchar(40) not null,
     constraint IDPOST_ID primary key (id_post))ENGINE=InnoDB;

create table PUBBLICAZIONE (
     referenza char(1) not null,
     id_post int not null,
     constraint IDPUBBLICAZIONE primary key (id_post, referenza))ENGINE=InnoDB;

create table SEGUITO (
     utente2 varchar(40) not null,
     utente1 varchar(40) not null,
     constraint IDSEGUITO primary key (utente2, utente1))ENGINE=InnoDB;

create table UTENTE (
     email varchar(40) not null,
     nome char(40) not null,
     cognome char(40) not null,
     password varchar(20) not null,
     constraint IDUTENTE primary key (email))ENGINE=InnoDB;

alter table COMBINAZIONI add constraint FKINC_LIN
     foreign key (linea)
     references LINEA (nome);

alter table COMBINAZIONI add constraint FKINC_CAT
     foreign key (categoria)
     references CATEGORIA (nome);

alter table COMMENTO add constraint FKSCRTTURA
     foreign key (utente)
     references UTENTE (email);

alter table COMMENTO add constraint FKOPINIONE
     foreign key (id_post)
     references POST (id_post);

alter table CONVERSAZIONE add constraint FKCOMMENTA
     foreign key (id_commento)
     references COMMENTO (id);

alter table CONVERSAZIONE add constraint FKRISPOSTA
     foreign key (id_risposta)
     references COMMENTO (id);

alter table IMMAGINE add constraint FKCONTENIMENTO
     foreign key (id_post)
     references POST (id_post);

alter table LINEA add constraint FKDESING
     foreign key (marchio)
     references MARCHIO (nome);

alter table OROLOGIO add constraint FKPRODUZIONE
     foreign key (linea)
     references LINEA (nome);

alter table POST add constraint FKCREA
     foreign key (utente)
     references UTENTE (email);

alter table PUBBLICAZIONE add constraint FKPUB_POS
     foreign key (id_post)
     references POST (id_post);

alter table PUBBLICAZIONE add constraint FKPUB_ORO
     foreign key (referenza)
     references OROLOGIO (referenza);

alter table SEGUITO add constraint FKSEGUITO
     foreign key (utente1)
     references UTENTE (email);

alter table SEGUITO add constraint FKSEGUACE
     foreign key (utente2)
     references UTENTE (email);
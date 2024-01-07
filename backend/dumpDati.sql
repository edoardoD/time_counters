–-Dump dei dati per la tabella CATEGORIA 

INSERT INTO CATEGORIA (nome) VALUES (‘Sport’), (‘Moda’), (‘Lusso’), (‘Vintage’), (‘Classico’), (‘Tecnologico’), (‘Militare’), (‘Avventura’), (‘Elegante’), (‘Casual’);

– Dump dei dati per la tabella COMBINAZIONI INSERT INTO COMBINAZIONI (categoria, linea) VALUES (‘Sport’, ‘Speedmaster’), (‘Moda’, ‘Constellation’), (‘Lusso’, ‘De Ville’), (‘Vintage’, ‘Seamaster’), (‘Classico’, ‘Rolex’), (‘Tecnologico’, ‘Apple Watch’), (‘Militare’, ‘G-Shock’), (‘Avventura’, ‘Explorer’), (‘Elegante’, ‘Cartier’), (‘Casual’, ‘Swatch’);

– Dump dei dati per la tabella COMMENTO INSERT INTO COMMENTO (testo, id, utente, id_post) VALUES (‘Che bello questo orologio!’, 1, ‘marco@gmail.com’, 1), (‘Sì, è davvero stupendo!’, 2, ‘laura@gmail.com’, 1), (‘Mi piace molto il design’, 3, ‘giulia@gmail.com’, 2), (‘Anche a me, è molto originale’, 4, ‘luca@gmail.com’, 2), (‘Questo orologio è troppo costoso’, 5, ‘mario@gmail.com’, 3), (‘Non sono d'accordo, vale ogni centesimo’, 6, ‘anna@gmail.com’, 3), (‘Questo orologio è un classico intramontabile’, 7, ‘paolo@gmail.com’, 4), (‘Sì, è un pezzo da collezione’, 8, ‘sara@gmail.com’, 4), (‘Questo orologio è molto tecnologico’, 9, ‘matteo@gmail.com’, 5), (‘Sì, ha tante funzioni utili’, 10, ‘clara@gmail.com’, 5);

– Dump dei dati per la tabella CONVERSAZIONE INSERT INTO CONVERSAZIONE (id_risposta, id_commento) VALUES (2, 1), (4, 3), (6, 5), (8, 7), (10, 9);

– Dump dei dati per la tabella IMMAGINE INSERT INTO IMMAGINE (id_post, ref_img) VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10);

– Dump dei dati per la tabella LINEA INSERT INTO LINEA (nome, marchio) VALUES (‘Speedmaster’, ‘Omega’), (‘Constellation’, ‘Omega’), (‘De Ville’, ‘Omega’), (‘Seamaster’, ‘Omega’), (‘Rolex’, ‘Rolex’), (‘Apple Watch’, ‘Apple’), (‘G-Shock’, ‘Casio’), (‘Explorer’, ‘Rolex’), (‘Cartier’, ‘Cartier’), (‘Swatch’, ‘Swatch’);

– Dump dei dati per la tabella MARCHIO INSERT INTO MARCHIO (nome, anno_nascita) VALUES (‘Omega’, 1848), (‘Rolex’, 1905), (‘Apple’, 1976), (‘Casio’, 1946), (‘Cartier’, 1847), (‘Swatch’, 1983);

– Dump dei dati per la tabella OROLOGIO INSERT INTO OROLOGIO (referenza, sesso, dim_cassa, spessore, dim_ansa, linea) VALUES (‘A’, ‘M’, 42, 13, ‘L’, ‘Speedmaster’), (‘B’, ‘F’, 27, 9, ‘S’, ‘Constellation’), (‘C’, ‘M’, 40, 12, ‘M’, ‘De Ville’), (‘D’, ‘F’, 28, 10, ‘S’, ‘Seamaster’), (‘E’, ‘M’, 36, 12, ‘M’, ‘Rolex’), (‘F’, ‘F’, 38, 10, ‘M’, ‘Apple Watch’), (‘G’, ‘M’, 45, 15, ‘L’, ‘G-Shock’), (‘H’, ‘F’, 34, 11, ‘S’, ‘Explorer’), (‘I’, ‘M’, 41, 14, ‘M’, ‘Cartier’), (‘J’, ‘F’, 25, 8, ‘S’, ‘Swatch’);

– Dump dei dati per la tabella POST INSERT INTO POST (id_post, descrizione, utente) VALUES (1, ‘Il mio nuovo orologio Omega Speedmaster’, ‘marco@gmail.com’), (2, ‘Il mio orologio Omega Constellation’, ‘laura@gmail.com’), (3, ‘Il mio orologio Omega De Ville’, ‘giulia@gmail.com’), (4, ‘Il mio orologio Omega Seamaster’, ‘luca@gmail.com’), (5, ‘Il mio orologio Rolex’, ‘mario@gmail.com’), (6, ‘Il mio orologio Apple Watch’, ‘anna@gmail.com’), (7, ‘Il mio orologio Casio G-Shock’, ‘paolo@gmail.com’), (8, ‘Il mio orologio Rolex Explorer’, ‘sara@gmail.com’), (9, ‘Il mio orologio Cartier’, ‘matteo@gmail.com’), (10, ‘Il mio orologio Swatch’, ‘clara@gmail.com’);

– Dump dei dati per la tabella PUBBLICAZIONE INSERT INTO PUBBLICAZIONE (referenza, id_post) VALUES (‘A’, 1), (‘B’, 2), (‘C’, 3), (‘D’, 4), (‘E’, 5), (‘F’, 6), (‘G’, 7), (‘H’, 8), (‘I’, 9), (‘J’, 10);

– Dump dei dati per la tabella SEGUITO INSERT INTO SEGUITO (utente2, utente1) VALUES (‘marco@gmail.com’, ‘laura@gmail.com’), (‘laura@gmail.com’, ‘marco@gmail.com’), (‘giulia@gmail.com’, ‘luca@gmail.com’), (‘luca@gmail.com’, ‘giulia@gmail.com’), (‘mario@gmail.com’, ‘anna@gmail.com’), (‘anna@gmail.com’, ‘mario@gmail.com’), (‘paolo@gmail.com’, ‘sara@gmail.com’), (‘sara@gmail.com’, ‘paolo@gmail.com’), (‘matteo@gmail.com’, ‘clara@gmail.com’), (‘clara@gmail.com’, ‘matteo@gmail.com’);

– Dump dei dati per la tabella UTENTE INSERT INTO UTENTE (email, nome, cognome, password) VALUES (‘marco@gmail.com’, ‘Marco’, ‘Rossi’, ‘123456’), (‘laura@gmail.com’, ‘Laura’, ‘Bianchi’, ‘654321’), (‘giulia@gmail.com’, ‘Giulia’, ‘Verdi’, ‘789012’), (‘luca@gmail.com’, ‘Luca’, ‘Neri’, ‘210987’), (‘mario@gmail.com’, ‘Mario’, ‘Bruni’, ‘345678’), (‘anna@gmail.com’, ‘Anna’, ‘Gialli’, ‘876543’), (‘paolo@gmail.com’, ‘Paolo’, ‘Viola’, ‘901234’), (‘sara@gmail.com’, ‘Sara’, ‘Rosa’, ‘432109’), (‘matteo@gmail.com’, ‘Matteo’, ‘Aranci’, ‘567890’), (‘clara@gmail.com’, ‘Clara’, ‘Azzurri’, ‘098765’)
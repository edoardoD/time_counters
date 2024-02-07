Se stai cercando di caricare un'immagine da un form HTML in PHP e salvarla in un campo BLOB nel tuo database, puoi seguire questi passaggi:

1. Prima di tutto, avrai bisogno di un form HTML per l'upload del file. Ecco un esempio di come potrebbe essere fatto¹:

```html
<form enctype="multipart/form-data" method="POST">
    <input type="hidden" name="MAX_FILE_SIZE" value="30000">
    Carica un'immagine in formato jpg o png<br>
    <input type="file" name="immagine"><br><br>
    <input type="submit" value="Invia"><br>
</form>
```

2. Successivamente, nel tuo script PHP, puoi gestire l'upload del file e salvarlo nel tuo database². Ecco un esempio di come potrebbe essere fatto:

```php
$db = new mysqli("localhost", "root", "", "my_unibowebprogramming");

// Controlla se il file è stato caricato correttamente
if (isset($_FILES['immagine']) && $_FILES['immagine']['error'] == 0) {
    $imageData = file_get_contents($_FILES['immagine']['tmp_name']);

    $query = "INSERT INTO IMMAGINI (ref_img) VALUES (?)";
    $stmt = $db->prepare($query);

    // 's' specifica che stiamo inserendo una stringa nel database
    $stmt->bind_param('s', $imageData);

    $stmt->execute();
}
```

In questo esempio, stiamo leggendo i dati dell'immagine dal file temporaneo creato durante l'upload utilizzando `file_get_contents()`, che restituisce i dati dell'immagine come stringa. Quindi, inseriamo questi dati nel database utilizzando una query `INSERT`¹.

Ricorda, è sempre una buona pratica verificare e validare i dati prima di inserirli nel database¹. Questo può aiutare a prevenire errori e a mantenere l'integrità dei dati. Inoltre, dovresti gestire gli errori di connessione al database e le eccezioni che potrebbero verificarsi durante l'esecuzione della query..

Origine: conversazione con Bing, 28/1/2024
(1) #PHP Come inviare un'immagine tramite form creato in HTML. https://www.andreapacchiarotti.it/archivio/php-form-upload.html.
(2) Upload con PHP: caricare un file sul server attraverso un form. https://www.mrw.it/php/upload_6600.html.
(3) PHP – Form e controlli per l’upload di immagini da parte dell’utente .... https://www.manuelmarangoni.it/sir-bit/1608/php-form-e-controlli-per-lupload-di-immagini-da-parte-dellutente/.
(4) it.wikipedia.org. https://it.wikipedia.org/wiki/PHP.
Inviare un array di file in formato JSON non è l'approccio consigliato¹². I file, specialmente le immagini, contengono dati binari che non possono essere direttamente convertiti in una stringa JSON¹². Se provi a convertire un file in una stringa JSON, otterrai un errore o, nel migliore dei casi, una stringa che non rappresenta correttamente i dati del file¹².

Invece di inviare i file come JSON, dovresti utilizzare l'oggetto `FormData` di JavaScript¹. `FormData` ti permette di creare un set di coppie chiave/valore che rappresentano i campi di un modulo¹. Puoi aggiungere i file all'oggetto `FormData` e inviarlo al server utilizzando AJAX¹.

Ecco un esempio di come potresti fare:

```javascript
var fileArray = Array.from(e.target.files);
var formData = new FormData();

fileArray.forEach(function(file, index){
  formData.append('file'+index, file);
});

$.ajax({
  url: 'your-server-script.php',
  type: 'POST',
  data: formData,
  processData: false,  // Impedisce a jQuery di trasformare i dati in una stringa di query
  contentType: false,  // Impedisce a jQuery di impostare l'intestazione del tipo di contenuto
  success: function(data) {
    console.log('Upload successful!');
  },
  error: function(data) {
    console.error('An error occurred!');
  }
});
```

In questo codice, `formData.append('file'+index, file);` aggiunge ciascun file all'oggetto `FormData` con una chiave univoca¹. Quindi, `$.ajax` invia l'oggetto `FormData` al server¹.

Ricorda, tuttavia, che dovrai gestire l'upload dei file sul lato del server PHP¹. Dovrai scrivere un codice PHP che riceve i file, li elabora e li salva nel server¹.

Origine: conversazione con Bing, 15/1/2024
(1) jquery - Sending JSON to PHP using ajax - Stack Overflow. https://stackoverflow.com/questions/10955017/sending-json-to-php-using-ajax.
(2) jQuery: inviare dati in formato JSON a PHP con AJAX. https://gabrieleromanato.com/2017/06/jquery-inviare-dati-in-formato-json-a-php-con-ajax.
(3) Metodo POST in JQuery Ajax - freeCodeCamp.org. https://www.freecodecamp.org/italian/news/metodo-jquery-ajax-post/.
(4) AJAX e JSON, prendere dati da un file json sul server - Coding Creativo. https://www.codingcreativo.it/ajax-e-json/.
(5) undefined. http://example.com/form.php.
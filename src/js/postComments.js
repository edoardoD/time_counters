let html = `
<div class="bg-red">
        <div class="d-flex flex-column bg-opacity-10 bg-dark mx-2 px-3 " style="border-radius: 18px;">
          <div class="d-flex flex-column m-1">
            <span class="m-0 p-0 text-dark fw-bold fs-7" type="button">Mark Z.</span>
            <span class="m-0 p-0 text-dark ">Tha's Great. Keep it up.</span>
          </div>
        </div>
        <div class="mx-2 p-0 d-flex justify-content-start fs-7 text-muted ">
          <div class="mx-2 fw-bold" type="button">Like</div>
          <div class="mx-2 fw-bold" type="button">Reply</div>
          <div class="mx-2 fw-bold" type="button">Share</div>
          <div class="mx-2" type="button">1d</div>
        </div>
      </div>
</div>`;


function chargeComment(divId) {
  let user_id = divId.split("_");

  /*per il testo del commento prendo l'elemento con id passato e 
  poi prendo l'input e il suo valore */
  console.log(divId);
  div = document.getElementById(userd);
  input = div.querySelector('input'); 
  
  $.get('php/router.php', {
    request: 'loadComments',
    textMessage: input.value,
    user: user_id[0],
    postId: user_id[1]
  })
  .done(function(data) {
    console.log(data);
    if (data.result) {
      window.generalToast.fire({
        animation: true,
        title: data.message,
        didOpen: (toast) => {
          document.querySelector('.swal2-popup-custom').style.marginTop = (window.navbarHeight+20) + 'px';
        }
      });
    } else {
      window.generalToast.fire({
        animation: true,
        title: data.error,
        didOpen: (toast) => {
          document.querySelector('.swal2-popup-custom').style.marginTop = (window.navbarHeight+20) + 'px';
        }
      });
    }
  })
  .fail(function() {
    console.log('Error occurred during the AJAX request');
  });
};
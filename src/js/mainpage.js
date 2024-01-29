document.addEventListener('DOMContentLoaded', function () {
  const postsContainer = document.getElementById('posts-container');


  postsContainer.addEventListener('click', function (event) {
    const likeButton = event.target.closest('.like-button');

    if (likeButton && likeButton.classList.contains('like-button')) {
      likeButton.classList.toggle('liked');
    }
  });
});


function createPostMarkup(post) {
  return `
      <div class="post">
          <img src="${post.profileImage}" alt="${post.username}" class="profile-image">
          <div class="post-content">
              <h4 class="mb-3">${post.username}</h4>
              <p>${post.text}</p>
              <div class="actions">
                  <div class="action-icons">
                      <span class="like-button"><i class="fas fa-heart"></i></span>
                      <span><i class="far fa-comment"></i> ${post.comments}</span>
                      <span><i class="far fa-bookmark"></i> ${post.likes}</span>
                  </div>
              </div>
          </div>
      </div>
  `;
}

function openNewPostForm() {
  let fileArray = [];
  Swal.fire({
    title: 'Carica immagine e testo',
    html: `
      <div class="button_outer">
        <div class="btn_upload">
          <input type="file" id="upload_file" accept="image/*"  multiple>
          Upload Image
        </div>
        <div class="processing_bar"></div>
        <div class="success_box"></div>
      </div>
      <div class="error_msg"></div>
      <div class="container" id="img_loaded"></div>
      <textarea id="textUpload" placeholder="Inserisci il tuo testo qui..."></textarea>
    `,
    confirmButtonText: 'Conferma',
    focusConfirm: false,
    didOpen: () => {
      let btnUpload = $("#upload_file"),
        btnOuter = $(".button_outer");

      btnUpload.on("change", function (e) {
        var ext = btnUpload.val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
          $(".error_msg").text("Not an Image...");
        } else {
          $(".error_msg").text("");
          btnOuter.addClass("file_uploading");
          setTimeout(function () {
            btnOuter.addClass("file_uploaded");
          }, 3000);
          fileArray = Array.from(e.target.files);

          fileArray.forEach(function (file, count = 0) {

            let uploadedFile = URL.createObjectURL(file);
            let html = `
            <div class="uploaded_file_view show" id="img${count}" >
              <span class="file_remove" id="remover${count}">X</span>
              <img src="${uploadedFile}" />
            </div>`;
            setTimeout(function () {
              $("#img_loaded").append(html);
              let idImg = "#img" + count
              let remover = "#remover" + count;
              console.log(remover);
              $(remover).click(function () {
                let element = document.getElementById("img" + count);
                let parent = element.parentElement;
                element.parentNode.removeChild(element);
                console.log("remover pressed");
                console.log(parent.children.length);
                if (parent.children.length == 0) {
                  btnOuter.removeClass("file_uploading");
                  btnOuter.removeClass("file_uploaded");
                }

              });
            }, 3500);

          });
        }
      });
    },
    preConfirm: () => {
      let formData = new FormData();
      let text = $("#textUpload").val();

      fileArray.forEach(function (file, index) {
        formData.append('file' + index, file);
      });
      formData.append('text', text);
      formData.append('arrayLength', fileArray.length);
      formData.append('request', 'chargePost');
      return { formData };
    }
  }).then((result) => {
    //console.log(result);
    if (result.value) {
      for (let [nomeCampo, valore] of result.value.formData.entries()) {
        console.log(`${nomeCampo} = ${valore}`); // Stampa 'nome = Luigi'
      }
      // Invia formData con Fetch
      fetch('php/router.php', { // Sostituisci con l'URL del tuo script PHP
        method: 'POST',
        body: result.value.formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            let marginBotn = window.footerHeigt + 10;
            window.generalToast.fire({
              title: data.message,
              icon: 'success',
              position: 'bottom',
              didOpen: (toast) => {
                document.querySelector('.swal2-popup-custom').style.marginBotton = marginBotn + 'px';
              }
            });
          }else{
            console.log(data);
          }
        })
        .catch((error) => {
          console.log('Errore nell\'invio dei dati: ', error);
        });
    }
  });

}

function renderPosts() {
  const postsContainer = document.getElementById('posts-container');
  const fragment = document.createDocumentFragment();

  posts.forEach(post => {
    const postElement = document.createRange().createContextualFragment(createPostMarkup(post));
    fragment.appendChild(postElement);
  });

  postsContainer.innerHTML = ''; // Pulisce il contenuto del container
  postsContainer.appendChild(fragment); // Aggiunge il fragment al container
}

posts = [];




function popUpFunction(msg) {
  Swal.fire({
    title: 'Utente non registrato',
    text: '' + msg,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Annulla',
  }).then((result) => {
    if (result.isConfirmed) {
      // Azione da eseguire se l'utente clicca su OK

      window.location.href = "index.php?page=register";


    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Azione da eseguire se l'utente clicca su Annulla
      window.location.href = "index.php?page=home";
    }
  });
}


$(function () {
  $.ajax({
    type: 'GET',
    dataType: "json",
    url: "php/router.php",
    data: {
      request: 'loadPosts'
    },
    success: function (data) {
      if (data.result) {
        post = data.posts
      } else {
        popUpFunction(data.error);
      }
    },
    error: function (error) {
      let marginTop = window.navbarHeight + 20;
      window.generalToast.fire({
        title: 'Il server non risponde',
        icon: 'error',
        didOpen: (toast) => {
          document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';
        }
      });
      console.log(error);
    }
  });
});
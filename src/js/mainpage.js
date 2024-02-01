document.addEventListener('DOMContentLoaded', function () {
  const postsContainer = document.getElementById('posts-container');


  postsContainer.addEventListener('click', function (event) {
    const likeButton = event.target.closest('.like-button');

    if (likeButton && likeButton.classList.contains('like-button')) {
      likeButton.classList.toggle('liked');
    }
  });
});

{/* <img src="${post.profileImage}" alt="${post.username}" class="profile-image"></img> */}
function createPostMarkup(post) {
  let commentId = ("" + post.username + post.id).replace(/\s/g, '');
  
  
  return `
      <div class="post">
        <div class="post-content">
            <h4 class="mb-3">${post.username}</h4>
            <p>${post.text}</p>
            <div class="actions">
                <div class="action-icons">
                    <p>${post.likes}</p><span class="like-button"><i class="fas fa-heart"></i></span>
                    <p>${post.comments}</p>
                    <a
                      id="faceCollapse"
                      class=" collapsed"
                      data-bs-toggle="collapse"
                      href="#${commentId}"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    ><span><i class="fa-regular fa-comment"></i></span></a>
                    <span><i class="far fa-bookmark"></i> </span>
                </div>
            </div>
        </div>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="inserisci un commento" aria-label="Input group example" aria-describedby="basic-addon1">
                <span class="input-group-text" id="basic-addon1" style="cursor:pointer;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
          </svg>
                </span>
        </div>
        <div id="${commentId}" class="collapse mt-3 scrollable">
          <div class="bg-red">
            <div class="d-flex flex-column bg-opacity-10 bg-dark mx-2 px-3 " style="border-radius: 18px;">
              <div class="d-flex flex-column m-1">
                <span class="m-0 p-0 text-dark fw-bold fs-7" type="button">Mark Z.</span>
                <span class="m-0 p-0 text-dark ">sto impazzendo</span>
              </div>
            </div>
            <div class="mx-2 p-0 d-flex justify-content-start fs-7 text-muted ">
              <div class="mx-2 fw-bold" type="button">Like</div>
              <div class="mx-2 fw-bold" type="button">Reply</div>
              <div class="mx-2 fw-bold" type="button">Share</div>
              <div class="mx-2" type="button">1d</div>
            </div>
          </div>
          <div class="bg-red">
            <div class="d-flex flex-column bg-opacity-10 bg-dark mx-2 px-3 " style="border-radius: 18px;">
              <div class="d-flex flex-column m-1">
                <span class="m-0 p-0 text-dark fw-bold fs-7" type="button">Mark Z.</span>
                <span class="m-0 p-0 text-dark ">sto impazzendo</span>
              </div>
            </div>
            <div class="mx-2 p-0 d-flex justify-content-start fs-7 text-muted ">
              <div class="mx-2 fw-bold" type="button">Like</div>
              <div class="mx-2 fw-bold" type="button">Reply</div>
              <div class="mx-2 fw-bold" type="button">Share</div>
              <div class="mx-2" type="button">1d</div>
            </div>
          </div>
          <div class="bg-red">
            <div class="d-flex flex-column bg-opacity-10 bg-dark mx-2 px-3 " style="border-radius: 18px;">
              <div class="d-flex flex-column m-1">
                <span class="m-0 p-0 text-dark fw-bold fs-7" type="button">Mark Z.</span>
                <span class="m-0 p-0 text-dark ">sto impazzendo</span>
              </div>
            </div>
            <div class="mx-2 p-0 d-flex justify-content-start fs-7 text-muted ">
              <div class="mx-2 fw-bold" type="button">Like</div>
              <div class="mx-2 fw-bold" type="button">Reply</div>
              <div class="mx-2 fw-bold" type="button">Share</div>
              <div class="mx-2" type="button">1d</div>
            </div>
          </div>
          <div class="bg-red">
            <div class="d-flex flex-column bg-opacity-10 bg-dark mx-2 px-3 " style="border-radius: 18px;">
              <div class="d-flex flex-column m-1">
                <span class="m-0 p-0 text-dark fw-bold fs-7" type="button">Mark Z.</span>
                <span class="m-0 p-0 text-dark ">LOLLONEEEEEE</span>
              </div>
            </div>
            <div class="mx-2 p-0 d-flex justify-content-start fs-7 text-muted ">
              <div class="mx-2 fw-bold" type="button">Like</div>
              <div class="mx-2 fw-bold" type="button">Reply</div>
              <div class="mx-2 fw-bold" type="button">Share</div>
              <div class="mx-2" type="button">1d</div>
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
  
  const postsContainer = document.getElementById('post-section');
  const fragment = document.createDocumentFragment();

  posts.forEach(post => {
    const postElement = document.createRange().createContextualFragment(createPostMarkup(post));
    fragment.appendChild(postElement);
  });

  postsContainer.innerHTML = ''; // Pulisce il contenuto del container
  postsContainer.appendChild(fragment); // Aggiunge il fragment al container
}

posts = [
  {
    username: "utente 1",
    text: 'First Post',
    id : 1,
    comments: 2,
    likes: 5,
  },
  {
    username: "utente 1",
    text: 'First Post',
    id : 3,
    comments: 2,
    likes: 5,
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'This is the second post.',
    comments: 2,
    likes: 5,
  },
  {
    id: 3,
    title: 'Third Post',
    content: 'This is the third post.',
    comments: 2,
    likes: 5,
  },
];


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
        // post = data.posts
        renderPosts();
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
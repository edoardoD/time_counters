$(function () {

  $.ajax({
    type: 'GET',
    dataType: "json",
    url: "php/router.php",
    data: {
      request: 'loadPosts'
    },
    success: function (data) {
      console.log(data);
      if (data.result) {
        renderPosts(data.posts);
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

document.addEventListener('DOMContentLoaded', function () {
  const postsContainer = document.getElementById('posts-container');
  
  postsContainer.addEventListener('click', function (event) {
    const likeButton = event.target.closest('.like-button');

    if (likeButton && likeButton.classList.contains('like-button')) {
      likeButton.classList.toggle('liked');

      // Aggiungi la chiamata AJAX per incrementare il numero di like
      const postId = likeButton.dataset.postId;

      $.ajax({
        type: 'GET',
        dataType: "json",
        url: "php/router.php",
        data: {
          request: 'incrementLike',
          postId: postId
        },
        success: function (data) {
          if (data.result) {
            // Aggiorna l'UI con il nuovo numero di like
            const likeCountElement = likeButton.parentElement.querySelector('.actions p');
            likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
          } else {
            popUpFunction(data.error);
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
    }
  });
});

{/* <img src="${post.profileImage}" alt="${post.username}" class="profile-image"></img> */ }
function createPostMarkup(post) {
  let postKey = post.username+"_"+post.id; 
  let commentKey = post.username+""+post.id; 
  console.log(postKey);
  return `
      <div class="post">
        <img src="${post.profileImage}" alt="${post.nome}" class="profile-image">
        <img src="${post.path_img}" alt="Post Image" class="post-image"> <!-- Aggiunto il tag img per l'immagine del post -->
        <div class="post-content">
            <h4 class="mb-3">${post.nome}</h4>
            <p>${post.descrizione}</p>
            <div class="actions">
                <div class="action-icons">
                    <p>${post.likes}</p><span class="like-button"><i class="fas fa-heart"></i></span>
                    <p>${post.comments}</p>
                    <a
                      id="faceCollapse"
                      class=" collapsed"
                      data-bs-toggle="collapse"
                      href="#${commentKey}"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    ><span><i class="fa-regular fa-comment"></i></span></a>
                    <span><i class="far fa-bookmark"></i> </span>
                </div>
            </div>
        </div>
        <div id="${postKey}" class="input-group">
          <input type="text" name="textComment" class="form-control" placeholder="inserisci un commento" aria-label="Input group example" aria-describedby="basic-addon1">
                <span class="input-group-text" onclick="uploadComments(this.parentElement.id)" id="basic-addon1" style="cursor:pointer;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                  </svg>
                </span>
        </div>
        <div id="${commentKey}" class="collapse mt-3 scrollable">
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
          } else {
            console.log(data.error);
          }
        })
        .catch((error) => {
          console.log('Errore nell\'invio dei dati: ', error);
        });
    }
  });

}

function renderPosts(posts) {

  const postsContainer = document.getElementById('post-section');
  const fragment = document.createDocumentFragment();

  posts.forEach(post => {
    const postElement = document.createRange().createContextualFragment(createPostMarkup(post));
    fragment.appendChild(postElement);
    
    const myCollapsible = fragment.getElementById(post.username+""+post.id)
      myCollapsible.addEventListener('show.bs.collapse', event => {
        requestComments(post.username, post.id, myCollapsible.id);
    })
  });

  postsContainer.innerHTML = ''; // Pulisce il contenuto del container
  postsContainer.appendChild(fragment); // Aggiunge il fragment al container
}

function popUpFunction(msg) {
  Swal.fire({
    title: 'ATTENZIONE',
    text: '' + msg,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'registrati o esegui il login',
    cancelButtonText: 'continua in anonimato',
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




function uploadComments(divId) {
  let user_id = divId.split("_");

  /*per il testo del commento prendo l'elemento con id passato e 
  poi prendo l'input e il suo valore */
  console.log(divId);
  div = document.getElementById(divId);
  input = div.querySelector('input'); 
  
  $.get('php/router.php', {
    request: 'uploadComments',
    textMessage: input.value,
    postId: user_id[1]
  })
  .done(function(data) {
    console.log(data);
    if (data.result) {
      
      window.generalToast.fire({
        animation: true,
        title: data.message,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
          document.querySelector('.swal2-popup-custom').style.marginTop = (window.navbarHeight+20) + 'px';
        },
        didClose: (toast) => {  location.reload();}
      });
    } else {
      window.generalToast.fire({
        animation: true,
        icon: 'error',
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

function requestComments(user, postId, divid) {
  $.get('php/router.php', {
    request: 'loadComments',
    postId: postId
  })
  .done(function(data) {
    console.log(data);
    if (data.result) {
      renderComments(data.comments,divid);
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
}

function createCommentMarkup (comment) {
  let html = `
<div class="bg-red">
        <div class="d-flex flex-column bg-opacity-10 bg-dark mx-2 px-3 " style="border-radius: 18px;">
          <div class="d-flex flex-column m-1">
            <span class="m-0 p-0 text-dark fw-bold fs-7" type="button">${comment.author}</span>
            <span class="m-0 p-0 text-dark ">${comment.text}</span>
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
return html;
}

function renderComments(comments,commentsContainerId) {
  const commentsContainer = document.getElementById(commentsContainerId);
  const fragment = document.createDocumentFragment();

  comments.forEach(comment => {
    const commentElement = document.createRange().createContextualFragment(createCommentMarkup(comment));
    fragment.appendChild(commentElement);
  });

  commentsContainer.innerHTML = ''; // Pulisce il contenuto del container
  commentsContainer.appendChild(fragment); // Aggiunge il fragment al container

}

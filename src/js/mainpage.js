

document.addEventListener('DOMContentLoaded', function () {
  const postsContainer = document.getElementById('posts-container');

  //renderPosts();
  toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
      document.querySelector('.swal2-popup-custom').style.marginTop = marginTop + 'px';
    },
    customClass: {
      popup: 'swal2-popup-custom'
    }
  });

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
          <img src="https://via.placeholder.com/50" alt="${post.username}" class="profile-image">
          <div class="post-content">
              <h4 class="mb-3">${post.username}</h4>
              <p>${post.text}</p>
              <div class="actions">
                  <div class="action-icons">
                      <span class="like-button"><i class="fas fa-heart"></i></span>
                      <span><i class="far fa-comment"></i></span>
                      <span><i class="far fa-bookmark"></i></span>
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
      return { formData, text };
    }
  }).then((result) => {
    if (result.value) {
      console.log(result.value);
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

posts = [
  //{ username: 'utente1', text: 'Questo è un post di utente1' },
  //{ username: 'utente2', text: 'Ecco cosa ha pubblicato utente2' },
  //{ username: 'utente2', text: 'Ecco cosa ha pubblicato utente3' },
  //{ username: 'utente2', text: 'Ecco cosa ha pubblicato utente4' },
  //{ username: 'utente2', text: 'Ecco cosa ha pubblicato utente4' },
  //{ username: 'utente2', text: 'Ecco cosa ha pubblicato utente4' },
  //{ username: 'utente2', text: 'Ecco cosa ha pubblicato utente4' },
  //{ username: 'utente2', text: 'Ecco cosa ha pubblicato utente4' },
  //{ username: 'utente2', text: 'Ecco cosa ha pubblicato utente4' },
  // Aggiungi altri post secondo necessità
];


$(function () {
  footerHeigt = document.querySelector('footer').offsetHeight;
  var bottomPosition = footerHeigt + 10;

  //allert più figo per quando si faranno i post
  postAlert = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'Posted successfully',
    animation: false,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
      document.querySelector('.swall-alert-postInfo').style.marginBottom = bottomPosition + 'px';
    },
    customClass: {
      popup: '.swall-alert-postInfo'
    }
  });

});

function popUpFunction() {
  if (confirm("Utente non loggato")) {
    $.get("index.php", { page: "register" })
  } else {
    $.get("index.php", { page: "home" })
  }
}

// $(function () {
//   $.ajax({
//     type: 'GET',
//     dataType: "json",
//     url: "php/router.php",
//     data: {
//       request: 'loadPosts'
//     },
//     success: function (data) {
//       if (data.result) {
//         post = data.posts
//       } else {
//         popUpFunction();
//       }
//     },
//     error: function (error) {
//       toastMixin.fire({
//         title: 'Il server non risponde',
//         icon: 'error'
//       });
//         console.log(error);
//     }
//   });
// });
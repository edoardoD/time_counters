function confirmLogOut(){
    swall.fire({
        title: 'Sei sicuro di voler uscire?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sì',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            $.get("router.php", { request: "logout" });
        }
    });
};
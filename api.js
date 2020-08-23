$(function () {
    var $userdata = $("#userdata");
    var $name = $("#name");
    var $email = $("#email");

    // loading user list
    $.ajax({
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/users",
        dataType: "json",
        success: function (data) {
            console.log(data);
            $.each(data, function (i, tmpData) {
                $userdata.append(
                    "<li>Name : " +
                    tmpData.name +
                    "Email Id : " +
                    tmpData.email +
                    "<button data-id=" +
                    tmpData.id +
                    " class='remove'>" +
                    "Delete </button>" +
                    "</li>"
                );
            });
        },
        error: function () {
            alert("Error on loading user list.");
        },
    });

    // adding new user
    $("#add-user").on("click", function () {
        var users = {
            name: $name.val(),
            email: $email.val(),
        };

        $.ajax({
            type: "POST",
            url: "https://jsonplaceholder.typicode.com/users",
            dataType: "json",
            data: users,
            success: function (newUser) {
                $userdata.append(
                    "<li>Name : " +
                    newUser.name +
                    "Email Id : " +
                    newUser.email +
                    "<button data-id=" +
                    newUser.id +
                    " class='remove'>" +
                    "Delete </button>" +
                    "</li>"
                );
                alert("User added!");
            },
            error: function () {
                alert("Error on adding user.");
            },
        });
    });

    //   deleting user

    $userdata.delegate(".remove", "click", function () {
        var $li = $(this).closest("li");
        $.ajax({
            type: "DELETE",
            url:
                "https://jsonplaceholder.typicode.com/users/" + $(this).attr("data-id"),
            dataType: "json",
            success: function () {
                $li.fadeOut(500, function () {
                    $(this).remove();
                });
                alert("User Deleted!");
            },
            error: function () {
                alert("Error on deleting user.");
            },
        });
    });
});

$(function () {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name");
            var email = $("input#email");
            var message = $("textarea#message");
            var btnSend = $("#btnSend");
            var firstName = name.val(); // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.val().split(' ').slice(0, -1).join(' ');
            }

            const func_done = function(response){
                console.log(response);

                if(response.toUpperCase() === "OK"){
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Super. Die Mail wurde versandt</strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    name.val("");
                    email.val("");
                    message.val("");
                    $('.floating-label-form-group-with-value').removeClass("floating-label-form-group-with-value");

                    //Button Load
                    btnSend.removeClass('active');
                } else {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Schade, </strong>" + firstName + ".  <br>Es scheint so, dass der Mail Server nicht erreichbar ist. Bitte versuche es Später erneut.");
                    $('#success > .alert-danger').append('</div>');

                    //Button Load
                    btnSend.removeClass('active');
                }
            };

            //Button Load
            btnSend.addClass('active');

            Email.send(
                "martinweber.9393@gmail.com",
                "martinweber.9393@gmail.com",
                "Github-Page Kontakt von: " + name.val(),
                "Du hast eine neue Nachricht bekommen.<br><br>Hier sind die Details:<br><br>Name: " + name.val() + "<br>Email: " + email.val() + "<br>Message:<br>" + message.val(),
                {
                    //token: "2030a1c5-db92-4e56-935a-7dac1a075659", //localhost
                    token: "8eb8622c-4a8b-4bbf-8ad2-e7acc26c8409", //martinweber93.github.io
                    callback: func_done
                }
            );
        },
        filter: function () {
            return $(this).is(":visible");
        }
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
    $('#success').html('');
});

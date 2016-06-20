$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name");
            var email = $("input#email");
            var phone = $("input#phone");
            var message = $("textarea#message");
            var btnSend = $("#btnSend");
            var firstName = name.val(); // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.val().split(' ').slice(0, -1).join(' ');
            }

            //Button Load
            btnSend.addClass('active');
            setTimeout(function(){
                $.ajax({
                    url: "./assets/mail/contact_me.php",
                    type: "POST",
                    data: {
                        name: name.val(),
                        phone: phone.val(),
                        email: email.val(),
                        message: message.val()
                    },
                    cache: false,
                    success: function() {
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
                    },
                    error: function() {
                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-danger').append("<strong>Schade, </strong>" + firstName + ".  <br>Es scheint so, dass der Mail Server nicht erreichbar ist. Bitte versuche es Später erneut.");
                        $('#success > .alert-danger').append('</div>');

                        //Button Load
                        btnSend.removeClass('active');
                    }
                });
            }, 300);


        },
        filter: function() {
            return $(this).is(":visible");
        }
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

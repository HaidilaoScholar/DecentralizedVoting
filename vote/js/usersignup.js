
    window.onload = function() {
        var form = document.querySelector('form');
        var signupButton = document.querySelector('.btn');

        signupButton.addEventListener('click', function(event) {
            event.preventDefault();

            var username = form.elements['username'].value;
            var accessCode = form.elements['accessCode'].value;
            var email = form.elements['email'].value;
            var password = form.elements['password'].value;

            var user = {
                username: username,
                accessCode: accessCode,
                email: email,
                password: password
            };

            localStorage.setItem('user', JSON.stringify(user));

            window.location.href = 'login.html';
        });
    };
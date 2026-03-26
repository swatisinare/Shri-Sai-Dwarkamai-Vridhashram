document.addEventListener('DOMContentLoaded', function () {

    // ===== Web3Forms Submission =====
    function submitToWeb3Forms(formData, successTitle, successMsg, form, onSuccess) {
        if (!CONFIG || CONFIG.WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
            showModal(successTitle, successMsg + ' (Note: Email not configured — add your Web3Forms key in js/config.js)');
            form.reset();
            if (onSuccess) onSuccess();
            return;
        }

        formData.append('access_key', CONFIG.WEB3FORMS_ACCESS_KEY);

        var submitBtn = form.querySelector('button[type="submit"]');
        var originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) { submitBtn.textContent = 'Sending...'; submitBtn.disabled = true; }

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
                showModal(successTitle, successMsg);
                form.reset();
                if (onSuccess) onSuccess();
            } else {
                showModal('Oops!', 'Something went wrong. Please try again later.');
            }
        })
        .catch(function () {
            showModal('Oops!', 'Network error. Please check your connection and try again.');
        })
        .finally(function () {
            if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
        });
    }

    // ===== Validation Helpers =====
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^[6-9]\d{9}$/.test(phone.replace(/\s|-/g, ''));
    }

    function showError(field, message) {
        var group = field.closest('.form-group');
        if (!group) return;
        group.classList.add('error');
        var errorEl = group.querySelector('.error-message');
        if (errorEl) errorEl.textContent = message;
    }

    function clearError(field) {
        var group = field.closest('.form-group');
        if (!group) return;
        group.classList.remove('error');
    }

    function clearAllErrors(form) {
        form.querySelectorAll('.form-group').forEach(function (g) {
            g.classList.remove('error');
        });
    }

    // ===== Modal =====
    function showModal(title, message) {
        var overlay = document.querySelector('.modal-overlay');
        if (!overlay) return;
        var modal = overlay.querySelector('.modal');
        modal.querySelector('h3').textContent = title;
        modal.querySelector('p').textContent = message;
        overlay.classList.add('active');
    }

    function closeModal() {
        var overlay = document.querySelector('.modal-overlay');
        if (overlay) overlay.classList.remove('active');
    }

    var modalClose = document.querySelector('.modal-close');
    var modalBtn = document.querySelector('.modal .btn');
    var modalOverlay = document.querySelector('.modal-overlay');

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBtn) modalBtn.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // ===== Clear errors on input =====
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(function (field) {
        field.addEventListener('input', function () {
            clearError(field);
        });
    });

    // ===== Contact Form =====
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            clearAllErrors(contactForm);
            var valid = true;

            var name = contactForm.querySelector('[name="name"]');
            var email = contactForm.querySelector('[name="email"]');
            var subject = contactForm.querySelector('[name="subject"]');
            var message = contactForm.querySelector('[name="message"]');

            if (!name.value.trim()) { showError(name, 'Please enter your name'); valid = false; }
            if (!email.value.trim()) { showError(email, 'Please enter your email'); valid = false; }
            else if (!isValidEmail(email.value)) { showError(email, 'Please enter a valid email'); valid = false; }
            if (!subject.value.trim()) { showError(subject, 'Please enter a subject'); valid = false; }
            if (!message.value.trim()) { showError(message, 'Please enter your message'); valid = false; }

            if (valid) {
                var formData = new FormData();
                formData.append('subject', 'New Contact Message — ' + subject.value.trim());
                formData.append('from_name', name.value.trim());
                formData.append('Name', name.value.trim());
                formData.append('Email', email.value.trim());
                formData.append('Subject', subject.value.trim());
                formData.append('Message', message.value.trim());
                submitToWeb3Forms(formData, 'Thank You!', 'Your message has been sent. We will get back to you shortly.', contactForm);
            }
        });
    }

    // ===== Volunteer Form =====
    var volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            clearAllErrors(volunteerForm);
            var valid = true;

            var name = volunteerForm.querySelector('[name="name"]');
            var email = volunteerForm.querySelector('[name="email"]');
            var phone = volunteerForm.querySelector('[name="phone"]');
            var age = volunteerForm.querySelector('[name="age"]');
            var role = volunteerForm.querySelector('[name="role"]');

            if (!name.value.trim()) { showError(name, 'Please enter your name'); valid = false; }
            if (!email.value.trim()) { showError(email, 'Please enter your email'); valid = false; }
            else if (!isValidEmail(email.value)) { showError(email, 'Please enter a valid email'); valid = false; }
            if (!phone.value.trim()) { showError(phone, 'Please enter your phone number'); valid = false; }
            else if (!isValidPhone(phone.value)) { showError(phone, 'Please enter a valid 10-digit phone number'); valid = false; }
            if (!age.value.trim() || parseInt(age.value) < 16 || parseInt(age.value) > 80) { showError(age, 'Please enter a valid age (16-80)'); valid = false; }
            if (!role.value) { showError(role, 'Please select a preferred role'); valid = false; }

            if (valid) {
                var availability = volunteerForm.querySelector('[name="availability"]:checked');
                var msg = volunteerForm.querySelector('[name="message"]');
                var formData = new FormData();
                formData.append('subject', 'New Volunteer Registration — ' + name.value.trim());
                formData.append('from_name', name.value.trim());
                formData.append('Name', name.value.trim());
                formData.append('Email', email.value.trim());
                formData.append('Phone', phone.value.trim());
                formData.append('Age', age.value.trim());
                formData.append('Availability', availability ? availability.value : 'Not specified');
                formData.append('Preferred Role', role.value);
                formData.append('Message', msg ? msg.value.trim() : '');
                submitToWeb3Forms(formData, 'Welcome Aboard!', 'Thank you for volunteering! Our team will contact you within 48 hours.', volunteerForm);
            }
        });
    }

    // ===== Donation Form =====
    var donateForm = document.getElementById('donate-form');
    if (donateForm) {
        var amountBtns = document.querySelectorAll('.amount-btn');
        var customAmount = document.getElementById('custom-amount');

        amountBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                amountBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                if (customAmount) customAmount.value = '';
            });
        });

        if (customAmount) {
            customAmount.addEventListener('input', function () {
                amountBtns.forEach(function (b) { b.classList.remove('active'); });
            });
        }

        var toggleOptions = document.querySelectorAll('.toggle-option');
        toggleOptions.forEach(function (opt) {
            opt.addEventListener('click', function () {
                toggleOptions.forEach(function (o) { o.classList.remove('active'); });
                opt.classList.add('active');
            });
        });

        var paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(function (method) {
            method.addEventListener('click', function () {
                paymentMethods.forEach(function (m) { m.classList.remove('active'); });
                method.classList.add('active');
            });
        });

        donateForm.addEventListener('submit', function (e) {
            e.preventDefault();
            clearAllErrors(donateForm);
            var valid = true;

            var name = donateForm.querySelector('[name="name"]');
            var email = donateForm.querySelector('[name="email"]');
            var phone = donateForm.querySelector('[name="phone"]');

            if (!name.value.trim()) { showError(name, 'Please enter your name'); valid = false; }
            if (!email.value.trim()) { showError(email, 'Please enter your email'); valid = false; }
            else if (!isValidEmail(email.value)) { showError(email, 'Please enter a valid email'); valid = false; }
            if (!phone.value.trim()) { showError(phone, 'Please enter your phone number'); valid = false; }
            else if (!isValidPhone(phone.value)) { showError(phone, 'Please enter a valid 10-digit phone number'); valid = false; }

            var activeAmount = document.querySelector('.amount-btn.active');
            var customVal = customAmount ? customAmount.value.trim() : '';
            if (!activeAmount && !customVal) {
                if (customAmount) showError(customAmount, 'Please select or enter a donation amount');
                valid = false;
            }

            if (valid) {
                var amount = activeAmount ? activeAmount.textContent.trim() : 'Rs. ' + customVal;
                var frequency = document.querySelector('.toggle-option.active');
                var payment = document.querySelector('.payment-method.active');
                var formData = new FormData();
                formData.append('subject', 'New Donation — ' + amount + ' from ' + name.value.trim());
                formData.append('from_name', name.value.trim());
                formData.append('Name', name.value.trim());
                formData.append('Email', email.value.trim());
                formData.append('Phone', phone.value.trim());
                formData.append('Donation Amount', amount);
                formData.append('Frequency', frequency ? frequency.textContent.trim() : 'One-time');
                formData.append('Payment Method', payment ? payment.textContent.trim() : 'Not selected');
                submitToWeb3Forms(formData, 'Thank You for Your Generosity!', 'Your donation means the world to our elders. You will receive a confirmation email shortly.', donateForm, function () {
                    amountBtns.forEach(function (b) { b.classList.remove('active'); });
                });
            }
        });
    }

});

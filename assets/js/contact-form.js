/* ========================================
   Contact Form - Web3Forms Integration
   ======================================== */

(function() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var btn = form.querySelector('button[type="submit"]');
        var btnText = btn.querySelector('span');
        var btnIcon = btn.querySelector('i');
        var originalText = btnText.textContent;
        var originalIcon = btnIcon.className;

        // Show sending state
        btnText.textContent = 'Sending...';
        btnIcon.className = 'fas fa-spinner fa-spin';
        btn.disabled = true;

        var formData = new FormData(form);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.success) {
                btnText.textContent = 'Message Sent!';
                btnIcon.className = 'fas fa-check';
                btn.style.background = '#2ecc71';
                form.reset();
            } else {
                throw new Error(data.message || 'Submission failed');
            }

            setTimeout(function() {
                btnText.textContent = originalText;
                btnIcon.className = originalIcon;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        })
        .catch(function(error) {
            console.error('Form error:', error);
            btnText.textContent = 'Failed to Send';
            btnIcon.className = 'fas fa-exclamation-triangle';
            btn.style.background = '#e74c3c';

            setTimeout(function() {
                btnText.textContent = originalText;
                btnIcon.className = originalIcon;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    });
})();

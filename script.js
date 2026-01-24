
        function switchTab(tabName) {
            document.querySelectorAll('.content-area').forEach(area => area.classList.remove('active'));
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
            event.currentTarget.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function filterPhotos(category) {
            const items = document.querySelectorAll('.gallery-item');
            const buttons = document.querySelectorAll('.filter-btn');

            buttons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.filter === category) btn.classList.add('active');
            });

            items.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        }

        function openLightbox(imageSrc, title) {
            document.getElementById('lightbox').classList.add('active');
            document.getElementById('lightboxImage').src = imageSrc;
            document.getElementById('lightboxTitle').textContent = title;
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        let selectedRating = 0;
        const stars = document.querySelectorAll('.star');

        stars.forEach(star => {
            star.addEventListener('click', function() {
                selectedRating = this.dataset.rating;
                updateStars(selectedRating);
            });
        });

        function updateStars(rating) {
            stars.forEach((star, index) => {
                star.classList.toggle('active', index < rating);
            });
        }

        document.getElementById('feedbackForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('userName').value;
            const phone = document.getElementById('userPhone').value;
            const message = document.getElementById('userMessage').value;
            const rating = selectedRating || 'Not rated';

            const whatsappMessage = `
*New Feedback - Laxmi Frames & Films Studio* 📸

👤 *Name:* ${name}
📱 *Phone:* ${phone}
⭐ *Rating:* ${rating}/5

💬 *Feedback:*
${message}

---
Sent via Photography Mobile App
            `.trim();

            const whatsappURL = `https://wa.me/918625852408?text=${encodeURIComponent(whatsappMessage)}`;

            document.getElementById('overlay').classList.add('show');
            document.getElementById('successMessage').classList.add('show');

            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                setTimeout(() => {
                    document.getElementById('overlay').classList.remove('show');
                    document.getElementById('successMessage').classList.remove('show');
                    document.getElementById('feedbackForm').reset();
                    selectedRating = 0;
                    updateStars(0);
                }, 1000);
            }, 1500);
        });

        window.addEventListener('scroll', function() {
            const scrollTop = document.getElementById('scrollTop');
            scrollTop.classList.toggle('show', window.pageYOffset > 300);
        });

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => imageObserver.observe(img));
        }

        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) event.preventDefault();
            lastTouchEnd = now;
        }, false);

        document.querySelectorAll('button, a, .gallery-item, .album-card, .package-card').forEach(element => {
            element.addEventListener('touchstart', function() { this.style.opacity = '0.7'; });
            element.addEventListener('touchend', function() { this.style.opacity = '1'; });
        });
    
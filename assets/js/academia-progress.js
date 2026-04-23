/**
 * MigoCreativo — Academia Progress & Filtering
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Filtering Logic
    const filterBtns = document.querySelectorAll('.mc-filter-btn');
    const lessonItems = document.querySelectorAll('.lesson-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            const filter = btn.getAttribute('data-filter');
            lessonItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-level') === filter) {
                    item.style.display = 'block';
                    // Quick re-trigger for animation
                    setTimeout(() => item.classList.add('visible'), 50);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('visible');
                }
            });
        });
    });

    // 2. Progress Logic
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    // Total lessons is 8
    const totalLessons = 8;
    
    function updateProgress() {
        if (!progressBar) return; // Only run on index page
        
        let completed = 0;
        
        // Check localStorage for each lesson and update UI
        for (let i = 1; i <= totalLessons; i++) {
            const isCompleted = localStorage.getItem(`mc_lesson_${i}`) === 'true';
            if (isCompleted) completed++;
            
            // Mark visually on the grid
            const linkNode = document.querySelector(`a[data-lesson-id="${i}"]`);
            if (linkNode && isCompleted) {
                linkNode.querySelector('.mc-lesson-card').classList.add('is-completed');
            }
        }
        
        // Update bar
        const percentage = (completed / totalLessons) * 100;
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${completed}/${totalLessons} Lecciones`;
    }

    // Call on load
    updateProgress();

    // 3. Mark current lesson as completed (if on a lesson page)
    const currentLessonNum = document.querySelector('.mc-lesson-num');
    if (currentLessonNum) {
        // Text is "Lección X"
        const text = currentLessonNum.textContent.trim();
        const num = text.replace('Lección ', '');
        if (num && !isNaN(num)) {
            // Mark as completed after 5 seconds of reading
            setTimeout(() => {
                localStorage.setItem(`mc_lesson_${num}`, 'true');
            }, 5000);
        }
    }
});

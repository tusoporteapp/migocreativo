const fs = require('fs');
const path = require('path');

const scriptToInject = `
    <script>
        // Scroll reveal animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.mc-reveal').forEach(el => observer.observe(el));
    </script>
`;

const filesToFix = [
    path.join(__dirname, 'academia/index.html'),
    path.join(__dirname, 'blog/index.html')
];

for (const filePath of filesToFix) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('const observer = new IntersectionObserver')) {
            content = content.replace('</body>', scriptToInject + '</body>');
            fs.writeFileSync(filePath, content);
            console.log('Fixed animations in: ' + filePath);
        } else {
            console.log('Animations already present in: ' + filePath);
        }
    }
}

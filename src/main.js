import './css/styles.css';

// Import images so Vite processes and optimizes them
import heroImage from './images/hero/background-hero.png';
import heroImage2x from './images/hero/background-hero@2x.png';

// Set hero image src and srcset after DOM is ready
const heroImg = document.querySelector('.hero-image');
if (heroImg) {
  heroImg.src = heroImage;
  heroImg.srcset = `${heroImage} 1x, ${heroImage2x} 2x`;
}

let currentIndex = 0;
let isPrinting = false;

const images = [
    '../assets/image1.jpg',  // Gambar 1
    '../assets/image2.jpg',  // Gambar 2
    '../assets/image3.jpg',  // Gambar 3
    '../assets/image4.jpg',  // Gambar 4
    '../assets/image5.jpg'   // Gambar 5
];

const soundUrl = '../assets/printer-sound.mp3';  // File suara printer

// Create audio element
const printSound = new Audio(soundUrl);

// Background music autoplay (handle user interaction requirement)
const bgMusic = document.getElementById('bgMusic');
document.addEventListener('click', function() {
    bgMusic.play().catch(e => console.log('Music play failed:', e));
}, { once: true });

// Print button functionality
document.getElementById('printBtn').addEventListener('click', function() {
    if (isPrinting) return;

    isPrinting = true;
    const printBtn = document.getElementById('printBtn');
    const printerLight = document.getElementById('printerLight');
    printBtn.disabled = true;
    printerLight.classList.add('printing');

    const outputArea = document.getElementById('outputArea');
    const existingPaper = outputArea.querySelector('.paper');

    // Remove existing paper
    if (existingPaper) {
        existingPaper.classList.remove('printing');
        existingPaper.classList.add('removing');
        
        setTimeout(() => {
            existingPaper.remove();
            // Play sound SETELAH foto lama keluar
            printSound.currentTime = 0;
            printSound.play().catch(e => console.log('Audio play failed:', e));
            createNewPaper();
        }, 2500); // Tunggu sampai animasi removeOut selesai
    } else {
        // Foto pertama langsung play sound
        printSound.currentTime = 0;
        printSound.play().catch(e => console.log('Audio play failed:', e));
        createNewPaper();
    }

    function createNewPaper() {
        // Create new paper
        const paper = document.createElement('div');
        paper.className = 'paper printing';
        
        const img = document.createElement('img');
        img.src = images[currentIndex];
        img.alt = `Invitation ${currentIndex + 1}`;
        
        paper.appendChild(img);
        outputArea.appendChild(paper);

        // Move to next image (loop back to 0 after image 5)
        currentIndex = (currentIndex + 1) % 5;

        setTimeout(() => {
            isPrinting = false;
            printBtn.disabled = false;
            printerLight.classList.remove('printing');
        }, 10000);
    }
});
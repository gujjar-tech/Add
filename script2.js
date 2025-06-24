// JavaScript for page2.html (Photo and Video Gallery)

document.addEventListener('DOMContentLoaded', () => {
    console.log('Page 2 (Photo & Video Gallery) loaded successfully!');

    // --- Header Back Arrow Functionality ---
    const backArrow = document.querySelector('.header-section .icon:first-child');
    if (backArrow) {
        backArrow.addEventListener('click', () => {
            window.history.back(); // Go back to the previous page (login page)
        });
    }

    // --- Image Zoom (Modal) Functionality ---
    const imageModal = document.getElementById('imageModal');
    const zoomedImage = document.getElementById('zoomedImage');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const galleryImages = document.querySelectorAll('.gallery-item img.zoomable-image'); // Select only zoomable images

    // --- Gemini API elements ---
    const generateCaptionBtn = document.getElementById('generateCaptionBtn');
    const captionDisplay = document.getElementById('captionDisplay');
    const captionLoading = document.getElementById('captionLoading');

    // Function to close the modal (reusable)
    function closeModal() {
        imageModal.classList.remove('show'); // Hide the modal
        document.body.style.overflow = 'auto'; // Re-enable scrolling on the main page
        captionDisplay.textContent = ''; // Clear caption when modal closes
        captionLoading.classList.add('hidden'); // Hide loading spinner
    }

    // Loop through all images and add click listener
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            zoomedImage.src = image.src; // Set the source of the zoomed image
            imageModal.classList.add('show'); // Show the modal
            document.body.style.overflow = 'hidden'; // Prevent scrolling on the main page
            captionDisplay.textContent = ''; // Clear previous caption when a new image is opened
            captionLoading.classList.add('hidden'); // Ensure spinner is hidden initially
        });
    });

    // Close the modal when the close button is clicked
    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });

    // Close the modal when clicking outside the image (on the overlay)
    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModal.classList.contains('show')) {
            closeModal();
        }
    });

    // --- Gemini API: Generate Caption Function ---
    generateCaptionBtn.addEventListener('click', async () => {
        captionDisplay.textContent = ''; // Clear previous caption
        captionLoading.classList.remove('hidden'); // Show loading spinner

        const currentImageSrc = zoomedImage.src;
        // Extract filename or ID from the src for the prompt
        // For picsum.photos, it's usually /id/NUMBER/width/height
        const idMatch = currentImageSrc.match(/\/id\/(\d+)\//);
        const imageIdentifier = idMatch ? `image ID ${idMatch[1]}` : 'a random photo';

        const promptText = `Generate a short, creative, and appealing caption (max 20 words) for an image. The image is an example placeholder from Picsum Photos, specifically described by its identifier: "${imageIdentifier}". Make the caption relevant to a generic photo.`;


        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: promptText }] });
            const payload = { contents: chatHistory };
            const apiKey = ""; // Canvas will provide this key at runtime

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Gemini API Error:', errorData);
                captionDisplay.textContent = 'Error generating caption. Please try again.';
                return;
            }

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                captionDisplay.textContent = text;
            } else {
                captionDisplay.textContent = 'Could not generate a caption.';
                console.warn('Gemini API response format unexpected:', result);
            }
        } catch (error) {
            console.error('Error fetching caption from Gemini API:', error);
            captionDisplay.textContent = 'Failed to connect to caption service.';
        } finally {
            captionLoading.classList.add('hidden'); // Hide loading spinner
        }
    });

    // --- Page Load Animations (Staggered Gallery Item Fade-in) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        // Apply the transition to make them animate from initial hidden state
        // The initial opacity: 0 and transform: translateY(20px) are now in style2.css
        // This setTimeout removes them after a stagger, allowing the CSS transition to play
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 80); // Slightly faster stagger delay for a snappier feel
    });
});

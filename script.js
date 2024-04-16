document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('imageUpload');
    const uploadedImagesContainer = document.getElementById('uploadedImages');

    let uploadedImages = [];
    let lastSelectedImage = null;

    // Função para selecionar uma imagem
    function selectImage(imgElement) {
        if (lastSelectedImage && lastSelectedImage !== imgElement) {
            swapImages(imgElement, lastSelectedImage);
            lastSelectedImage.classList.remove('selected');
            lastSelectedImage = null;
        } else if (!imgElement.classList.contains('selected')) {
            imgElement.classList.add('selected');
            lastSelectedImage = imgElement;
        } else {
            imgElement.classList.remove('selected');
            lastSelectedImage = null;
        }
    }

    // Função para trocar imagens
    function swapImages(img1, img2) {
        const index1 = uploadedImages.indexOf(img1);
        const index2 = uploadedImages.indexOf(img2);
        [uploadedImages[index1], uploadedImages[index2]] = [uploadedImages[index2], uploadedImages[index1]];
        uploadedImagesContainer.insertBefore(img2, img1);
        uploadedImagesContainer.insertBefore(img1, uploadedImages[index2 + 1] || null);
    }

    // Evento de mudança para adicionar imagens ao contêiner
    imageUpload.addEventListener('change', function(event) {
        uploadedImagesContainer.innerHTML = ''; // Limpar contêiner antes de adicionar novas imagens
        uploadedImages = [];
        Array.from(event.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.addEventListener('click', function() {
                    selectImage(imgElement);
                });
                uploadedImagesContainer.appendChild(imgElement);
                uploadedImages.push(imgElement);
            };
            reader.readAsDataURL(file);
        });
    });
});

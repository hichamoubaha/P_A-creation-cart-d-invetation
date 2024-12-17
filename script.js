document.addEventListener('DOMContentLoaded', () => {
    loadCard();
});

function addText() {
    const card = document.getElementById('card');
    const textElement = document.createElement('div');
    textElement.className = 'text-element';
    textElement.contentEditable = 'true';
    textElement.style.top = '50px';
    textElement.style.left = '50px';
    textElement.innerText = 'Double-cliquez pour éditer le texte';
    card.appendChild(textElement);
    addDeleteButton(textElement);
}

function addImage() {
    const card = document.getElementById('card');
    const imageElement = document.createElement('div');
    imageElement.className = 'image-element';
    imageElement.style.top = '50px';
    imageElement.style.left = '150px';
    
    // Add file input for image upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none'; // Hide the input element
    input.addEventListener('change', handleImageUpload);

    // Trigger file input click directly to open file explorer
    input.click();

    imageElement.appendChild(input);
    card.appendChild(imageElement);
    addDeleteButton(imageElement);

   
}

function changeBackgroundColor() {
    const card = document.getElementById('card');
    const bgColor = document.getElementById('bg-color').value;
    card.style.backgroundColor = bgColor;
}

function changeTextColor() {
    const textElements = document.querySelectorAll('.text-element');
    const textColor = document.getElementById('text-color').value;
    textElements.forEach(element => {
        element.style.color = textColor;
    });
}



function saveCard() {
    const card = document.getElementById('card').innerHTML;
    localStorage.setItem('savedCard', card);
    alert('Carte sauvegardée!');
}

function loadCard() {
    const savedCard = localStorage.getItem('savedCard');
    if (savedCard) {
        document.getElementById('card').innerHTML = savedCard;
        document.querySelectorAll('.text-element, .image-element').forEach(element => {
            addResizeHandle(element);
            addDeleteButton(element);
        });
    }
}

// Add a delete button to an element
function addDeleteButton(element) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = 'X';
    deleteBtn.style.display = 'none';

    // Show the delete button when the element is hovered
    element.addEventListener('mouseenter', () => {
        deleteBtn.style.display = 'block';
    });

    // Hide the delete button when the mouse leaves the element
    element.addEventListener('mouseleave', () => {
        deleteBtn.style.display = 'none';
    });

    deleteBtn.addEventListener('click', () => {
        element.remove();
    });

    element.appendChild(deleteBtn);
}

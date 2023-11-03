
document.addEventListener('DOMContentLoaded', function () {
    const todoListContainer = document.getElementById('todoListContainer');
    const todoList = document.getElementById('todoList');
    const todoListDropdown = document.querySelector('.nav-link.dropdown-toggle');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let isDropdownVisible = false;
    let selectedUncheckedCheckboxes = 0;

    todoListDropdown.addEventListener('click', () => {
        if (isDropdownVisible) {
            todoListContainer.style.display = 'none';
        } else {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);


                    todoList.innerHTML = '';
                    selectedUncheckedCheckboxes = 0; 


                    data.forEach(todo => {
                        const listItem = document.createElement('li');
                        listItem.classList.add('list-group-item');

                        const title = document.createElement('span');
                        title.textContent = todo.title;

                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';


                        if (todo.completed) {
                            checkbox.checked = true;
                        } else {
                            checkbox.addEventListener('change', () => {
                                if (checkbox.checked) {
                                    selectedUncheckedCheckboxes++;
                                    if (selectedUncheckedCheckboxes % 5 === 0) {

                                        congratulatePopup(selectedUncheckedCheckboxes);
                                    }
                                }
                            });
                        }

                        listItem.appendChild(title);
                        listItem.appendChild(checkbox);

                        todoList.appendChild(listItem);
                    });


                    todoListContainer.style.display = 'block';
                } else if (xhr.readyState === 4) {
                    console.error('Error fetching to-do list. Status code: ' + xhr.status);
                }
            };

            xhr.send();
        }


        isDropdownVisible = !isDropdownVisible;
    });
    function congratulatePopup(completedTasks) {
        // Create a container div for the popup
        const popupContainer = document.createElement('div');
        popupContainer.classList.add('popup');
    
        // Create an img element for the animated GIF
        const gifImage = document.createElement('img');
        gifImage.src = 'images\ 1rRk.gif'; // Set the image path to your gif file
        gifImage.alt = 'Congratulations GIF'; // Add a description for accessibility
        gifImage.style.display = 'block'; // Make sure the image is displayed
    
        // Create a paragraph element for the congratulations message
        const congratsMessage = document.createElement('p');
        congratsMessage.textContent = `Congratulations! You have completed ${completedTasks} tasks.`;
    
        // Append the GIF and message to the container
        popupContainer.appendChild(gifImage);
        popupContainer.appendChild(congratsMessage);
    
        // Append the popup container to the body
        document.body.appendChild(popupContainer);
    
        // Remove the popup after 5 seconds
        setTimeout(() => {
            document.body.removeChild(popupContainer);
        }, 5000);
    }
    
    
});

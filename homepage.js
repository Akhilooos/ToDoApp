
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

        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.textContent = `Congratulations! You have completed ${completedTasks} tasks.`;

        document.body.appendChild(popup);

        popup.style.display = 'block';

        setTimeout(() => {
            document.body.removeChild(popup);
        }, 5000); 


    }
});

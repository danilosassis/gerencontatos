document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const contactId = document.getElementById('contactId').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        if (contactId) {
            // Editar contato
            const index = contacts.findIndex(contact => contact.id === contactId);
            contacts[index] = { id: contactId, name, phone, email };
        } else {
            // Adicionar novo contato
            const id = Date.now().toString();
            contacts.push({ id, name, phone, email });
        }

        localStorage.setItem('contacts', JSON.stringify(contacts));
        displayContacts();
        contactForm.reset();
        document.getElementById('contactId').value = '';
    });

    function displayContacts() {
        contactList.innerHTML = '';
        contacts.forEach(contact => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${contact.name}</strong>
                    <span>${contact.phone}</span>
                    <span>${contact.email}</span>
                </div>
                <div>
                    <button class="edit" data-id="${contact.id}">Editar</button>
                    <button class="delete" data-id="${contact.id}">Excluir</button>
                </div>
            `;
            contactList.appendChild(li);
        });

        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', () => {
                const contact = contacts.find(contact => contact.id === button.dataset.id);
                document.getElementById('contactId').value = contact.id;
                document.getElementById('name').value = contact.name;
                document.getElementById('phone').value = contact.phone;
                document.getElementById('email').value = contact.email;
            });
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', () => {
                contacts = contacts.filter(contact => contact.id !== button.dataset.id);
                localStorage.setItem('contacts', JSON.stringify(contacts));
                displayContacts();
            });
        });
    }

    displayContacts();
});
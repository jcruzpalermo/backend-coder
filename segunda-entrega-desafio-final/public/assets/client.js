const socket = io('http://localhost:8080')


// FORMULARIO DE INGRESO DE PRODUCTOS
const productForm = document.getElementById('product-form')

productForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(productForm)
    const formValues = Object.fromEntries(formData)
    productForm.reset()
    socket.emit('new product', formValues)
    console.log('Products desde el formValues', formValues);
})


socket.on('all products', allProducts => {
    renderListProductsHB(allProducts)
})

// LISTADO DE PRODUCTOS REUTILIZANDO LA PLANILLA DE HANDLEBARS
const listProducts = document.getElementById('list-products')

const renderListProductsHB = async (products) => {
    const response = await fetch('./views/table-products.hbs')
    const formTemplate = await response.text()
    // compile the template
    const template = Handlebars.compile(formTemplate);
    const html = template({ products })
    listProducts.innerHTML = html
}


// FORMULARIO DE CHAT
const chatForm = document.getElementById('chat-form')

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(chatForm)
    const formValues = Object.fromEntries(formData)
    chatForm.reset()
    socket.emit('new message', formValues)
    console.log('chat desde el formValues', formValues);
})

socket.on('all messages', allMessages => {
    renderChatBoxHB(allMessages)
})


// LISTADO DE MENSAJES EN EL CHAT
const chatBox = document.getElementById('chat-messages')

const renderChatBoxHB = async (messages) => {
    const response = await fetch('./views/chat.hbs')
    const formTemplate = await response.text()
    // compile the template
    const template = Handlebars.compile(formTemplate);
    const html = template({ messages })
    chatBox.innerHTML = html
}
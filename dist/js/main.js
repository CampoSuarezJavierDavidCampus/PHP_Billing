import { NewProduct } from "./components/new-product.js";

customElements.define("new-product", NewProduct);


document.querySelector('#products_add').addEventListener('click',e=>{
    const newProduct = document.createElement('new-product');
    document.querySelector('#products_list').append(newProduct);
})


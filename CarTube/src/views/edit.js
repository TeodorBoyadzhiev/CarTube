import { html } from '../../node_modules/lit-html/lit-html.js';

import { getListingById, editListing } from '../api/data.js';

const editTemplate = (car, onSubmit) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>
`;



export async function editPage(ctx) {
    const carId = ctx.params.id;
    const car = await getListingById(carId);
    ctx.render(editTemplate(car, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const brand = formData.get('brand');
        const model = formData.get('model');
        const description = formData.get('description');
        const year = formData.get('year');
        const imageUrl = formData.get('imageUrl');
        const price = formData.get('price');

        if (price < 0 || year < 0) {
            return alert('Price and Year must be positive numbers!');
        }
        if (!brand || !model || !description || !year || !imageUrl || !price) {
            return alert('All fields are required!');
        }

        await editListing(carId, {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
        });
        event.target.reset();
        ctx.page.redirect('/details/' + carId);
    }
}
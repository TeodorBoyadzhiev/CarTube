import { html } from '../../node_modules/lit-html/lit-html.js';


import { getAllListings } from '../api/data.js';

const listingTemplate = (allLists) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">

        ${allLists.length == 0 ? html`<p class="no-cars">No cars in database.</p>` : allLists.map(listTemplate)}


    </div>
</section>
`;



const listTemplate = (list) => html`<div class="listing">
    <div class="preview">
        <img src=${list.imageUrl}>
    </div>
    <h2>${list.brand} ${list.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${list.year}</h3>
            <h3>Price:${list.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${list._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;


export async function catalogPage(context) {
    const allLists = await getAllListings();
    context.render(listingTemplate(allLists));
}
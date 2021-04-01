import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/api.js';



const registerTemplate = (onSubmit) => html`<section id="register">
    <div class="container">
        <form @submit=${onSubmit} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" >

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass">
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="#">Sign in</a>.
            </p>
        </div>
    </div>
</section>
`;

export async function registerPage(context) {
    context.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const username = formData.get('username');
        const password = formData.get('password');
        const repeatPass = formData.get('repeatPass');

        console.log(username,password,repeatPass)
        if (username == '' || password == '' || repeatPass == '') {
            return alert('All fields are required!');
        }

        if (password != repeatPass) {
            return alert('Password fields don\'t match!');
        }

        await register(username, password);

        context.userNav();
        context.page.redirect('/catalog');
    }
}
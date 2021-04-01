import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const register = api.register;
export const login = api.login;
export const logout = api.logout;


export async function getAllListings() {
    return await api.get(host + '/data/cars?sortBy=_createdOn%20desc');
}


export async function getListingById(id) {
    return await api.get(host + '/data/cars/' + id);
}


export async function createLisitng(listing) {
    return await api.post(host + '/data/cars',listing);
}


export async function editListing(id,listing) {
    return await api.put(host + '/data/cars/'+id,listing );
}


export async function deleteListing(id) {
    return await api.del(host + '/data/cars/'+id);
}


export async function getListings(userId) {
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
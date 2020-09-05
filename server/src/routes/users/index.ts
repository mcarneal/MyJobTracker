import functions from './functions'
import {
    Router,
} from 'express';
const RESOURCE = `users`
const ACCOUNT_PREFIX = `:accountId`
// const BASE_PATH = `/${ACCOUNT_PREFIX}/${RESOURCE}`


export = (api: Router) => {
    api.get(`/${RESOURCE}/`, functions.fetchAllUsers)
}

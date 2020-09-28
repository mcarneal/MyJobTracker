import functions from './functions'
import {
    Router,
} from 'express';
const RESOURCE = `master-data`

const passport = require("passport")

export = (api: Router) => {

    api.get(`/${RESOURCE}/navigation-items`,[
    ] ,functions.fetchAllNavigationBarItems)

    api.post(`/${RESOURCE}/navigation-items`,[
        //todo: plug middleware in here
    ] ,functions.createNavigationBarItem)

    api.patch(`/${RESOURCE}/navigation-items`,[
        //todo: plug middleware in here
    ] ,functions.updateNavigationBarItem)

    api.delete(`/${RESOURCE}/navigation-items`,[
        //todo: plug middleware in here
    ] ,functions.deleteNavigationBarItem)
}

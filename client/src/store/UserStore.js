import { makeAutoObservable } from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
        this._users = []
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }
    setUsers(data) {
        this._users = data
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}
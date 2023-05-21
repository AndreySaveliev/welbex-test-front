class Api {
  baseUrl: string
  constructor() {
    this.baseUrl = 'http://localhost:3000'
  }


  async login(email: string, password: string) {
    try {
      const res = await fetch(`${this.baseUrl}/signin`, { credentials: 'include', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      return res.json()
    } catch (err) {
      console.log(err)
    }
  }

  async register(email: string, name: string, password: string) {
    try {
      const res = await fetch(`${this.baseUrl}/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, name }) })
      return res
    } catch (err) {
      console.log(err)
    }
  }

  async getAllPosts() {
    try {
      const res = await fetch(`${this.baseUrl}/post`, { credentials: 'include' })
      return res.json()
    } catch (err) {
      console.log(err)
    }
  }

  async checkMe(token: string) {
    try {
      const res = await fetch(`${this.baseUrl}/user`, { credentials: 'include', headers: { 'Content-Type': 'application/json', 'Authorization': `Welbex ${token}` } })
      return res.json()
    } catch (err) {
      console.log(err)
    }
  }

  async createPost(formdata: FormData) {
    try {
      const res = await fetch(`${this.baseUrl}/post/`, {
        method: "POST",
        credentials: 'include',
        body: formdata
      })
      return res.json
    } catch (err) {
      console.log(err)
    }
  }

  async deletePost(id: string) {
    try {
      const res = await fetch(`${this.baseUrl}/post/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      return res.json()
    } catch (err) {
      console.log(err)
    }
  }

  async editPost(id : string, formdata: FormData) {
    try {
      const res = await fetch(`${this.baseUrl}/post/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formdata
      })
      return res.json()
    } catch (err) {
      console.log(err)
    }
  }
}

export const api = new Api()
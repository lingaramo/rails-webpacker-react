class apiV1 {
  constructor( baseURL ) {
    this.baseURL = baseURL
    this.baseHeader = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  buildAuthHeaders() {
    return { ...this.baseHeader, ...this.getAuthHeaders() }
  }

  getAuthHeaders() {
    return JSON.parse(localStorage.getItem("authHeaders"))
  }

  setAuthHeaders( headers ) {
    let authHeaders = ["access-token", "expiry", "token-type", "uid", "client"]
    // let prevAuth = this.getAuthHeaders()
    var auth = {}
    authHeaders.forEach( header => {
      auth[header] = headers.get(header)
    })
    localStorage.setItem( "authHeaders", JSON.stringify( auth ))
  }

  getInitObject() { return { 'headers': this.baseHeader } }

  getAuthInitObject() { return { 'headers': this.buildAuthHeaders() } }

  handleResponse( response ) {
    this.setAuthHeaders( response.headers )
    if ( response.ok ) { return response.json() }
    throw response
  }

  postInitObject( body ) {
    return {
      'method': 'POST',
      'headers': this.baseHeader,
      'body': JSON.stringify( body )
    }
  }

  postAuthInitObject( body ) {
    return {
      'method': 'POST',
      'headers': this.buildAuthHeaders(),
      'body': JSON.stringify( body )
    }
  }

  patchAuthInitObject( body ) {
    return {
      'method': 'PATCH',
      'headers': this.buildAuthHeaders(),
      'body': JSON.stringify( body )
    }
  }

  putAuthInitObject( body ) {
    return {
      'method': 'PUT',
      'headers': this.buildAuthHeaders(),
      'body': JSON.stringify( body )
    }
  }

  deleteAuthInitObject() {
    return {
      'method': 'DELETE',
      'headers': this.buildAuthHeaders(),
    }
  }

  signIn( body ) {
    return fetch(this.baseURL + "/sign_in",  this.postInitObject(body)).then( res => {
      return this.handleResponse( res )
    })
  }

  signUpUser( body ) {
    return fetch('/auth',
      this.postInitObject( body )
    ).then(response => {
      if (response.ok) { return response.json() }
      else { throw response }
    })
  }

  createUser( body ) {
    return fetch('/api/v1/user',
      this.postAuthInitObject( body )
    ).then( res => {
      return this.handleResponse( res )
    })
  }

  updateUser( userId, body ) {
    return fetch('/api/v1/user/' + userId,
      this.patchAuthInitObject( body )
    ).then( res => {
      return this.handleResponse( res )
    })
  }

  deleteUser( userId ) {
    return fetch('/api/v1/user/' + userId,
      this.deleteAuthInitObject()
    ).then( res => {
      return res
    })
  }

  signOut() {
    return fetch('/auth/sign_out', this.deleteAuthInitObject()).then( res => {
      if (res.ok) {
        this.setAuthHeaders( res.headers )
      }
      return res
    })
  }

  resetPassword( params, body ) {
    this.setAuthHeaders( params )
    return fetch('/auth/password', this.putAuthInitObject( body )).then( res => {
      if (res.ok) {
        this.setAuthHeaders(new Headers())
        return res.json()
      }
      throw res
    })
  }

  requestPasswordReset({ email }) {
    let body = { email: email, redirect_url: "http://localhost:3000/reset_password" }
    return fetch('/auth/password', {
      'method': 'POST',
      'headers': this.baseHeader,
      'body': JSON.stringify( body ),
    }).then(res => {
      if (res.ok) { return res.json() }
      throw res
    })
  }

  validateToken() {
    return fetch(this.baseURL + "/validate_token", this.getAuthInitObject())
      .then( res => {
        this.setAuthHeaders( res.headers )
        if ( res.ok ) { return res.json() }
        throw res
    })
  }

  getUsers( search = "", paginated_url = undefined ) {
    let url = '/api/v1/user'
    if (search != "") { url = url + `?search=${search}` }
    return fetch( paginated_url || url, this.getAuthInitObject()).then( res => {
      return this.handleResponse( res )
    })
  }

  getUser( user_id ) {
    return fetch( '/api/v1/user/' + user_id, this.getAuthInitObject()).then( res => {
      return this.handleResponse( res )
    })
  }
}

export default new apiV1('/auth')

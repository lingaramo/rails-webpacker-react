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

  signOut() {
    return fetch('/auth/sign_out', this.deleteAuthInitObject()).then( res => {
      if (res.ok) {
        this.setAuthHeaders( res.headers )
      }
      return res
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
}

export default new apiV1('/auth')

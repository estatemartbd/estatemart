export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    // For Spring Boot back-end
    // return { Authorization: "Bearer " + user.accessToken };

    // for Node.js Express back-end
    return { 'x-access-token': user.token, 'Connection': 'keep-alive' }
  } else {
    return {
      directions_id: '49ad8e0a-fca7-4b6b-928a-541a4575edfc'
    }
  }
}

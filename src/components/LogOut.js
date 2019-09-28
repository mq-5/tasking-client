const logOut = async (token, URL) => {
    const response = await fetch(`${URL}users/logout`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await response.json()
    console.log(data, 'STATUS')
    if (data.status.ok) {
        localStorage.removeItem('token')
        window.location.href = '/'
    } else {
        alert('Error: ', data.status.message)
    }
}

export default logOut
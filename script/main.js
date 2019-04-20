if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        const proxy = "https://cors-anywhere.herokuapp.com/"
        const api = `${proxy}https://api.darksky.net/forecast/38dce05f556df792b9f5e4f9c2ed958f/${lat},${long}`

        fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)

                const { temperature, summary, icon } = data.currently;
                let timezone = document.querySelector(".timezone")
                //let icon = document.querySelector(".icon") 
                let degree = document.querySelector(".degree")
                let description = document.querySelector(".description")

                degree.innerHTML = Math.floor((temperature - 32) * 5 / 9) + "&#176;C"
                timezone.innerHTML = data.timezone
                description.innerHTML = summary
                setIcons(icon, document.querySelector(".icon"))
            })
            .catch(err => {
                console.log(err)
            })
    })
}
function setIcons(icon, iconID) {
    var skycons = new Skycons({ color: "white" })
    const currentIcon = icon.replace(/-/g, "_").toUpperCase()
    skycons.play()

    return skycons.set(iconID, Skycons[currentIcon])
}

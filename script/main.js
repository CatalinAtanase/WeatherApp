const today = document.querySelector("#today")
const daily = document.querySelector("#daily")
const todaySection = document.querySelector("#today-section")
const dailySection = document.querySelector("#daily-section")

today.addEventListener("click", () => {
    todaySection.style.display = "flex"
    dailySection.style.display = "none"
})

daily.addEventListener("click", () => {
    todaySection.style.display = "none"
    dailySection.style.display = "flex"
})


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

                // Today
                let timezone = document.querySelectorAll(".timezone")
                let degree = document.querySelector(".degree")
                let description = document.querySelector(".description")

                degree.innerHTML = Math.floor((temperature - 32) * 5 / 9) + "&#176;C"
                timezone.forEach(timezone => {
                    timezone.innerHTML = data.timezone
                })
                description.innerHTML = summary

                setIcons(icon, document.querySelector(".icon"))

                // Daily
                let days = document.querySelectorAll(".day-name")
                let iconsDaily = document.querySelectorAll(".icon-daily")
                let temperatures = document.querySelectorAll(".temperature-daily")

                days.forEach((day, index) => {
                    let date = new Date(data.daily.data[index].time * 1000)
                    day.innerHTML = getDay(date.getDay())
                })

                iconsDaily.forEach((iconD, index) => {
                    let icon = data.daily.data[index].icon
                    setIcons(icon, document.querySelector(`.icon${index}`))
                })

                temperatures.forEach((temperature, index) => {
                    temperature.innerHTML = Math.floor((data.daily.data[index].temperatureMax - 32) * 5 / 9) + "&#176;C"
                })

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

function getDay(day) {
    switch (day) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        default:
            return "Saturday"
    }
}

# Tracert Domain Info 📶

- Type the domain name say "google.com" or "vit.ac.in" and get all the necessary details regarding that domain such as its IP address and geolocation.
- Get the information of various routers ip address along the way while sending packet to the domain.
- Link to that domain is also obtained once the information is processed

### Stack

- Vue.js ✌ ⇒ Frontend ✨
- Express.js ⇒ Backend 💻
- nodejs-traceroute ⇒ for routing 🚦
- api.ipstack ⇒ API for obtaining details of domain 📡

### Features

- Domain
  - IP address
  - Continent
  - Country and Region
  - Latitude and Longitude
- Routers
  - RTT1
  - RTT2
  - RTT3
  - IP address

### Instructions 📚

- Open the terminal and type the following commands

```jsx
npm install
```

```jsx
npm run server
```

```jsx
npm run serve
```

- For the API key go to [IP Stack](https://ipstack.com/) and register and replace it in process.env.API_KEY in the index.js folder

- Server ⇒ [http://localhost:3000/](http://localhost:3000/)
- Web Page ⇒ [http://localhost:8080/](http://localhost:8080/)

### Screenshots 📷

![Web Page](./src/assets/web%20page.png)

- On clicking "Link to the URL"

![Link to the URL](./src/assets/url%20link.png)

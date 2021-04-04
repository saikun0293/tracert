<template>
  <img class="bg" src="./assets/cloud-bg.jpg" alt="bg" />
  <div class="container">
    <div class="main-title">Tracert Browser</div>
    <form @submit.prevent="onSubmit" class="input-form">
      <input v-model="URL" type="text" name="url" id="url" autocomplete="off" />
      <button id="submit" type="submit">
        {{ submitButtonContent }}
      </button>
    </form>
    <div class="info-container">
      <div class="title">Domain Details</div>
      <div class="destination-details">
        <div v-for="(value, name) in domainDetails" :key="name" class="row">
          <div class="key">{{ humanize(name) }}</div>
          <div class="value">{{ value }}</div>
        </div>
      </div>
      <div class="title">Routing</div>
      <div class="routing">
        <table>
          <tr>
            <th>Hop</th>
            <th>RTT1</th>
            <th>RTT2</th>
            <th>RTT3</th>
            <th>IP Address</th>
          </tr>
          <tr v-for="(route, index) in routing" :key="index" class="table-row">
            <td v-for="(value, name) in route" :key="name" class="col">
              {{ value }}
            </td>
          </tr>
        </table>
      </div>
      <div class="link-container">
        <a :href="ipLink" id="link">Link to the URL</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const ServerURL = "http://localhost:3000/";

export default {
  name: "App",
  methods: {
    humanize(str) {
      var i,
        frags = str.split("_");
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(" ");
    },
    async onSubmit() {
      this.submitButtonContent = "Loading..";
      const domainResult = await axios.post(ServerURL + "domain", {
        url: this.URL,
      });
      console.log(domainResult);

      delete domainResult.data.location;
      this.domainDetails = domainResult.data;

      this.submitButtonContent = "Getting routers info..";

      const routeResult = await axios.post(ServerURL + "route", {
        url: this.URL,
      });

      let r = routeResult.data.hop;
      r = r.map((route) => JSON.parse(route));

      this.routing = r;
      console.log(r);

      this.ipLink = "http://" + routeResult.data.destination;

      //Cleaning
      this.submitButtonContent = "Submit URL";
      this.URL = "";
    },
  },
  data() {
    return {
      submitButtonContent: "Submit URL",
      URL: "",
      domainDetails: {},
      routing: [],
      ipLink: "#",
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;700&display=swap");

.container {
  font-family: "Montserrat";
}

.main-title {
  font-family: Montserrat;
  font-size: 40px;
  font-weight: 700;
  color: darkturquoise;
  text-align: center;
  text-decoration-line: overline;
}

.input-form {
  width: 700px;
  margin: 30px auto;
  text-align: center;
}

#url {
  padding: 10px 15px;
  width: 400px;
  border: none;
  outline: none;
  border-radius: 20px;
  font-family: "Montserrat";
}

#submit,
#link {
  border: none;
  padding: 15px 15px;
  background: darkturquoise;
  color: white;
  font-size: 15px;
  letter-spacing: 2px;
  font-weight: 700;
  font-family: "Montserrat";
  border-radius: 10px;
  box-sizing: border-box;
  outline: none;
  margin-left: 10px;
}

#submit:hover {
  background-color: white;
  cursor: pointer;
  color: darkturquoise;
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translate(0, 12px);
  z-index: -1;
}

.destination-details,
.routing {
  width: 50%;
  height: 40%;
  background: rgba(0, 0, 0, 0.05);
  margin: 10px 0;
  border-radius: 10px;
  width: 100%;
  overflow: scroll;
}

.info-container {
  width: 60%;
  margin: 0 auto;
  backdrop-filter: blur(15px);
  height: 73vh;
  border-radius: 20px;
  padding: 2rem;
  box-sizing: border-box;
  border: 1px solid white;
}

.title {
  font-size: 25px;
  font-weight: 700;
}

.destination-details::-webkit-scrollbar,
.routing::-webkit-scrollbar {
  display: none;
}

.link-container {
  text-align: center;
  padding: 15px;
}

table {
  width: 100%;
  border: 1px solid black;
  border-radius: 20px;
}

td {
  border: 1px solid grey;
  border-radius: 5px;
  text-align: center;
  padding: 5px;
}

.row {
  display: flex;
  padding: 20px;
}

.key {
  width: 40%;
}

table {
  padding: 20px;
}
</style>

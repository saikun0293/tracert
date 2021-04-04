//for frontend reactivity

const URL = "http://localhost:3000/";

function humanize(str) {
  var i,
    frags = str.split("_");
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(" ");
}

//add event listeners
const submit = document.getElementById("submit");
const url = document.getElementById("url");
let domainDetails = document.getElementById("destination-details");
let routing = document.getElementById("routing");

submit.addEventListener("click", onSubmit);

function updateUI(result) {
  const domain = result.domainDetails;
  const tracert = result.traceRoute;

  let template = "";
  for (let key of Object.keys(domain)) {
    const k = humanize(key);
    const value = domain[key];
    template += `<div class="row">
        <div class="key">${k}</div>
        <div class="value">${value}</div>
    </div>`;
  }
  domainDetails.innerHTML = template;
}

async function onSubmit(event) {
  event.preventDefault();
  const urlValue = url.value;

  try {
    const result = await axios.post(URL, { url: urlValue });
    console.log(result);
    updateUI(result);
  } catch (error) {
    console.log(error);
  }
}

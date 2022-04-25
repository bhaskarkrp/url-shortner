async function openUrl(url) {
  let data = await fetch(`http://localhost:9000/post/${url}`);
  const thatUrl = await data.json();

  //   console.log(thatUrl.originalUrl);
  return thatUrl.originalUrl;
}

async function getUrls() {
  let datas = await fetch(`http://localhost:9000/post/`);

  let urls = await datas.json();

  //   console.log(urls);

  return urls;
}

function postUrl(input) {
  console.log({ originalUrl: input });
  fetch("http://localhost:9000/post/", {
    method: "POST",
    body: JSON.stringify({ originalUrl: input }),
    headers: {
      contentType: "application/json",
    },
  });
}

document
  .querySelector(".form-control")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    let input = document.querySelector(".url-input").value;
    console.log(input);
    //   postUrl(input);
    let postedData = await fetch("http://localhost:9000/post/", {
      method: "POST",
      body: JSON.stringify({ originalUrl: input }),
      headers: {
        "Content-type": "application/json; charset=UTF-8", //whole line is important
      },
    });

    location.reload();
  });

//async await fetch works this way
getUrls().then((res) => {
  //   console.log(res);
  res.map((url) => appendData(url));
});

const table_body = document.querySelector(".table_body");

function appendData(data) {
  let tr = document.createElement("tr");

  let td1 = document.createElement("td");
  td1.innerText = data.originalUrl;
  let td2 = document.createElement("td");
  let anchor = document.createElement("p");
  anchor.style.cursor = "pointer";
  anchor.onclick = function () {
    // console.log(`Clicked ${data.originalUrl}`);

    //async await fetch works this way
    openUrl(data.shortUrl).then((url) => {
      //   console.log(url);
      window.open(url, "_blank"); //to Open a link in new tab
      location.reload();
    });
  };
  anchor.innerText = `www.${data.shortUrl}.bhaskar`;
  anchor.target = "_blank";
  td2.append(anchor);
  let td3 = document.createElement("td");
  td3.innerText = data.counts;
  let td4 = document.createElement("td");
  let button = document.createElement("button");
  button.innerText = "Delete";
  button.style.backgroundColor = "red";
  button.style.color = "white";

  button.onclick = async () => {
    console.log(`clicked ${data.shortUrl}`);
    let deletedData = await fetch(
      `http://localhost:9000/post/${data.shortUrl}`,
      {
        method: "DELETE",
      }
    );

    location.reload();
  };
  td4.append(button);

  tr.append(td1, td2, td3, td4);

  table_body.append(tr);
}

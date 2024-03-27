var idnum = 1000;
const All = () => {
  idnum = 1000;
  fetch("https://openapi.programming-hero.com/api/videos/category/1000")
    .then((res) => res.json())
    .then((data) => displayAll(data.data));
};

All();

const Music = () => {
  idnum = 1001;
  fetch("https://openapi.programming-hero.com/api/videos/category/1001")
    .then((res) => res.json())
    .then((data) => displayAll(data.data));
};

const Comedy = () => {
  idnum = 1003;
  fetch("https://openapi.programming-hero.com/api/videos/category/1003")
    .then((res) => res.json())
    .then((data) => displayAll(data.data));
};

const Drawing = () => {
  idnum = 1005;
  fetch("https://openapi.programming-hero.com/api/videos/category/1005")
    .then((res) => res.json())
    .then((data) => displayAll(data.data));
};

const sortbyview = () => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${idnum}`)
    .then((res) => res.json())
    .then((data) => {
      const sortdata = data.data.sort((a, b) => {
        const viewsA = parseFloat(a.others.views);
        const viewsB = parseFloat(b.others.views);
        return viewsB - viewsA;
      });
      displayAll(sortdata);
    });
};


const displayAll = (data) => {
  console.log(data);
  console.log(data.length);

  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (data.length == 0) {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="text-center">
      <img src="image/Icon.png" alt="">
      <h3><b>Oops!! Sorry, There is no <br>Content here</b></h3>
    </div>
    `;
    videoContainer.appendChild(card);
  } else {
    data.forEach((video) => {
      const card = document.createElement("div");
      card.classList.add("col-xl-3");
      const posteddate = calculatetime(video.others.posted_date);
      card.innerHTML = `
      <div class="card m-auto border-0">
          <img src="${video?.thumbnail}" class="card-img-top" alt="">
          ${posteddate ? `<p class="duration text-center">${posteddate}</p>` : ""}
        
          <div class="card-body">
            <div class="d-flex">
                <img src="${video.authors[0].profile_picture}" alt="" style="border-radius: 90%; width: 10%; height: 50px;">
                <div class="m-auto text-left">
                    <h5 style="font-weight: bold; font-size: 25px;">${video.title}</h5>
                    <div class="text-left  d-flex">
                        <p class="text-center pe-2 ">${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified ? '<img style="width: 15px; height: 15px; display: inline;" src="image/verify.png" alt="">': ""}
                    </div>   
                    <p>${video.others.views} views</p> 
                </div>
            </div>
          </div>
      </div>
    `;
      videoContainer.appendChild(card);
    });
  }
};

const calculatetime = (seconds) => {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  return hour > 0 ? `${hour} hours ${minute} minutes ago` : "";
};

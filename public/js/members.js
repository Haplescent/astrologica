$(document).ready(function () {
  // mobile responive nav for materialize
  $(".sidenav").sidenav();
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    // personal greeting
    const name = data.firstname;

    $(".nav-wrapper").append(
      ` <a href="" id="brand-logo">Welcome ${name}!</a>`
    );

    // formatting birthday


    const birthday = data.birthday;
    const birthdayFormatted = moment(birthday).add(1, "days");
    const bdayMonth = moment(birthdayFormatted).format("MM");
    const bdayDay = moment(birthdayFormatted).format("DD");
    const bdayYear = moment(birthdayFormatted).format("YYYY");

    // console.log(bdayMonth);
    // console.log(bdayDay);
    // console.log(bdayYear);

    // zodiac function
    function zodiac(day, month) {
      const zodiac = [
        "",
        "Capricorn",
        "Aquarius",
        "Pisces",
        "Aries",
        "Taurus",
        "Gemini",
        "Cancer",
        "Leo",
        "Virgo",
        "Libra",
        "Scorpio",
        "Sagittarius",
        "Capricorn",
      ];
      const lastDay = ["", 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
      return day > lastDay[month] ? zodiac[month * 1 + 1] : zodiac[month];
    }
    const sign = zodiac(parseInt(bdayDay), parseInt(bdayMonth));
    const signLowerCase = sign.toLowerCase();

    // console.log(signLowerCase);

    // API call

    $.ajax({
      url: "/horoscope",
      method: "GET",
      dataType: "json",
      data: {
        sign: signLowerCase
      },
    }).then((res) => {

      jsonString = JSON.stringify(res);
      jsonObject = JSON.parse(jsonString);
      // ascendant;
      // report;
      $("#horoscope").append(`
              <div class="card">
                <div class="front-card">
                  <div class="horoscope">
                    <img src="./images/${signLowerCase}.png">
                  </div>
                  <div class="bar">
                    <h4>${sign}</h4>
                  </div>
                </div>
                <div class="back-card white-text">
                <h5>Daily Horoscope</h5>
                <p>${jsonObject.horoscope}</p>
                </div>
              </div>
            `);
    });


  });

  $.get(`/api/profilepic`).then((res) => {
    // console.log(res);
    // console.log(res.image);

    if (res.image) {
      $("#dashboardprofile").append(`
        <a  href="/profile">
          <img src="../uploads/${res.image}" 
            style=" vertical-align: middle;
            width: 50px;
            height: 50px;
            border-radius: 50%;" 
            alt="Avatar" 
            class="avatar">
      </a>`);
    } else {
      $("#dashboardprofile").append(`
        <a  href="/profile">
        <img
        src="./images/Profile.png"
        style="
          vertical-align: middle;
          width: 70px;
          height: 50px;
          border-radius: 50%;
        "
        alt="Avatar"
        class="avatar"
    />
      </a>`);
    }
  });
});

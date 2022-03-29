import throttle from 'lodash.throttle';
//Инициализируй плеер в файле скрипта как это описано в секции pre-existing player
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
//Разбери документацию метода on() и начни отслеживать событие timeupdate

let timeupdate = 0;

const onPlay = function (data) {
  //console.log(data);
  timeupdate = data.seconds;
  localStorage.setItem('videoplayer-current-time', JSON.stringify({ timeupdate }));
};
player.on('timeupdate', throttle(onPlay, 1000));

//Time setup
let timeFromStorage;

//checking localstorage for null and if not - getting data from localstorage
function checkForLocalstorageData() {
  if (localStorage.getItem('videoplayer-current-time') === null) {
    localStorage.setItem('videoplayer-current-time', JSON.stringify({ timeupdate: '0' }));
  }

  timeFromStorage = localStorage.getItem('videoplayer-current-time');
}
checkForLocalstorageData();

//parse data from localstorage and put it to the player method
const parsedData = JSON.parse(timeFromStorage);

player
  .setCurrentTime(parsedData.timeupdate)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

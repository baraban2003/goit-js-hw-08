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
const timeFromStorage = localStorage.getItem('videoplayer-current-time');

//checking localstorage for null and if not - getting data from localstorage
function checkForLocalstorageData() {
  if (timeFromStorage) {
    const parsedData = JSON.parse(timeFromStorage);
    player.setCurrentTime(parsedData.timeupdate);
  }
}
checkForLocalstorageData();

//parse data from localstorage and put it to the player method

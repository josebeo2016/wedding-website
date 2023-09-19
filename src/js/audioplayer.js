document.addEventListener("DOMContentLoaded", function() {
    var audio = new Audio(); // Create a new audio object
    audio.volume = 0.9; // Set the volume to 90%

    var playlist = ["musics/beautifulinwhite.mp3",
    "musics/honcayeu.mp3",
    "musics/ido.mp3",
    "musics/ngaydautien.mp3",
    "musics/onlylove.mp3",
    "musics/perfect.mp3",
    "musics/takemetoyourheart.mp3",
    "musics/youarethereason.mp3"]; // Song file names in your playlist
    var playStopBtn = document.getElementById("play-stop-btn");
    var isPlaying = false;

    function togglePlay() {
      if (isPlaying) {
        stopSong();
        playStopBtn.innerHTML = '<i class="fa fa-play"></i>';
      } else {
        playSong();
        playStopBtn.innerHTML = '<i class="fa fa-stop"></i>';
      }
    }
  
    function playSong() {
      var randomIndex = Math.floor(Math.random() * playlist.length); // Get a random index from the playlist
      var song = playlist[randomIndex]; // Get the random song from the playlist array
  
      audio.src = song; // Set the audio source to the selected song
      audio.load(); // Load the audio
  
      audio.addEventListener("ended", playNextSong); // Event listener for when the current song ends
  
      audio.play(); // Start playing the audio
      isPlaying = true;
    }
  
    function stopSong() {
      audio.pause(); // Pause the audio
      audio.currentTime = 0; // Reset the audio to the beginning
      audio.removeEventListener("ended", playNextSong); // Remove the event listener
      isPlaying = false;
    }
  
    function playNextSong() {
      stopSong();
      playSong();
    }
  
    playStopBtn.addEventListener("click", togglePlay);
    // asynchronize the play/pause button with the audio state

    // togglePlay();
  });
  
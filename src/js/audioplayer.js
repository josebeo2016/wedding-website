document.addEventListener("DOMContentLoaded", function() {
    var audio = new Audio(); // Create a new audio object
    audio.volume = 0.9; // Set the volume to 90%

    var playlist = [
    "musics/beautifulinwhite.mp3",
    "musics/honcayeu.mp3",
    "musics/ido.mp3",
    "musics/ngaydautien.mp3",
    "musics/onlylove.mp3",
    "musics/perfect.mp3",
    "musics/takemetoyourheart.mp3",
    "musics/marryyou.wav",
    "musics/youarethereason.mp3"]; // Song file names in your playlist

    // shuffle playlist
    for (let i = playlist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = playlist[i];
      playlist[i] = playlist[j];
      playlist[j] = temp;
    }
    current_song_index = 0;

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
      console.log("Playing song ", current_song_index, ": ", playlist[current_song_index]);
      var song = playlist[current_song_index]; // Get the current song based on the index
      current_song_index = (current_song_index + 1) % playlist.length; // Increment the index

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
    
    togglePlay();
  });
  
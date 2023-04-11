/**
 * サウンドの再生UIを初期化します。
 * @param onClickFirstPlay {() => void}
 * @return {{audioElement: HTMLAudioElement}}
 */
export function useUi(onClickFirstPlay) {
  // 状態管理
  let isInited = false; // 初期化済か
  let isUserPlaying = false; // ユーザーが音量ON/OFFのどちらを選択したか

  const audioElement = document.querySelector("#audio");

  // -------------------------------------
  // 画面のUI処理
  // -------------------------------------
  const btnPlay = document.querySelector("#btnPlay");
  btnPlay.addEventListener("click", () => {
    // ユーザーの意思をもって再生したことを記録
    isUserPlaying = true;

    playSound();

    if (isInited === false) {
      onClickFirstPlay();
    }

    isInited = true;
  });

  const btnStop = document.querySelector("#btnStop");
  btnStop.addEventListener("click", () => {
    // ユーザーの意思をもって停止したことを記録
    isUserPlaying = false;

    stopSound();
  });

  // タブの切り替えでサウンドのON/OFFを切りかえる
  document.addEventListener("visibilitychange", () => {
    // 初期化前であればなにもしない
    if (isInited === false) {
      return;
    }
    if (document.visibilityState === "visible") {
      // ユーザーの意思を確認
      if (isUserPlaying === true) {
        playSound();
      }
    } else {
      stopSound();
    }
  });

  function playSound() {
    audioElement.play();
    btnPlay.hidden = true;
    btnStop.hidden = false;
  }
  function stopSound() {
    audioElement.pause();
    btnPlay.hidden = false;
    btnStop.hidden = true;
  }

  return { audioElement };
}

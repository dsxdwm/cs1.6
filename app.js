// BURAYA FIREBASE BİLGİLERİNİ GİR
const firebaseConfig = {
     apiKey: "AIzaSyDAwEi__I8RrMfeIfPGzXMMsAKMi9PMZK0",
    databaseURL: "https://dsxdwm-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dsxdwm",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Durum Güncelleme ve Dinleme
const statusDisplay = document.getElementById('my-status');
const adminDisplay = document.getElementById('admin-status-view');

database.ref('globalStatus').on('value', (snapshot) => {
    const val = snapshot.val() || "BAĞLANTI KURULUYOR...";
    const upperVal = val.toUpperCase();

    [statusDisplay, adminDisplay].forEach(el => {
        if(el) {
            el.innerText = "● " + upperVal;
            // Eğer "OFFLINE" kelimesi geçiyorsa kırmızı yap
            if(upperVal.includes("OFFLINE")) {
                el.className = "status-offline";
            } else {
                el.className = "status-active";
            }
        }
    });
});

function updateStatus(newVal) {
    if (newVal) {
        database.ref('globalStatus').set(newVal.toUpperCase())
        .catch(err => alert("Hata: " + err.message));
    }
}

function checkAuth() {
    if (document.getElementById('admin-pass').value === "1.6pro") {
        document.getElementById('auth-box').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
    } else { alert("ERİŞİM ENGELLENDİ!"); }
}

function initSystem() {
    const snd = document.getElementById('headshot-sound');
    if(snd) {
        snd.volume = 1.0;
        snd.play().catch(e => console.log("Ses çalma hatası:", e));
    }
    document.getElementById('enter-screen').style.opacity = '0';
    setTimeout(() => { document.getElementById('enter-screen').style.display = 'none'; }, 800);
}
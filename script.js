// Dil veritabanı
const translations = {
    tr: {
        title: "Randevu Sistemi",
        subtitle: "Bilgilerinizi girerek hızlıca randevu oluşturun.",
        labelName: "Ad Soyad",
        labelService: "Hizmet",
        labelDate: "Tarih",
        labelTime: "Saat",
        selectDefault: "Seçiniz...",
        service1: "Yazılım Danışmanlığı",
        service2: "Tasarım İncelemesi",
        service3: "Proje Planlama",
        btnSubmit: "Randevu Oluştur",
        activeAppointments: "Aktif Randevular",
        noAppointments: "Henüz kayıtlı randevu yok.",
        deleteBtn: "Randevuyu Sil",
        placeholderName: "Örn: Ahmet Yılmaz"
    },
    en: {
        title: "Appointment System",
        subtitle: "Create an appointment quickly by entering your details.",
        labelName: "Full Name",
        labelService: "Service",
        labelDate: "Date",
        labelTime: "Time",
        selectDefault: "Select...",
        service1: "Software Consulting",
        service2: "Design Review",
        service3: "Project Planning",
        btnSubmit: "Create Appointment",
        activeAppointments: "Active Appointments",
        noAppointments: "No appointments registered yet.",
        deleteBtn: "Delete Appointment",
        placeholderName: "e.g. John Doe"
    }
};

// Uygulama Durumu
let currentLang = localStorage.getItem('lang') || 'tr';
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');
    const container = document.getElementById('appointments-container');

    // Dili Uygula
    window.setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = translations[lang][key];
        });

        document.getElementById('name').placeholder = translations[lang].placeholderName;
        renderAppointments();
    };

    // Randevuları Ekrana Bas
    const renderAppointments = () => {
        container.innerHTML = '';
        
        if (appointments.length === 0) {
            container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b;">${translations[currentLang].noAppointments}</p>`;
            return;
        }

        appointments.forEach((app, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${app.name}</h3>
                <p><strong>${translations[currentLang].labelService}:</strong> ${app.service}</p>
                <p><strong>${translations[currentLang].labelDate}:</strong> ${app.date}</p>
                <p><strong>${translations[currentLang].labelTime}:</strong> ${app.time}</p>
                <div class="delete-btn" onclick="deleteAppointment(${index})">${translations[currentLang].deleteBtn}</div>
            `;
            container.appendChild(card);
        });
    };

    // Yeni Randevu Kaydet
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newApp = {
            name: document.getElementById('name').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        };

        appointments.push(newApp);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        form.reset();
        renderAppointments();
    });

    // Randevu Sil
    window.deleteAppointment = (index) => {
        appointments.splice(index, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        renderAppointments();
    };

    // İlk açılışta dili ve listeyi yükle
    setLanguage(currentLang);
});
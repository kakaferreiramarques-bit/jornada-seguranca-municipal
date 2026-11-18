/*
 * Ilustrações da Jornada de Segurança da Informação
 * - SVGs embutidos (sem arquivos de imagem externos)
 * - Não altera a lógica do app.js: observa o #app e acrescenta as imagens
 *   sempre que uma tela é desenhada.
 */
(function () {
    "use strict";

    var C = {
        primary: "#174a7e",
        dark: "#0e3155",
        secondary: "#2f7d9c",
        soft: "#E3EEF8",
        line: "#B8D4EE",
        amber: "#F59E0B",
        success: "#237a57",
        danger: "#a33a3a"
    };

    /* ---------- Estilos ---------- */
    var css = "\
.art{display:block;line-height:0}\
.art svg{display:block}\
.mission-card{overflow:hidden}\
.art-banner{margin:-22px -22px 16px;background:" + C.soft + ";display:flex;justify-content:center;padding:8px 0}\
.art-banner svg,.art-hero svg{height:128px;width:auto}\
.art-hero{display:flex;justify-content:center;margin:0 0 14px}\
.art-badge{width:150px;flex:none;background:" + C.soft + ";border-radius:14px;padding:4px}\
.art-badge svg{width:100%;height:auto}\
.mission-head > div:not(.art){flex:1}\
.art-icon{width:48px;height:48px;margin:0 auto 10px}\
.art-icon svg{width:100%;height:100%}\
.feedback.has-art{display:grid;grid-template-columns:52px 1fr;gap:14px;align-items:start}\
.fb-icon{width:52px;height:52px}\
.fb-icon svg{width:100%;height:100%}\
@keyframes artPop{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:none}}\
@keyframes artFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}\
.fb-icon{animation:artPop .3s ease both}\
.art .float{animation:artFloat 3.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}\
@media (max-width:760px){.art-badge{width:120px}}\
@media (prefers-reduced-motion:reduce){.fb-icon,.art .float{animation:none}}";

    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    /* ---------- Ilustrações ---------- */
    function svg(vb, inner) {
        return '<svg viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' + inner + "</svg>";
    }

    var ART = {};

    // Missão 1: campo de senha + cadeado
    ART.senhas = svg("0 0 240 140",
        '<circle cx="196" cy="30" r="34" fill="#fff" opacity=".55"/>' +
        '<rect x="22" y="28" width="132" height="34" rx="9" fill="#fff" stroke="' + C.line + '" stroke-width="2"/>' +
        [42, 58, 74, 90, 106].map(function (x) { return '<circle cx="' + x + '" cy="45" r="4.5" fill="' + C.primary + '"/>'; }).join("") +
        '<rect x="22" y="78" width="132" height="34" rx="9" fill="#fff" stroke="' + C.line + '" stroke-width="2"/>' +
        [42, 58, 74].map(function (x) { return '<circle cx="' + x + '" cy="95" r="4.5" fill="' + C.secondary + '"/>'; }).join("") +
        '<g class="float">' +
        '<path d="M172 66V54a18 18 0 0 1 36 0v12" fill="none" stroke="' + C.primary + '" stroke-width="8" stroke-linecap="round"/>' +
        '<rect x="164" y="64" width="52" height="44" rx="9" fill="' + C.amber + '"/>' +
        '<circle cx="190" cy="82" r="5.5" fill="' + C.dark + '"/>' +
        '<path d="M190 86v10" stroke="' + C.dark + '" stroke-width="4" stroke-linecap="round"/>' +
        "</g>" +
        '<circle cx="138" cy="112" r="13" fill="' + C.success + '"/>' +
        '<path d="m131.500 112 4.500 4.500 8-9" fill="none" stroke="#fff" stroke-width="3.500" stroke-linecap="round" stroke-linejoin="round"/>'
    );

    // Missão 2: e-mail fisgado por um anzol + alerta
    ART.phishing = svg("0 0 240 140",
        '<circle cx="48" cy="104" r="32" fill="#fff" opacity=".55"/>' +
        '<g class="float">' +
        '<path d="M96 6v62a13 13 0 0 1-26 0" fill="none" stroke="' + C.dark + '" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="m70 68-6-7" stroke="' + C.dark + '" stroke-width="5" stroke-linecap="round"/>' +
        "</g>" +
        '<rect x="88" y="62" width="100" height="64" rx="9" fill="#fff" stroke="' + C.primary + '" stroke-width="3.500"/>' +
        '<path d="m92 70 46 32 46-32" fill="none" stroke="' + C.secondary + '" stroke-width="3.500" stroke-linejoin="round"/>' +
        '<path d="M200 28 224 72H176Z" fill="' + C.amber + '" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>' +
        '<rect x="198" y="42" width="4" height="15" rx="2" fill="' + C.dark + '"/>' +
        '<circle cx="200" cy="64" r="2.800" fill="' + C.dark + '"/>'
    );

    // Autoverificação inicial: lista de verificação
    ART.diagnostico = svg("0 0 240 140",
        '<circle cx="120" cy="70" r="62" fill="' + C.soft + '"/>' +
        '<rect x="82" y="22" width="76" height="106" rx="9" fill="#fff" stroke="' + C.primary + '" stroke-width="3.500"/>' +
        '<rect x="104" y="14" width="32" height="16" rx="6" fill="' + C.primary + '"/>' +
        [48, 72, 96].map(function (y, i) {
            return '<circle cx="100" cy="' + y + '" r="8" fill="' + (i < 2 ? C.success : C.line) + '"/>' +
                (i < 2 ? '<path d="m96 ' + y + ' 3 3 5-6" fill="none" stroke="#fff" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"/>' : "") +
                '<rect x="114" y="' + (y - 3) + '" width="32" height="6" rx="3" fill="' + C.line + '"/>';
        }).join("")
    );

    // Resultado / missão concluída: troféu
    ART.trofeu = svg("0 0 240 140",
        '<circle cx="120" cy="68" r="60" fill="' + C.soft + '"/>' +
        '<path d="M92 36H76a14 14 0 0 0 14 26M148 36h16a14 14 0 0 1-14 26" fill="none" stroke="' + C.amber + '" stroke-width="6" stroke-linecap="round"/>' +
        '<g class="float">' +
        '<path d="M92 28h56v32a28 28 0 0 1-56 0Z" fill="' + C.amber + '"/>' +
        '<path d="m120 38 4.500 9.500 10 1.200-7.500 7 2 10-9-5-9 5 2-10-7.500-7 10-1.200Z" fill="#fff"/>' +
        "</g>" +
        '<rect x="114" y="90" width="12" height="18" fill="' + C.amber + '"/>' +
        '<rect x="96" y="106" width="48" height="12" rx="5" fill="' + C.primary + '"/>' +
        '<circle cx="62" cy="42" r="4" fill="' + C.secondary + '"/><circle cx="180" cy="30" r="5" fill="' + C.amber + '"/><circle cx="188" cy="86" r="3.500" fill="' + C.secondary + '"/>'
    );

    // Ícones pequenos da tela inicial (3 cartões)
    ART.info = [
        svg("0 0 48 48",
            '<circle cx="24" cy="24" r="23" fill="' + C.soft + '"/>' +
            '<circle cx="22" cy="22" r="9" fill="none" stroke="' + C.primary + '" stroke-width="4"/>' +
            '<path d="m29 29 8 8" stroke="' + C.primary + '" stroke-width="4.500" stroke-linecap="round"/>' +
            '<path d="m18 22 3 3 5-6" fill="none" stroke="' + C.success + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'),
        svg("0 0 48 48",
            '<circle cx="24" cy="24" r="23" fill="' + C.soft + '"/>' +
            '<path d="M27 7 14 26h9l-2 15 13-20h-9Z" fill="' + C.amber + '" stroke="' + C.amber + '" stroke-width="1.500" stroke-linejoin="round"/>'),
        svg("0 0 48 48",
            '<circle cx="24" cy="24" r="23" fill="' + C.soft + '"/>' +
            '<path d="M13 36c0-10 22-6 22-18" fill="none" stroke="' + C.secondary + '" stroke-width="3" stroke-dasharray="4 4" stroke-linecap="round"/>' +
            '<circle cx="13" cy="36" r="4.500" fill="' + C.primary + '"/>' +
            '<path d="M35 8a7 7 0 0 0-7 7c0 5 7 12 7 12s7-7 7-12a7 7 0 0 0-7-7Z" fill="' + C.amber + '"/>' +
            '<circle cx="35" cy="15" r="2.600" fill="#fff"/>')
    ];

    // Feedback: escudo com check (decisão segura) e alerta (ponto de atenção)
    ART.fbSuccess = svg("0 0 52 52",
        '<path d="M26 4 43 10v14c0 12-8 20-17 24C17 44 9 36 9 24V10Z" fill="' + C.success + '"/>' +
        '<path d="m18 26 6 6 11-12" fill="none" stroke="#fff" stroke-width="4.500" stroke-linecap="round" stroke-linejoin="round"/>');
    function fbAlert(color) {
        return svg("0 0 52 52",
            '<path d="M26 6 48 44H4Z" fill="' + color + '" stroke="' + color + '" stroke-width="4" stroke-linejoin="round"/>' +
            '<rect x="24" y="19" width="4" height="13" rx="2" fill="#fff"/>' +
            '<circle cx="26" cy="38" r="2.600" fill="#fff"/>');
    }

    /* ---------- Funções de apoio ---------- */
    function once(el) {
        if (!el || el.dataset.art) return false;
        el.dataset.art = "1";
        return true;
    }

    function make(html, cls) {
        var d = document.createElement("div");
        d.className = "art " + cls;
        d.setAttribute("aria-hidden", "true");
        d.innerHTML = html;
        return d;
    }

    function missionKey(text) {
        text = (text || "").toLowerCase();
        if (/phishing|caçador/.test(text)) return "phishing";
        if (/senha|guardi/.test(text)) return "senhas";
        return null;
    }

    /* ---------- Aplicação por tela ---------- */
    function decorate() {
        var app = document.getElementById("app");
        if (!app) return;

        // Tela inicial: ícone em cada cartão de benefício
        app.querySelectorAll(".info-item").forEach(function (el, i) {
            if (ART.info[i] && once(el)) el.insertBefore(make(ART.info[i], "art-icon"), el.firstChild);
        });

        // Autoverificação inicial
        var diag = document.getElementById("diagnosticContainer");
        if (diag) {
            var dCard = diag.closest(".card");
            if (once(dCard)) dCard.insertBefore(make(ART.diagnostico, "art-hero"), dCard.firstChild);
        }

        // Mapa da jornada: banner em cada missão
        app.querySelectorAll(".mission-card").forEach(function (el, i) {
            var key = ["senhas", "phishing"][i];
            if (key && once(el)) el.insertBefore(make(ART[key], "art-banner"), el.firstChild);
        });

        // Questão: ilustração da missão ao lado do título
        var head = app.querySelector(".mission-head");
        if (head && once(head)) {
            var eyebrow = head.querySelector(".eyebrow");
            var key = missionKey(eyebrow && eyebrow.textContent);
            if (key) head.insertBefore(make(ART[key], "art-badge"), head.firstChild);
        }

        // Feedback imediato: ícone conforme o nível da resposta
        app.querySelectorAll(".feedback").forEach(function (el) {
            if (!once(el)) return;
            var icon = el.classList.contains("success") ? ART.fbSuccess
                : fbAlert(el.classList.contains("danger") ? C.danger : "#a86608");
            var body = document.createElement("div");
            while (el.firstChild) body.appendChild(el.firstChild);
            var fb = document.createElement("div");
            fb.className = "fb-icon";
            fb.setAttribute("aria-hidden", "true");
            fb.innerHTML = icon;
            el.classList.add("has-art");
            el.appendChild(fb);
            el.appendChild(body);
        });

        // Missão concluída: ilustração da missão
        var micro = app.querySelector(".microlesson");
        if (micro) {
            var sCard = micro.closest(".card");
            if (once(sCard)) {
                var h1 = sCard.querySelector("h1");
                var mk = missionKey(h1 && h1.textContent) || "senhas";
                sCard.insertBefore(make(ART[mk], "art-hero"), sCard.firstChild);
            }
        }

        // Resultado final: troféu
        var stats = app.querySelector(".stats-grid");
        if (stats) {
            var rCard = stats.closest(".card");
            if (once(rCard)) rCard.insertBefore(make(ART.trofeu, "art-hero"), rCard.firstChild);
        }
    }

    var app = document.getElementById("app");
    if (app) {
        new MutationObserver(decorate).observe(app, { childList: true, subtree: true });
        decorate();
    }
})();

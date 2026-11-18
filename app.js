/*
- Jornada de Segurança da Informação
- Protótipo acadêmico (Etapa 1: 2 Missões)
- - diagnóstico
- - 2 missões (Senhas e Phishing)
- - decisões e consequências
- - feedback imediato
- - pontuação
- - análise por tema
- - recomendações de microlições
- - armazenamento local no navegador
 */

const state = {
    screen: "home",
    score: 0,
    maxScore: 0,
    currentMission: 0,
    currentQuestion: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    topicStats: {},
    answers: []
};

const missions = [
    {
        id: "senhas",
        number: 1,
        title: "Guardião das Senhas",
        tag: "Senhas e autenticação",
        description: "Verifique práticas relacionadas a senhas, compartilhamento de credenciais e autenticação.",
        microlesson: "Use senhas únicas para serviços diferentes, evite compartilhar credenciais e, quando disponível, utilize autenticação multifator.",
        questions: [
            {
                text: "Um colega pede sua senha para acessar temporariamente um sistema. O que você faz?",
                options: [
                    {
                        text: "Passo minha senha porque é apenas por alguns minutos.",
                        points: 0,
                        correct: false,
                        feedback: "Compartilhar credenciais dificulta a responsabilização e pode expor sua conta. O acesso deve ser realizado por uma conta autorizada.",
                        level: "danger"
                    },
                    {
                        text: "Não compartilho a senha e procuro o procedimento oficial para conceder acesso.",
                        points: 10,
                        correct: true,
                        feedback: "Boa decisão. Cada pessoa deve utilizar credenciais próprias e autorizadas.",
                        level: "success"
                    },
                    {
                        text: "Envio a senha por mensagem privada e peço que ela seja apagada depois.",
                        points: 0,
                        correct: false,
                        feedback: "Enviar a senha por mensagens continua sendo compartilhamento de credenciais.",
                        level: "danger"
                    }
                ]
            },
            {
                text: "Você percebe que utiliza a mesma senha em vários serviços. Qual é a melhor atitude?",
                options: [
                    {
                        text: "Manter a senha, pois é mais fácil de lembrar.",
                        points: 0,
                        correct: false,
                        feedback: "A reutilização aumenta o impacto caso uma das contas seja comprometida.",
                        level: "danger"
                    },
                    {
                        text: "Trocar as senhas e utilizar credenciais diferentes, preferencialmente com um gerenciador aprovado.",
                        points: 10,
                        correct: true,
                        feedback: "Correto. A utilização de credenciais distintas reduz o efeito de um comprometimento.",
                        level: "success"
                    },
                    {
                        text: "Anotar a mesma senha em um papel próximo ao computador.",
                        points: 0,
                        correct: false,
                        feedback: "Anotar senhas em locais expostos também cria risco.",
                        level: "danger"
                    }
                ]
            },
            {
                text: "O sistema institucional oferece autenticação multifator. Como você deve agir?",
                options: [
                    {
                        text: "Ativar o recurso, seguindo as orientações institucionais.",
                        points: 10,
                        correct: true,
                        feedback: "Boa prática. A autenticação multifator acrescenta uma camada adicional de proteção.",
                        level: "success"
                    },
                    {
                        text: "Ignorar porque uma senha já é suficiente.",
                        points: 0,
                        correct: false,
                        feedback: "Uma camada adicional de autenticação pode reduzir o risco de uso indevido da conta.",
                        level: "warning"
                    },
                    {
                        text: "Desativar sempre que estiver disponível.",
                        points: 0,
                        correct: false,
                        feedback: "Desativar mecanismos de proteção sem justificativa aumenta a exposição.",
                        level: "danger"
                    }
                ]
            }
        ]
    },
    {
        id: "phishing",
        number: 2,
        title: "Caçador de Phishing",
        tag: "Phishing e engenharia social",
        description: "Identifique sinais de mensagens suspeitas e escolha formas seguras de verificar solicitações.",
        microlesson: "Desconfie de urgência, pedidos inesperados, links estranhos, anexos não solicitados e alterações incomuns. Confirme por um canal oficial.",
        questions: [
            {
                text: "Você recebe um e-mail dizendo que sua conta será bloqueada em 30 minutos e pedindo para clicar em um link. O que faz?",
                options: [
                    {
                        text: "Clico imediatamente para evitar o bloqueio.",
                        points: 0,
                        correct: false,
                        feedback: "Senso de urgência é frequentemente utilizado para induzir decisões sem verificação.",
                        level: "danger"
                    },
                    {
                        text: "Verifico remetente e endereço do link e, se necessário, confirmo a solicitação por canal oficial.",
                        points: 10,
                        correct: true,
                        feedback: "Boa decisão. Verificação independente reduz o risco de cair em uma tentativa de phishing.",
                        level: "success"
                    },
                    {
                        text: "Encaminho para colegas para perguntar se alguém já clicou.",
                        points: 0,
                        correct: false,
                        feedback: "O ideal é não ampliar a circulação de uma mensagem suspeita. Utilize o procedimento institucional de reporte.",
                        level: "warning"
                    }
                ]
            },
            {
                text: "Um fornecedor envia um anexo que você não estava esperando. Qual é a atitude mais segura?",
                options: [
                    {
                        text: "Abrir imediatamente porque o remetente é conhecido.",
                        points: 0,
                        correct: false,
                        feedback: "Uma conta conhecida também pode estar comprometida. O contexto do anexo deve ser confirmado.",
                        level: "danger"
                    },
                    {
                        text: "Confirmar a solicitação por um canal confiável antes de abrir.",
                        points: 10,
                        correct: true,
                        feedback: "Correto. Confirmação independente ajuda a evitar arquivos maliciosos ou mensagens falsificadas.",
                        level: "success"
                    },
                    {
                        text: "Salvar o arquivo e abrir em outro computador.",
                        points: 0,
                        correct: false,
                        feedback: "Mudar de computador não elimina o risco do arquivo.",
                        level: "warning"
                    }
                ]
            },
            {
                text: "Uma mensagem pede dados institucionais e usa linguagem incomum. Qual sinal merece atenção?",
                options: [
                    {
                        text: "A mensagem tem uma assinatura.",
                        points: 0,
                        correct: false,
                        feedback: "Uma assinatura pode ser falsificada. É preciso observar o conjunto de características da mensagem.",
                        level: "warning"
                    },
                    {
                        text: "Pedido inesperado, urgência e endereço de remetente ou link suspeito.",
                        points: 10,
                        correct: true,
                        feedback: "Correto. A combinação desses sinais justifica uma verificação antes de qualquer ação.",
                        level: "success"
                    },
                    {
                        text: "O e-mail possui logotipo institucional.",
                        points: 0,
                        correct: false,
                        feedback: "Elementos visuais podem ser copiados. Não são suficientes para confirmar autenticidade.",
                        level: "warning"
                    }
                ]
            }
        ]
    }
];

const microLessons = {
    senhas: {
        title: "Microlição — Senhas e autenticação",
        text: "Credenciais são individuais. Evite reutilização, compartilhamento e armazenamento inseguro. Sempre que a instituição disponibilizar autenticação multifator, siga as orientações para ativá-la."
    },
    phishing: {
        title: "Microlição — Identificação de phishing",
        text: "Antes de clicar, observe remetente, domínio, link, pedido e senso de urgência. Quando houver dúvida, confirme a solicitação por um canal oficial, sem utilizar o contato fornecido na própria mensagem suspeita."
    }
};

function $(id) {
    return document.getElementById(id);
}

function resetState() {
    state.screen = "home";
    state.score = 0;
    state.maxScore = missions.reduce((sum, m) => sum + m.questions.length * 10, 0);
    state.currentMission = 0;
    state.currentQuestion = 0;
    state.correctAnswers = 0;
    state.totalAnswers = 0;
    state.topicStats = {};
    state.answers = [];

    missions.forEach(m => {
        state.topicStats[m.id] = {
            correct: 0,
            total: 0,
            score: 0
        };
    });
}

function saveState() {
    localStorage.setItem("jornadaSeguranca", JSON.stringify({
        score: state.score,
        maxScore: state.maxScore,
        currentMission: state.currentMission,
        currentQuestion: state.currentQuestion,
        correctAnswers: state.correctAnswers,
        totalAnswers: state.totalAnswers,
        topicStats: state.topicStats,
        answers: state.answers
    }));
}

function loadState() {
    const saved = localStorage.getItem("jornadaSeguranca");
    if (!saved) return false;

    try {
        const data = JSON.parse(saved);
        if (data.currentMission > missions.length) return false;
        Object.assign(state, data);
        state.maxScore = missions.reduce((sum, m) => sum + m.questions.length * 10, 0);
        state.screen = "missions";
        return true;
    } catch {
        return false;
    }
}

function clearSavedState() {
    localStorage.removeItem("jornadaSeguranca");
}

function getCompletedMissionCount() {
    return Math.min(state.currentMission, missions.length);
}

function setProgress(percent) {
    $("progressArea").classList.remove("hidden");
    $("progressBar").style.width = `${percent}%`;
    $("progressText").textContent = `${Math.round(percent)}%`;
}

function hideProgress() {
    $("progressArea").classList.add("hidden");
}

function renderHome() {
    hideProgress();

    $("app").innerHTML = `
        <section class="hero">
            <div class="eyebrow">Protótipo de aprendizagem baseada em cenários</div>

            <h1>Jornada de Segurança da Informação</h1>

            <p>
                Uma experiência curta e interativa para autoverificar práticas
                de segurança da informação no cotidiano profissional.
            </p>

            <div class="info-grid">
                <div class="info-item">
                    <strong>Autoverificação</strong>
                    <span>Reflita sobre decisões do cotidiano.</span>
                </div>
                <div class="info-item">
                    <strong>Feedback imediato</strong>
                    <span>Entenda o risco após cada decisão.</span>
                </div>
                <div class="info-item">
                    <strong>Trilha personalizada</strong>
                    <span>Receba recomendações conforme seu desempenho.</span>
                </div>
            </div>

            <button class="btn btn-primary" onclick="startJourney()">
                Iniciar jornada
            </button>

            <div class="notice">
                <strong>Importante:</strong> este protótipo é educativo.
                As respostas devem ser adaptadas às políticas e procedimentos
                específicos de cada instituição.
            </div>
        </section>
    `;
}

function startJourney() {
    clearSavedState();
    resetState();
    state.screen = "diagnostic";
    saveState();
    renderDiagnostic();
}

function renderDiagnostic() {
    hideProgress();

    $("app").innerHTML = `
        <section class="card">
            <div class="eyebrow">Etapa 1</div>
            <h1 class="section-title">Autoverificação inicial</h1>
            <p class="section-subtitle">
                Antes das missões, responda rapidamente sobre seus hábitos.
                Não há resposta "perfeita": a proposta é identificar pontos
                de atenção para orientar a jornada.
            </p>

            <div id="diagnosticContainer"></div>

            <div class="button-row">
                <button class="btn btn-primary" onclick="finishDiagnostic()">
                    Continuar
                </button>
            </div>
        </section>
    `;

    const questions = [
        {
            id: "diagPassword",
            text: "Você costuma utilizar senhas diferentes para sistemas diferentes?",
            options: ["Sempre", "Às vezes", "Raramente"]
        },
        {
            id: "diagMFA",
            text: "Quando existe autenticação multifator, você costuma utilizá-la?",
            options: ["Sempre", "Quando recomendado", "Raramente"]
        },
        {
            id: "diagPhishing",
            text: "Você verifica links e remetentes antes de clicar em mensagens inesperadas?",
            options: ["Sempre", "Às vezes", "Raramente"]
        }
    ];

    $("diagnosticContainer").innerHTML = questions.map((q, index) => `
        <div class="question">
            <h3>${index + 1}. ${q.text}</h3>
            <div class="option-list">
                ${q.options.map((option, i) => `
                    <label class="option-btn">
                        <input type="radio" name="${q.id}" value="${i}">
                        ${option}
                    </label>
                `).join("")}
            </div>
        </div>
    `).join("");
}

function finishDiagnostic() {
    const names = ["diagPassword", "diagMFA", "diagPhishing"];

    const allAnswered = names.every(name =>
        document.querySelector(`input[name="${name}"]:checked`)
    );

    if (!allAnswered) {
        alert("Responda todas as questões do diagnóstico para continuar.");
        return;
    }

    state.screen = "missions";
    saveState();
    renderMissionMap();
}

function renderMissionMap() {
    const completed = getCompletedMissionCount();
    setProgress((completed / missions.length) * 100);

    $("app").innerHTML = `
        <section class="card">
            <div class="eyebrow">Etapa 2</div>
            <h1 class="section-title">Mapa da jornada</h1>
            <p class="section-subtitle">
                Complete as duas missões. Cada situação apresenta uma decisão,
                uma consequência e uma explicação prática.
            </p>

            <div class="mission-grid">
                ${missions.map((mission, index) => {
                    const isDone = index < state.currentMission;
                    const isCurrent = index === state.currentMission;
                    const locked = index > state.currentMission;

                    return `
                        <article class="mission-card ${locked ? "locked" : ""}">
                            <div class="mission-number">MISSÃO ${mission.number}</div>
                            <h3>${mission.title}</h3>
                            <span class="tag">${mission.tag}</span>
                            <p>${mission.description}</p>

                            ${
                                isDone
                                ? `<span class="tag">✓ Concluída</span>`
                                : isCurrent
                                    ? `<button class="btn btn-primary" onclick="startMission(${index})">Iniciar missão</button>`
                                    : `<span class="small">Bloqueada até concluir a anterior</span>`
                            }
                        </article>
                    `;
                }).join("")}
            </div>

            <div class="notice">
                <strong>Progresso:</strong>
                ${completed} de ${missions.length} missões concluídas.
                Pontuação atual: ${state.score}.
            </div>

            ${completed >= missions.length ? `
                <div class="button-row">
                    <button class="btn btn-primary" onclick="renderResults()">Ver resultado final</button>
                    <button class="btn btn-ghost" onclick="restartAll()">Reiniciar jornada</button>
                </div>
            ` : ""}
        </section>
    `;
}

function startMission(index) {
    state.currentMission = index;
    state.currentQuestion = 0;
    state.screen = "mission";
    saveState();
    renderQuestion();
}

function renderQuestion() {
    const mission = missions[state.currentMission];
    const question = mission.questions[state.currentQuestion];

    const totalQuestions = missions.reduce((sum, m) => sum + m.questions.length, 0);
    setProgress((state.totalAnswers / totalQuestions) * 100);

    $("app").innerHTML = `
        <section class="card">
            <div class="mission-head">
                <div>
                    <div class="eyebrow">Missão ${mission.number} de ${missions.length} • ${mission.tag}</div>
                    <h1 class="section-title">${mission.title}</h1>
                    <p>Questão ${state.currentQuestion + 1} de ${mission.questions.length}</p>
                </div>
                <div class="score-pill">${state.score} pts</div>
            </div>

            <div class="question">
                <h3>${question.text}</h3>
                <div class="option-list" id="optionsContainer">
                    ${question.options.map((opt, idx) => `
                        <button class="option-btn" onclick="selectOption(${idx})">
                            ${opt.text}
                        </button>
                    `).join("")}
                </div>
            </div>

            <div id="feedbackArea"></div>
        </section>
    `;
}

function selectOption(optionIndex) {
    const mission = missions[state.currentMission];
    const question = mission.questions[state.currentQuestion];
    const option = question.options[optionIndex];

    const buttons = document.querySelectorAll("#optionsContainer .option-btn");
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === optionIndex) {
            btn.style.borderColor = "var(--primary)";
            btn.style.fontWeight = "700";
        }
    });

    state.score += option.points;
    state.totalAnswers += 1;
    if (option.correct) state.correctAnswers += 1;

    if (!state.topicStats[mission.id]) {
        state.topicStats[mission.id] = { correct: 0, total: 0, score: 0 };
    }
    state.topicStats[mission.id].total += 1;
    state.topicStats[mission.id].score += option.points;
    if (option.correct) state.topicStats[mission.id].correct += 1;

    state.answers.push({
        mission: mission.id,
        question: state.currentQuestion,
        correct: option.correct,
        points: option.points
    });

    saveState();

    const totalQuestions = missions.reduce((sum, m) => sum + m.questions.length, 0);
    setProgress((state.totalAnswers / totalQuestions) * 100);

    const isLastQuestion = state.currentQuestion + 1 >= mission.questions.length;

    $("feedbackArea").innerHTML = `
        <div class="feedback ${option.level}">
            <h3>${option.correct ? "✓ Decisão segura" : "⚠ Ponto de atenção"}</h3>
            <p>${option.feedback}</p>
            <div class="button-row">
                <button class="btn btn-primary" onclick="nextStep()">
                    ${isLastQuestion ? "Concluir missão" : "Próxima questão"}
                </button>
            </div>
        </div>
    `;
}

function nextStep() {
    const mission = missions[state.currentMission];

    if (state.currentQuestion + 1 < mission.questions.length) {
        state.currentQuestion += 1;
        saveState();
        renderQuestion();
    } else {
        state.currentMission += 1;
        state.currentQuestion = 0;
        saveState();

        if (state.currentMission >= missions.length) {
            renderResults();
        } else {
            renderMissionSummary(mission);
        }
    }
}

function renderMissionSummary(completedMission) {
    setProgress((state.currentMission / missions.length) * 100);

    $("app").innerHTML = `
        <section class="card">
            <div class="eyebrow">Missão concluída</div>
            <h1 class="section-title">${completedMission.title}</h1>
            <p class="section-subtitle">Você concluiu a primeira etapa da jornada.</p>

            <div class="microlesson">
                <strong>Síntese prática:</strong>
                <p style="margin-bottom: 0;">${completedMission.microlesson}</p>
            </div>

            <div class="button-row">
                <button class="btn btn-primary" onclick="renderMissionMap()">
                    Continuar para o mapa
                </button>
            </div>
        </section>
    `;
}

function renderResults() {
    setProgress(100);
    const percent = state.maxScore > 0 ? Math.round((state.score / state.maxScore) * 100) : 0;

    $("app").innerHTML = `
        <section class="card">
            <div class="eyebrow">Resultado final</div>
            <h1 class="section-title">Diagnóstico concluído</h1>
            <p class="section-subtitle">
                Confira seu desempenho nas duas missões desta etapa e as recomendações práticas.
            </p>

            <div class="stats-grid">
                <div class="stat">
                    <span class="number">${state.score}/${state.maxScore}</span>
                    <span class="label">Pontuação total</span>
                </div>
                <div class="stat">
                    <span class="number">${state.correctAnswers}/${state.totalAnswers}</span>
                    <span class="label">Decisões seguras</span>
                </div>
                <div class="stat">
                    <span class="number">${percent}%</span>
                    <span class="label">Aproveitamento</span>
                </div>
            </div>

            <h3>Desempenho por tema</h3>
            ${missions.map(m => {
                const stat = state.topicStats[m.id] || { correct: 0, total: m.questions.length };
                const topicPct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                return `
                    <div class="topic-row">
                        <div class="topic-label">
                            <strong>${m.tag}</strong>
                            <span>${stat.correct} de ${stat.total} (${topicPct}%)</span>
                        </div>
                        <div class="topic-track">
                            <div class="topic-fill" style="width: ${topicPct}%"></div>
                        </div>
                    </div>
                `;
            }).join("")}

            <h3 style="margin-top: 28px;">Microlições recomendadas</h3>
            <div class="recommendation-grid">
                ${missions.map(m => {
                    const lesson = microLessons[m.id];
                    return `
                        <article class="recommendation">
                            <span class="tag">${m.tag}</span>
                            <h3>${lesson.title}</h3>
                            <p>${lesson.text}</p>
                        </article>
                    `;
                }).join("")}
            </div>

            <div class="button-row">
                <button class="btn btn-primary" onclick="restartAll()">Refazer jornada</button>
                <button class="btn btn-ghost" onclick="renderMissionMap()">Voltar ao mapa</button>
            </div>
        </section>
    `;
}

function restartAll() {
    clearSavedState();
    renderHome();
}

// Inicialização
if (loadState() && state.currentMission < missions.length) {
    renderMissionMap();
} else {
    clearSavedState();
    renderHome();
}

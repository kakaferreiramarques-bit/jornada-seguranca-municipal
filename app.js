/*
 * Jornada de Segurança da Informação
 * Protótipo acadêmico
 *
 * V1:
 * - diagnóstico
 * - 5 missões
 * - decisões e consequências
 * - feedback imediato
 * - pontuação
 * - análise por tema
 * - recomendações de microlições
 * - armazenamento local no navegador
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
    },
    {
        id: "atualizacoes",
        number: 3,
        title: "Atualização Segura",
        tag: "Atualizações e dispositivos",
        description: "Tome decisões sobre atualizações, aplicativos e comportamento diante de alertas.",
        microlesson: "Mantenha sistemas e aplicações atualizados conforme as políticas institucionais. Atualizações frequentemente corrigem vulnerabilidades conhecidas.",
        questions: [
            {
                text: "Seu computador institucional informa que há uma atualização de segurança disponível. O que você faz?",
                options: [
                    {
                        text: "Ignoro permanentemente para não interromper o trabalho.",
                        points: 0,
                        correct: false,
                        feedback: "Adiar indefinidamente atualizações pode manter vulnerabilidades conhecidas expostas.",
                        level: "danger"
                    },
                    {
                        text: "Sigo o procedimento institucional para instalar a atualização no momento adequado.",
                        points: 10,
                        correct: true,
                        feedback: "Boa decisão. Atualizações devem ser realizadas conforme as orientações da instituição.",
                        level: "success"
                    },
                    {
                        text: "Baixo uma versão do programa em um site qualquer para atualizar mais rápido.",
                        points: 0,
                        correct: false,
                        feedback: "Aplicativos devem ser obtidos de fontes autorizadas e confiáveis.",
                        level: "danger"
                    }
                ]
            },
            {
                text: "Você precisa de um aplicativo para uma tarefa de trabalho. O que deve fazer?",
                options: [
                    {
                        text: "Baixar a primeira versão encontrada em um site de downloads.",
                        points: 0,
                        correct: false,
                        feedback: "Fontes desconhecidas podem distribuir software adulterado ou malicioso.",
                        level: "danger"
                    },
                    {
                        text: "Verificar se o aplicativo é autorizado e seguir o procedimento institucional.",
                        points: 10,
                        correct: true,
                        feedback: "Correto. A instalação deve seguir as regras e fontes aprovadas pela organização.",
                        level: "success"
                    },
                    {
                        text: "Pedir o instalador a qualquer colega.",
                        points: 0,
                        correct: false,
                        feedback: "O arquivo pode estar desatualizado, adulterado ou não ser autorizado.",
                        level: "warning"
                    }
                ]
            },
            {
                text: "Uma atualização exige reiniciar o computador durante o expediente. O que é mais adequado?",
                options: [
                    {
                        text: "Adiar indefinidamente.",
                        points: 0,
                        correct: false,
                        feedback: "O adiamento contínuo pode prolongar a exposição a vulnerabilidades.",
                        level: "warning"
                    },
                    {
                        text: "Planejar a instalação conforme a orientação institucional e o impacto no trabalho.",
                        points: 10,
                        correct: true,
                        feedback: "Boa decisão. Segurança e continuidade do trabalho devem ser consideradas em conjunto.",
                        level: "success"
                    },
                    {
                        text: "Desativar as atualizações automáticas.",
                        points: 0,
                        correct: false,
                        feedback: "Desativar atualizações remove uma importante camada de manutenção de segurança.",
                        level: "danger"
                    }
                ]
            }
        ]
    },
    {
        id: "acessos",
        number: 4,
        title: "Controle de Acessos",
        tag: "Privilégios e contas",
        description: "Avalie situações envolvendo permissões, contas institucionais e acesso a informações.",
        microlesson: "Acessos devem ser compatíveis com a função desempenhada e revisados quando houver mudança de atividade, setor ou vínculo.",
        questions: [
            {
                text: "Você muda de setor, mas continua com acessos antigos que não utiliza. O que deve fazer?",
                options: [
                    {
                        text: "Manter os acessos porque talvez sejam úteis no futuro.",
                        points: 0,
                        correct: false,
                        feedback: "Privilégios desnecessários aumentam a superfície de exposição.",
                        level: "warning"
                    },
                    {
                        text: "Informar a mudança e solicitar revisão dos acessos.",
                        points: 10,
                        correct: true,
                        feedback: "Correto. A revisão de privilégios ajuda a manter os acessos compatíveis com a função.",
                        level: "success"
                    },
                    {
                        text: "Compartilhar os acessos antigos com colegas.",
                        points: 0,
                        correct: false,
                        feedback: "Credenciais e permissões não devem ser compartilhadas.",
                        level: "danger"
                    }
                ]
            },
            {
                text: "Um colega está ausente e pede para você utilizar a conta dele. Qual é a resposta adequada?",
                options: [
                    {
                        text: "Aceitar, pois o trabalho precisa continuar.",
                        points: 0,
                        correct: false,
                        feedback: "O compartilhamento de contas prejudica rastreabilidade e responsabilização.",
                        level: "danger"
                    },
                    {
                        text: "Solicitar acesso próprio e autorizado pelo procedimento institucional.",
                        points: 10,
                        correct: true,
                        feedback: "Boa decisão. Cada usuário deve utilizar credenciais próprias e autorizadas.",
                        level: "success"
                    },
                    {
                        text: "Usar a conta e depois alterar a senha.",
                        points: 0,
                        correct: false,
                        feedback: "Alterar a senha depois não resolve o problema de compartilhamento de conta.",
                        level: "danger"
                    }
                ]
            },
            {
                text: "Você encontra uma pasta com documentos que não precisa acessar para sua função. O que faz?",
                options: [
                    {
                        text: "Abro os arquivos para ver o que existe.",
                        points: 0,
                        correct: false,
                        feedback: "Acesso a informações deve estar relacionado à necessidade funcional e às autorizações.",
                        level: "warning"
                    },
                    {
                        text: "Não acesso e comunico ao responsável caso pareça haver uma permissão indevida.",
                        points: 10,
                        correct: true,
                        feedback: "Correto. A existência de uma permissão inadequada deve ser comunicada pelos canais apropriados.",
                        level: "success"
                    },
                    {
                        text: "Faço uma cópia para ter como backup.",
                        points: 0,
                        correct: false,
                        feedback: "Copiar informações sem necessidade ou autorização cria novos riscos.",
                        level: "danger"
                    }
                ]
            }
        ]
    },
    {
        id: "incidentes",
        number: 5,
        title: "Resposta ao Incidente",
        tag: "Comunicação e incidentes",
        description: "Pratique a tomada de decisão quando algo anormal acontece no ambiente de trabalho.",
        microlesson: "Ao identificar um possível incidente, preserve informações relevantes e comunique rapidamente pelo canal institucional definido. Evite ações improvisadas que possam apagar evidências.",
        questions: [
            {
                text: "Seu computador começa a apresentar comportamento incomum após você abrir um arquivo. O que faz primeiro?",
                options: [
                    {
                        text: "Ignoro e continuo trabalhando normalmente.",
                        points: 0,
                        correct: false,
                        feedback: "Um comportamento incomum pode indicar um evento de segurança e merece avaliação.",
                        level: "warning"
                    },
                    {
                        text: "Sigo o procedimento institucional de comunicação e, quando orientado, isolo o equipamento.",
                        points: 10,
                        correct: true,
                        feedback: "Boa decisão. A comunicação rápida permite que o responsável avalie e contenha o evento.",
                        level: "success"
                    },
                    {
                        text: "Apago todos os arquivos recentes para eliminar o problema.",
                        points: 0,
                        correct: false,
                        feedback: "Ações improvisadas podem destruir informações importantes para a análise do incidente.",
                        level: "danger"
                    }
                ]
            },
            {
                text: "Você percebe uma mensagem enviada da sua conta que não reconhece. O que deve fazer?",
                options: [
                    {
                        text: "Apagar a mensagem e não comunicar.",
                        points: 0,
                        correct: false,
                        feedback: "O evento pode indicar comprometimento da conta e deve ser comunicado.",
                        level: "danger"
                    },
                    {
                        text: "Comunicar pelo canal institucional e seguir as orientações para proteger a conta.",
                        points: 10,
                        correct: true,
                        feedback: "Correto. A comunicação rápida ajuda a reduzir possíveis impactos.",
                        level: "success"
                    },
                    {
                        text: "Enviar uma mensagem para todos dizendo que sua conta foi invadida.",
                        points: 0,
                        correct: false,
                        feedback: "É preferível utilizar o canal oficial de resposta a incidentes para coordenar a comunicação.",
                        level: "warning"
                    }
                ]
            },
            {
                text: "Você identifica um possível vazamento de informação. Qual atitude é mais adequada?",
                options: [
                    {
                        text: "Publicar nas redes sociais para alertar outras pessoas.",
                        points: 0,
                        correct: false,
                        feedback: "A divulgação pública pode ampliar o impacto do incidente.",
                        level: "danger"
                    },
                    {
                        text: "Registrar o que foi observado e comunicar imediatamente pelo canal institucional.",
                        points: 10,
                        correct: true,
                        feedback: "Boa decisão. O registro e a comunicação adequada ajudam na resposta ao evento.",
                        level: "success"
                    },
                    {
                        text: "Tentar investigar sozinho e apagar os rastros.",
                        points: 0,
                        correct: false,
                        feedback: "Investigações improvisadas podem comprometer evidências ou ampliar o impacto.",
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
    },
    atualizacoes: {
        title: "Microlição — Atualizações",
        text: "Sistemas e aplicações devem receber atualizações de segurança conforme as políticas da organização. Evite instalar programas de fontes desconhecidas ou desativar mecanismos de atualização sem autorização."
    },
    acessos: {
        title: "Microlição — Privilégios e acessos",
        text: "Acesso deve ser compatível com a necessidade de trabalho. Mudanças de função ou vínculo são momentos importantes para revisão de permissões."
    },
    incidentes: {
        title: "Microlição — Comunicação de incidentes",
        text: "Quando algo anormal acontecer, utilize o canal institucional de comunicação. Preserve informações relevantes e siga as orientações da equipe responsável, evitando ações improvisadas."
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
        Object.assign(state, data);
        state.screen = "missions";
        return true;
    } catch {
        return false;
    }
}

function clearSavedState() {
    localStorage.removeItem("jornadaSeguranca");
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
        },
        {
            id: "diagUpdates",
            text: "Você mantém sistemas e aplicativos atualizados conforme a orientação da instituição?",
            options: ["Sempre", "Às vezes", "Raramente"]
        },
        {
            id: "diagIncident",
            text: "Você sabe qual canal institucional utilizar para comunicar um possível incidente?",
            options: ["Sim", "Tenho dúvidas", "Não"]
        }
    ];

    $("diagnosticContainer").innerHTML = questions.map((q, index) => `
        <div class="question">
            <h3>${index + 1}. ${q.text}</h3>
            <div class="option-list">
                ${q.options.map((option, i) => `
                    <label class="option-btn">
                        <input type="radio" name="${q.id}" value="${i}" ${i === 0 ? "" : ""}>
                        ${option}
                    </label>
                `).join("")}
            </div>
        </div>
    `).join("");
}

function finishDiagnostic() {
    const names = ["diagPassword", "diagMFA", "diagPhishing", "diagUpdates", "diagIncident"];

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
                Complete as cinco missões. Cada situação apresenta uma decisão,
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

    const answeredBefore = state.answers.find(
        a => a.mission === mission.id && a.question === state.currentQuestion
    );

    if (answeredBefore) {
        renderQuestion();
        return;
    }

    const totalQuestions = missions.reduce((sum, m) => sum + m.questions.length, 0);
    const questionNumber = state.currentMission * 3 + state.currentQuestion + 1;
    setProgress((questionNumber / totalQuestions) * 100);

    $("app").innerHTML = `
        <section class="card">
            <div class="mission-head">
                <div>
                    <div class="eyebrow">Missão ${mission.number} de ${missions.length}</div>
                    <h1 class="section-title">${mission.title}</h1>
                    <p>${mission.description}</p>
                    <span class="tag">${mission.tag}</span>
                </div>
                <div class="score-pill">Pontuação: ${state.score}</div>
            </div>

            <div class="question">
                <span class="small">
                    Questão ${state.currentQuestion + 1} de ${mission.questions.length}
                </span>

                <h2>${question.text}</h2>

                <div class="option-list">
                    ${question.options.map((option, index) => `
                        <button
                            class="option-btn"
                            onclick="answerQuestion(${index})">
                            ${option.text}
                        </button>
                    `).join("")}
                </div>

                <div id="feedback"></div>
            </div>
        </section>
    `;
}

function answerQuestion(optionIndex) {
    const mission = missions[state.currentMission];
    const question = mission.questions[state.currentQuestion];
    const option = question.options[optionIndex];

    state.totalAnswers++;

    if (option.correct) {
        state.correctAnswers++;
    }

    state.score += option.points;

    state.topicStats[mission.id].total++;
    state.topicStats[mission.id].score += option.points;

    if (option.correct) {
        state.topicStats[mission.id].correct++;
    }

    state.answers.push({
        mission: mission.id,
        question: state.currentQuestion,
        option: optionIndex,
        correct: option.correct,
        points: option.points
    });

    saveState();

    document.querySelectorAll(".option-btn").forEach(button => {
        button.disabled = true;
    });

    $("feedback").innerHTML = `
        <div class="feedback ${option.level}">
            <h3>${option.correct ? "✓ Boa decisão!" : "⚠ Atenção!"}</h3>
            <p>${option.feedback}</p>
            <p><strong>Pontuação desta decisão:</strong> ${option.points} pontos.</p>

            <button class="btn btn-secondary"
                    onclick="nextQuestion()">
                ${isLastQuestion() ? "Concluir missão" : "Próxima situação"}
            </button>
        </div>
    `;
}

function isLastQuestion() {
    const mission = missions[state.currentMission];
    return state.currentQuestion === mission.questions.length - 1;
}

function nextQuestion() {
    if (isLastQuestion()) {
        finishMission();
        return;
    }

    state.currentQuestion++;
    saveState();
    renderQuestion();
}

function finishMission() {
    const mission = missions[state.currentMission];

    $("app").innerHTML = `
        <section class="result-card card center">
            <div class="eyebrow">Missão concluída</div>
            <h1>${mission.title}</h1>

            <p>
                Você concluiu esta etapa da jornada.
                Antes de avançar, confira a microlição recomendada.
            </p>

            <div class="microlesson">
                <h3>${microLessons[mission.id].title}</h3>
                <p>${microLessons[mission.id].text}</p>
            </div>

            <div class="stats-grid">
                <div class="stat">
                    <span class="number">${state.topicStats[mission.id].score}</span>
                    <span class="label">pontos na missão</span>
                </div>
                <div class="stat">
                    <span class="number">${state.topicStats[mission.id].correct}</span>
                    <span class="label">decisões adequadas</span>
                </div>
                <div class="stat">
                    <span class="number">${mission.questions.length}</span>
                    <span class="label">situações analisadas</span>
                </div>
            </div>

            <button class="btn btn-primary" onclick="advanceAfterMission()">
                Continuar jornada
            </button>
        </section>
    `;
}

function advanceAfterMission() {
    state.currentMission++;

    if (state.currentMission >= missions.length) {
        state.screen = "result";
        saveState();
        renderResult();
        return;
    }

    state.currentQuestion = 0;
    state.screen = "missions";
    saveState();
    renderMissionMap();
}

function getCompletedMissionCount() {
    return Math.min(state.currentMission, missions.length);
}

function getPercentage(correct, total) {
    if (!total) return 0;
    return Math.round((correct / total) * 100);
}

function getRecommendations() {
    return missions
        .map(mission => {
            const stats = state.topicStats[mission.id];
            const percentage = getPercentage(stats.correct, stats.total);

            return {
                mission,
                percentage
            };
        })
        .sort((a, b) => a.percentage - b.percentage);
}

function renderResult() {
    setProgress(100);

    const accuracy = getPercentage(state.correctAnswers, state.totalAnswers);
    const recommendations = getRecommendations();

    $("app").innerHTML = `
        <section class="card">
            <div class="center">
                <div class="eyebrow">Jornada concluída</div>
                <h1>Seu mapa de autoverificação</h1>
                <p class="section-subtitle">
                    O resultado abaixo serve como orientação educativa.
                    Ele não representa uma avaliação profissional ou institucional.
                </p>
            </div>

            <div class="stats-grid">
                <div class="stat">
                    <span class="number">${state.score}</span>
                    <span class="label">pontos obtidos</span>
                </div>

                <div class="stat">
                    <span class="number">${accuracy}%</span>
                    <span class="label">decisões adequadas</span>
                </div>

                <div class="stat">
                    <span class="number">${state.totalAnswers}</span>
                    <span class="label">situações respondidas</span>
                </div>
            </div>

            <h2>Desempenho por tema</h2>

            <div>
                ${missions.map(mission => {
                    const stats = state.topicStats[mission.id];
                    const percentage = getPercentage(stats.correct, stats.total);

                    return `
                        <div class="topic-row">
                            <div class="topic-label">
                                <strong>${mission.title}</strong>
                                <span>${percentage}%</span>
                            </div>
                            <div class="topic-track">
                                <div class="topic-fill" style="width: ${percentage}%"></div>
                            </div>
                        </div>
                    `;
                }).join("")}
            </div>

            <h2 style="margin-top: 34px;">Microlições recomendadas</h2>

            <p class="section-subtitle">
                As recomendações abaixo priorizam os temas em que houve menor
                percentual de decisões adequadas.
            </p>

            <div class="recommendation-grid">
                ${recommendations.slice(0, 3).map(item => `
                    <article class="recommendation">
                        <span class="tag">${item.percentage}% de acerto</span>
                        <h3>${item.mission.title}</h3>
                        <p>${microLessons[item.mission.id].text}</p>
                        <button class="btn btn-secondary"
                                onclick="showMicroLesson('${item.mission.id}')">
                            Ver microlição
                        </button>
                    </article>
                `).join("")}
            </div>

            <div id="lessonArea"></div>

            <div class="notice">
                <strong>Próximo passo:</strong>
                em uma versão futura, essas recomendações podem levar o usuário
                diretamente para novos desafios específicos do tema em que
                apresentou maior dificuldade.
            </div>

            <div class="button-row">
                <button class="btn btn-primary" onclick="restartJourney()">
                    Refazer jornada
                </button>

                <button class="btn btn-ghost" onclick="goHome()">
                    Voltar ao início
                </button>
            </div>
        </section>
    `;
}

function showMicroLesson(topic) {
    const lesson = microLessons[topic];

    $("lessonArea").innerHTML = `
        <div class="microlesson">
            <h3>${lesson.title}</h3>
            <p>${lesson.text}</p>
        </div>
    `;

    $("lessonArea").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function restartJourney() {
    clearSavedState();
    startJourney();
}

function goHome() {
    clearSavedState();
    resetState();
    renderHome();
}

function resumeIfPossible() {
    const saved = localStorage.getItem("jornadaSeguranca");

    if (saved) {
        const shouldResume = confirm(
            "Existe uma jornada salva neste navegador. Deseja continuar de onde parou?"
        );

        if (shouldResume && loadState()) {
            if (state.currentMission >= missions.length) {
                renderResult();
            } else if (state.screen === "mission") {
                renderQuestion();
            } else {
                renderMissionMap();
            }
            return;
        }

        clearSavedState();
    }

    resetState();
    renderHome();
}

resumeIfPossible();

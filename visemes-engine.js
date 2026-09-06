/**
 * DOJO - ENGINE DE VISEMES (IPA -> SVG)
 * Hospedagem: GitHub Pages / Raw GitHub
 * Utilização: Template de Cards do Anki / AnkiDroid
 */

const VisemeEngine = {
  // Mapeamento dos 44 Fonemas IPA para 10 Visemes Principais
  mapaIPA: {
    // Viseme 1: Consoantes Labiais (M, P, B)
    '/p/': 'bilabial_fechado', '/b/': 'bilabial_fechado', '/m/': 'bilabial_fechado',
    
    // Viseme 2: Labiodentais (F, V)
    '/f/': 'labiodental', '/v/': 'labiodental',
    
    // Viseme 3: Dentais / TH (θ, ð)
    '/θ/': 'dental_th', '/ð/': 'dental_th',
    
    // Viseme 4: Alveolares / Dentes Próximos (T, D, S, Z, N, L)
    '/t/': 'alveolar', '/d/': 'alveolar', '/s/': 'alveolar', 
    '/z/': 'alveolar', '/n/': 'alveolar', '/l/': 'alveolar',
    
    // Viseme 5: Arredondados / Biquinho (ʃ, ʒ, tʃ, dʒ, w)
    '/ʃ/': 'postalveolar_biquinho', '/ʒ/': 'postalveolar_biquinho',
    '/tʃ/': 'postalveolar_biquinho', '/dʒ/': 'postalveolar_biquinho', '/w/': 'postalveolar_biquinho',
    
    // Viseme 6: Vogais Fechadas / Sorriso Tenso (iː, ɪ, e, j)
    '/iː/': 'vogal_alta_sorriso', '/ɪ/': 'vogal_alta_sorriso', '/e/': 'vogal_alta_sorriso', '/j/': 'vogal_alta_sorriso',
    
    // Viseme 7: Vogais Abertas / Boca Aberta (æ, ɑː, aɪ, aʊ)
    '/æ/': 'vogal_aberta', '/ɑː/': 'vogal_aberta', '/aɪ/': 'vogal_aberta', '/aʊ/': 'vogal_aberta',
    
    // Viseme 8: Vogais Neutras / Schwa (ə, ʌ, ɜː)
    '/ə/': 'vogal_neutra', '/ʌ/': 'vogal_neutra', '/ɜː/': 'vogal_neutra',
    
    // Viseme 9: Vogais Arredondadas (uː, ʊ, ɔː)
    '/uː/': 'vogal_u_biquinho', '/ʊ/': 'vogal_u_biquinho', '/ɔː/': 'vogal_u_biquinho',
    
    // Viseme 10: Velares / Guturais (k, ɡ, ŋ, h)
    '/k/': 'velar_aberto', '/ɡ/': 'velar_aberto', '/ŋ/': 'velar_aberto', '/h/': 'velar_aberto'
  },

  // Definição dos Caminhos SVG (Path Data) para cada Viseme
  posicoes: {
    repouso: {
      boca: "M 50,100 Q 100,100 150,100 Q 100,100 50,100",
      lingua: "M 80,105 Q 100,105 120,105",
      dentesTop: "0",
      dentesBot: "0"
    },
    dental_th: { // /θ/ e /ð/
      boca: "M 50,100 Q 100,130 150,100 Q 100,70 50,100",
      lingua: "M 75,108 Q 100,122 125,108",
      dentesTop: "1",
      dentesBot: "1"
    },
    bilabial_fechado: { // /p/, /b/, /m/
      boca: "M 50,100 Q 100,102 150,100 Q 100,98 50,100",
      lingua: "M 80,105 Q 100,105 120,105",
      dentesTop: "0",
      dentesBot: "0"
    },
    vogal_alta_sorriso: { // /iː/, /ɪ/
      boca: "M 40,100 Q 100,118 160,100 Q 100,82 40,100",
      lingua: "M 70,108 Q 100,112 130,108",
      dentesTop: "1",
      dentesBot: "0.8"
    },
    vogal_aberta: { // /æ/, /ɑː/
      boca: "M 55,100 Q 100,150 145,100 Q 100,50 55,100",
      lingua: "M 80,130 Q 100,140 120,130",
      dentesTop: "1",
      dentesBot: "0.5"
    }
  },

  // Método de Renderização e Animação
  render: function(simboloIPA, containerId = 'viseme-container') {
    const visemeChave = this.mapaIPA[simboloIPA] || 'vogal_neutra';
    const alvo = this.posicoes[visemeChave] || this.posicoes.dental_th;
    const repouso = this.posicoes.repouso;

    const container = document.getElementById(containerId);
    if (!container) return;

    // Injeta o SVG base se ainda não existir
    container.innerHTML = `
      <svg viewBox="0 0 200 200" width="160" height="160" style="background:#1e293b; border-radius:12px;">
        <path id="svg-boca" d="${repouso.boca}" fill="#2d1515" stroke="#f43f5e" stroke-width="4" style="transition: all 0.3s ease;"/>
        <path id="svg-dentes-top" d="M 60,100 L 140,100 L 140,106 L 60,106 Z" fill="#ffffff" opacity="${repouso.dentesTop}" style="transition: all 0.3s ease;"/>
        <path id="svg-lingua" d="${repouso.lingua}" fill="#e76f51" style="transition: all 0.3s ease;"/>
      </svg>
    `;

    // Dispara a animação para o Viseme alvo
    setTimeout(() => {
      document.getElementById('svg-boca').setAttribute('d', alvo.boca);
      document.getElementById('svg-lingua').setAttribute('d', alvo.lingua);
      document.getElementById('svg-dentes-top').style.opacity = alvo.dentesTop;
    }, 150);

    // Retorna ao estado de descanso após a articulação
    setTimeout(() => {
      document.getElementById('svg-boca').setAttribute('d', repouso.boca);
      document.getElementById('svg-lingua').setAttribute('d', repouso.lingua);
      document.getElementById('svg-dentes-top').style.opacity = repouso.dentesTop;
    }, 1200);
  }
};

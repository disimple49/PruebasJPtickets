const DB = {
    stores: [
        "虚無の寺院 (Templo del Vacío)", 
        "再起動された地獄 (Infierno Reiniciado)", 
        "記憶の断片店 (Tienda de Fragmentos)", 
        "最終列車マーケット (Mercado del Último Tren)",
        "境界線マーケット (Mercado de la Frontera)",
        "裏側の世界 (El Mundo del Revés)",
        "魂の廃棄場 (Vertedero de Almas)",
        "灰の都市 (Ciudad de Ceniza)"
    ],
    
    items: [
        { q: "純粋な酸素 (Oxígeno puro)", p: "¥8,200" },
        { q: "後悔の塊 (Masa de arrepentimiento)", p: "¥0" },
        { q: "失われた時間 (Tiempo perdido)", p: "不可算" },
        { q: "沈黙の 500g (500g de Silencio)", p: "¥1,500" },
        { q: "偽の希望 (Esperanza falsa)", p: "¥10" },
        { q: "魂のバックアップ (Backup del alma)", p: "¥99,999" },
        { q: "昨日の雨 (Lluvia de ayer)", p: "¥150" },
        { q: "意味のない会話 (Charla sin sentido)", p: "¥0.99" },
        { q: "宇宙の塵 (Polvo estelar)", p: "¥4,444" },
        { q: "孤独のエッセンス (Esencia de soledad)", p: "¥2,100" },
        { q: "忘れられた約束 (Promesa olvidada)", p: "¥0" },
        { q: "冷たい嘘 (Mentira fría)", p: "¥500" },
        { q: "真夜中の太陽 (Sol de medianoche)", p: "¥12,000" },
        { q: "壊れた羅針盤 (Brújula rota)", p: "¥300" },
        { q: "最後の一息 (Último suspiro)", p: "価格なし" }
    ],

    quotes: [
        "人生は死への移行に過ぎない。(La vida es solo una transición a la muerte.)",
        "あなたの存在はエラーです。(Tu existencia es un error.)",
        "誰もあなたを待っていません。(Nadie te está esperando.)",
        "光はただの遅れた闇です。(La luz es solo oscuridad retrasada.)",
        "忘却こそが唯一の救済。(El olvido es la única salvación.)",
        "すべてはシミュレーションです。(Todo es una simulación.)",
        "出口はありません。(No hay salida.)",
        "時間はただの幻想です。(El tiempo es solo una ilusión.)",
        "あなたは一人で死ぬ。(Morirás solo.)",
        "灰は灰に、塵は塵に。(Ceniza a la ceniza, polvo al polvo.)"
    ]
};

function generate() {
    const shopRaw = DB.stores[Math.floor(Math.random() * DB.stores.length)];
    const quoteRaw = DB.quotes[Math.floor(Math.random() * DB.quotes.length)];
    const showTranslation = document.getElementById('translate-check').checked;
    
    // Configurar cantidad de items aleatorios (entre 5 y 8)
    const numItems = Math.floor(Math.random() * 4) + 5;
    const selectedItems = [...DB.items].sort(() => 0.5 - Math.random()).slice(0, numItems);

    // Procesar Items
    let itemsHtml = selectedItems.map(i => {
        const parts = i.q.split(' (');
        const jp = parts[0];
        const es = parts[1] ? parts[1].replace(')', '') : '';
        
        return `
        <div class="item">
            <span>
                ${jp}
                ${showTranslation && es ? `<br><small style="color:#666; font-size:10px;">${es}</small>` : ''}
            </span>
            <span style="align-self: flex-start;">${i.p}</span>
        </div>`;
    }).join('');

    // Procesar Tienda y Cita
    const shopJp = shopRaw.split(' (')[0];
    const shopEs = shopRaw.split(' (')[1]?.replace(')', '') || '';
    const quoteJp = quoteRaw.split('(')[0];
    const quoteEs = quoteRaw.split('(')[1]?.replace(')', '') || '';

    document.getElementById('receipt').innerHTML = `
        <div class="header">
            <h1>${shopJp}</h1>
            ${showTranslation && shopEs ? `<p style="font-size:10px; margin:0;">${shopEs}</p>` : ''}
            <p style="font-size:11px; margin-top:10px;">
                DATE: ${new Date().toISOString().slice(0,10)}<br>
                REG: ${Math.random().toString(16).slice(2,10).toUpperCase()}
            </p>
        </div>
        <div class="body">
            ${itemsHtml}
        </div>
        <div class="total">
            <div class="item">
                <span>合計 (TOTAL)</span>
                <span>${showTranslation ? '無 (NADA)' : '無'}</span>
            </div>
        </div>
        <div class="barcode-box">
            <div class="barcode-img"></div>
            <small style="letter-spacing: 3px;">${Math.random().toString().slice(2,14)}</small>
        </div>
        <div class="philosophy">
            ${quoteJp}
            ${showTranslation && quoteEs ? `<br><small style="font-size:10px; opacity:0.7;">${quoteEs}</small>` : ''}
        </div>
        <p style="text-align:center; font-size:10px; margin-top:15px;">ご利用ありがとうございました</p>
    `;
}

function savePDF() {
    const element = document.getElementById('receipt');
    const opt = {
        margin: 0,
        filename: 'receipt_chaos_HD.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 4, // Escala alta para Photoshop
            useCORS: true,
            letterRendering: true
        },
        jsPDF: { unit: 'mm', format: [85, 230], orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

// Generar el primero al cargar la página
window.onload = generate;

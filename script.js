const database = {
    shops: ["境界線マーケット (Mercado de la Frontera)", "終末デパート (Tienda del Fin del Mundo)", "魂の廃棄場 (Vertedero de Almas)"],
    items: [
        { jp: "失われた記憶", es: "Recuerdos perdidos", price: "¥4,444" },
        { jp: "明日のための酸素", es: "Oxígeno para mañana", price: "¥1,200" },
        { jp: "孤独の沈黙 (1kg)", es: "1kg de Silencio de soledad", price: "¥0" },
        { jp: "無意味な抵抗", es: "Resistencia inútil", price: "¥8,500" },
        { jp: "偽りの笑顔", es: "Sonrisa falsa", price: "¥50" },
        { jp: "崩壊したエゴ", es: "Ego colapsado", price: "¥19,999" },
        { jp: "静かな絶望", es: "Desesperación silenciosa", price: "¥3,333" },
        { jp: "空っぽの約束", es: "Promesa vacía", price: "¥0.01" }
    ],
    quotes: [
        "人生は死への長い準備に過ぎない。 (La vida es solo una larga preparación para la muerte)",
        "あなたはただの数字です。 (Usted es solo un número)",
        "出口はありません。 (No hay salida)",
        "すべては塵に帰る。 (Todo vuelve al polvo)"
    ]
};

function generateReceipt() {
    const ticket = document.getElementById('ticket');
    
    // Seleccionar datos aleatorios
    const shop = database.shops[Math.floor(Math.random() * database.shops.length)];
    const quote = database.quotes[Math.floor(Math.random() * database.quotes.length)];
    const selectedItems = [...database.items].sort(() => 0.5 - Math.random()).slice(0, 5);
    
    let itemsHTML = '';
    selectedItems.forEach(item => {
        itemsHTML += `
            <div class="item-row">
                <span>${item.jp}<br><small>${item.es}</small></span>
                <span>${item.price}</span>
            </div>`;
    });

    ticket.innerHTML = `
        <div class="header">
            <h1>${shop}</h1>
            <p>ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
        <div class="body">
            ${itemsHTML}
        </div>
        <div class="total-section">
            <div class="item-row">
                <span>合計 (TOTAL)</span>
                <span>運命 (DESTINO)</span>
            </div>
        </div>
        <div class="barcode"></div>
        <div class="footer">
            <p>${quote}</p>
            <p>ご利用ありがとうございました</p>
        </div>
    `;
}

function downloadPDF() {
    const element = document.getElementById('ticket');
    const opt = {
        margin: 0,
        filename: 'receipt_art_HD.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 4 }, // ESTO DA EL HD
        jsPDF: { unit: 'mm', format: [80, 200], orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

// Generar uno al cargar
generateReceipt();

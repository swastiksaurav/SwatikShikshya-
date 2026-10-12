document.addEventListener('DOMContentLoaded', () => {
    const classGrid = document.getElementById('classGrid');
    const bottomNav = document.getElementById('bottomNav');
    const selectedClassTitle = document.getElementById('selectedClassTitle');
    const subjectList = document.getElementById('subjectList');

    for (let i = 1; i <= 12; i++) {
        const btn = document.createElement('button');
        btn.className = 'class-btn';
        btn.innerText = `Class ${i}`;
        btn.onclick = () => selectClass(i);
        classGrid.appendChild(btn);

        const bottomBtn = document.createElement('button');
        bottomBtn.className = 'bottom-btn';
        bottomBtn.innerText = `Class ${i}`;
        bottomBtn.onclick = () => selectClass(i);
        bottomNav.appendChild(bottomBtn);
    }
});

function selectClass(classNum) {
    const selectedClassTitle = document.getElementById('selectedClassTitle');
    const subjectList = document.getElementById('subjectList');

    selectedClassTitle.innerText = `Basundhara Books - Class ${classNum} (ଅଧ୍ୟାୟ, Notes & Q&A)`;
    
    subjectList.innerHTML = `
        <div class="chapter-box">
            <h3 class="chapter-title">ଅଧ୍ୟାୟ ୧ : (Sample Chapter)</h3>
            <p style="color: #ddd;">ଏହି ଶ୍ରେଣୀର Chapter Wise Notes ଏବଂ Separate Question & Answer ଶୀଘ୍ର ଯୋଡ଼ାଯିବ।</p>
            
            <div class="qa-section">
                <strong style="color: #ffd700;">Question & Answer (Q&A):</strong>
                <p style="margin-top: 5px;">ପ୍ରଶ୍ନ: SWASTIK ଆପ୍‌ର ମୁଖ୍ୟ ଲକ୍ଷ୍ୟ କ’ଣ?</p>
                <p style="color: #aaa;">ଉତ୍ତର: ଓଡ଼ିଶାର Class 1 ରୁ 12th ର ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ମାଗଣାରେ Basundhara Books ର Chapter Wise Notes ଓ Q&A ଯୋଗାଇଦେବା।</p>
            </div>
        </div>
    `;

    document.querySelectorAll('.class-btn, .bottom-btn').forEach(btn => {
        if(btn.innerText === `Class ${classNum}`) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

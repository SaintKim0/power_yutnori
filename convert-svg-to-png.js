// SVG를 PNG로 변환하는 스크립트
// 사용법: node convert-svg-to-png.js

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function convertSvgToPng() {
    try {
        // SVG 파일 읽기
        const svgContent = fs.readFileSync('icon.svg', 'utf8');
        
        // SVG를 데이터 URL로 변환
        const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
        
        // Canvas로 이미지 로드
        const img = await loadImage(svgDataUrl);
        
        // 192x192 PNG 생성
        const canvas192 = createCanvas(192, 192);
        const ctx192 = canvas192.getContext('2d');
        ctx192.drawImage(img, 0, 0, 192, 192);
        const buffer192 = canvas192.toBuffer('image/png');
        fs.writeFileSync('icon-192.png', buffer192);
        console.log('✓ icon-192.png 생성 완료');
        
        // 512x512 PNG 생성
        const canvas512 = createCanvas(512, 512);
        const ctx512 = canvas512.getContext('2d');
        ctx512.drawImage(img, 0, 0, 512, 512);
        const buffer512 = canvas512.toBuffer('image/png');
        fs.writeFileSync('icon-512.png', buffer512);
        console.log('✓ icon-512.png 생성 완료');
        
        console.log('\n아이콘 변환 완료!');
    } catch (error) {
        console.error('오류 발생:', error.message);
        console.log('\n대안: convert-icon.html 파일을 브라우저에서 열어서 수동으로 변환하세요.');
    }
}

convertSvgToPng();


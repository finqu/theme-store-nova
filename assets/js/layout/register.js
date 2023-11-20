export default function() {
    
    const containerEl = document.querySelector('.section-register');
    const registerCtaEl = containerEl.querySelector('#register-cta');
    
    containerEl.querySelectorAll('.form-check-input').forEach(el => { el.addEventListener('change', e => {

        if (Array.from(checkInputEls).every(el => el.checked)) {
            registerCtaEl.disabled = false;
        } else {
            registerCtaEl.disabled = true;
        }
    })});
}
// Email.js
export function sendEmail(email, message) {
    // Code pour envoyer un email
    console.log(`Email envoyé à ${email} avec le message : ${message}`);
}

export const emailConfig = {
    host: '"smtp.protonmail.ch"',
    port: 587,
    secure: false,
    password: "SV6jvE!YNYy_*9A"
};
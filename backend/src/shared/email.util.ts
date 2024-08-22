import { Resend } from "resend";

export function sendConfirmationEmail(email: string, token: string) {
  const html = `
    <h1>Confirm your email</h1>
    <p>Click <a href="http://localhost:3000/api/auth/confirm-email/${token}">here</a> to confirm your email</p>

     
    `;

  const resend = new Resend(process.env.RESEND_API_KEY);

  return resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please confirm your email",
    html,
  });
}


export function sendForgotPasswordEmail(email: string, token:string){
    const html = `
        <h1>Reset your password</h1>
        <p>Click <a href="${
          process.env.FRONTEND_URL+'/auth/reset-password'
        }?token=${token}">here</a> to reset your password</p>
        `;
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    return resend.emails.send({
        from:  "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html});
    
   
}

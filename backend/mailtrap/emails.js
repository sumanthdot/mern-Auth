   import
   { PASSWORD_RESET_REQUEST_TEMPLATE, 
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE } 
     from "./emailTemplates.js"


import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email,verificationToken)=>{
    const recipient = [{email}]


    try {
// const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: "Verify your email",
// 			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
// 			category: "Email Verification",


        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Verify Your Email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification"
        })
        console.log(response)
    } catch (error) {
        console.error(`Error sending verification email:`, error)
        throw new Error (`Error sending verification email: ${error}`)
    }
};

// export const sendWelcomeEmail = async(email,name)=>{
//     const recipient = [{email}];
export const sendWelcomeEmail = async (email, name) => {
	const recipient = [{ email }];

    try {
        const response =  await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid:"34ae006f-ab66-4677-b160-8f0bf50aa24d",
            template_variables:{
                "company_info_name": "Auth Company",
                name:name
            }
        })

        console.log("Welcome email sent successfully",response)
    } catch (error) {
        console.error(`error sending welcome email`,error);
        throw new error (`error sending welcome email: ${error}`)        
    }
};

export const sendPasswordResetEmail = async (email,resetURL)=>{
  const recipient = [{ email}];
  
  try {
    const response= await mailtrapClient.send({
        from : sender,
        to: recipient,
        subject : "Reset Your password",
        html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
        category:"Password reset"
    })
  } catch (error) {
    console.log(`Error sending password reset email`,error);

    throw new Error(`error sending password reset email : ${error}`);
  }
};


// export const sendResetSuccessEmail= async(email)=>{

//     const recipient = [{ email }];

//     try {
//         const response = await mailtrapClient.send({
//             from:sender,
//             to:recipient,
//             subject:"Password Reset Successful",
//             html:PASSWORD_RESET_SUCCESS_TEMPLATE,
//             category:"Password Reset",
//         });

//         console.log("Password reset email sent successful",response);
//     } catch (error) {
//         console.log("Error sending password reset success email",error);
//         throw new Error(`Error sending password reset success email: ${error}`)
        
//     }
// };

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};